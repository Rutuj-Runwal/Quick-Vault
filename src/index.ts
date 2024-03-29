#!/usr/bin/env node
import Store from "./utli/store.js";
import msgHandler from "./handler/msgHandler.js";
import argparse from "./handler/argsHandler.js";
import { existsSync, writeFileSync } from "fs";
import configHandler from "./handler/configHandler.js";
import caesarCipher from "./utli/cipher.js";
import {OPERATION,isFileAccessError} from "./consts/consts.js";
import CORE_PATH from "./utli/getPath.js";

const QUIK_VAULT_PATH = CORE_PATH;

const quikVault = new Store(QUIK_VAULT_PATH,"vault.json");
const configVault = new Store(QUIK_VAULT_PATH,"vault_config.json",{encrypt:0});
const parsedArgs = argparse();

switch (parsedArgs?.operationType) {
  case OPERATION.ADD:
    add(parsedArgs.data);
    break;
  case OPERATION.EDIT:
    edit(parsedArgs.data,quikVault);
    break;
  case OPERATION.GET:
    get(parsedArgs.data);
    break;
  case OPERATION.DELETE:
    remove(parsedArgs.data);
    break;
  case OPERATION.SEARCH:
    search(parsedArgs.data);
    break;
  case OPERATION.DUMP:
    dump(quikVault);
    break;
  case OPERATION.CLEAR:
    clear();
    break;
  case OPERATION.STAT:
    stat();
    break;
  case OPERATION.ENV:
    generateEnv(parsedArgs.data);
    break;
  case OPERATION.BACKUP:
    generateBackup(parsedArgs.data);
    break;
  case OPERATION.RESTORE:
    quikVault.performRestore(parsedArgs.data[0],parsedArgs.data[1]);
    break;
  case OPERATION.CONFIG:
    if(parsedArgs.data[0]===undefined){
      dump(configVault);
    }else if(parsedArgs.data[0]==="encrypt"){
      if(parsedArgs.data[1]==="1"||parsedArgs.data[1]==="0"){
        edit(["encrypt",parsedArgs.data[1]],configVault);
      }else{
        msgHandler.warn(`Invalid value ${parsedArgs.data[1]}. Expected 0 or 1`)
      }
    }else{
      msgHandler.info("Invalid Configuration parameter.Run `quickvault config` to view configuration options.");
    }
    break;
  case OPERATION.HELP:
    msgHandler.help();
    break;
}

function add([key, val]: string[]) {
  if (quikVault.exists(key)) {
    console.log(`${key} already exists.`);
    console.log(`Use "get" command to retrieve from quikvault`);
  } else {
    if(configHandler.checkConfig()){
      msgHandler.info("Encryption is on");
      msgHandler.info('Use `quickvault config encrypt 0` to disable encryption');
      const encVal = caesarCipher(val,7);
      quikVault.set(key, encVal);
      // Update encryption state for the key
      configHandler.addEncryptionState(key);
    }else{
      quikVault.set(key,val);
    }
    msgHandler.success("Added to vault");
  }
}

function edit([key, val]: string[], vaultType:Store) {
  if (vaultType.exists(key)) {
    let prevVal = vaultType.get(key);
    if(configHandler.checkEncryptionState(key)){
      msgHandler.info(`${key} has encryption`);
      msgHandler.info("Decrypting value...");
      prevVal = caesarCipher(prevVal as string,7,true);
      val = caesarCipher(val,7);
    }
    if (prevVal !== val) {
      vaultType.set(key, val);
      console.log(`Key: ${key}`);
      console.log(`Previous Value: ${prevVal}`);
      console.log(`Updated Value: ${val}`);
    } else {
      msgHandler.warn("Exisitng value is same");
    }
  } else {
    msgHandler.info(`Key: ${key} dosen't exists.`);
    msgHandler.info(`Use "add" command to insert ${key} into quikvault`);
  }
}

async function get([key]: string[]) {
  let prevVal = quikVault.get(key);
  
  if (prevVal) {
    if(configHandler.checkEncryptionState(key)){
      const answer = await msgHandler.askHelper(`Value for ${key} is encrypted. Are you sure you want to decrypt? (Y/N) `);
      if(answer){
        msgHandler.info("Actual Value:");
        const decryptedVal = caesarCipher(prevVal,7,true);
        prevVal = decryptedVal;
      }
      else{
        msgHandler.info("Encrypted Value:");
      }
    }  
    msgHandler.success(prevVal);
  } else {
    msgHandler.warn(`Key: ${key} dosen't exists.`);
    msgHandler.info(`Use "add" command to insert ${key} into quikvault`);
  }
}

async function remove([key]: string[]) {
  if (quikVault.exists(key)) {
    msgHandler.warn(`"del" will remove ${key} and it's value from quickvault`);
    const answer = await msgHandler.askHelper("Do you wish to continue (Y/N) ? ");
    if(answer){
      quikVault.del(key);
      msgHandler.info(`${key} removed.`);
    }else{
      msgHandler.info(`${key} deletion cancelled.`);
    }
  } else {
    msgHandler.warn(`Unable to delete "${key}" - not found in quickvault`);
  }
}

function search([pattern]: string[]) {
  // Get all strings -> Match the pattern -> Show matched
  try{
    const PATTERN = new RegExp(pattern,"i");
    const vault = quikVault.dump();
    let FOUND = false;
    msgHandler.info(`Searching for keys matching "${pattern}" in quickvault`);
    for(let key in vault){
      if(PATTERN.test(key)){
        FOUND = true;
        msgHandler.success(key);
      }
    }
    if(!FOUND){
      msgHandler.warn("No matching keys in vault");
    }
  }catch(e){
    msgHandler.softError("Invalid Pattern - Quickvault supports regex search.");
  } 
}

function dump(vaultType:Store) {
  const vault = vaultType.dump();
  console.log(vault);
}

async function clear() {
  msgHandler.warn("`clear` will reset the quickvault");
  const answer = await msgHandler.askHelper("Do you wish to continue (Y/N) ? ");

  if(answer){
    console.log();
    msgHandler.info(" Quickvault reset successful.");
    quikVault.clear();
  }else{
    msgHandler.info("Reset cancelled.");
  }
}

function stat(){
  // Displays "stats" regarding current quickvault state
  const vault = quikVault.dump();
  const count = Object.keys(vault).length;
  const path = quikVault.vaultFile;
  const vaultData = quikVault.stats();

  msgHandler.success("\nQuickvault Stats:\n");

  console.log(`Key-Value pairs: ` + msgHandler.stuffColor(`${count}`,'yellow'));
  console.log(`Size (in KB): `+msgHandler.stuffColor(`${vaultData.size/1024}`,'blue'));
  console.log(`Vault Location: `+msgHandler.stuffColor(`${path}`,'green'));
  console.log("Vault Created on: " + msgHandler.stuffColor(`${vaultData.birthtime}`,'cyan'));
  console.info("Vault Last Modified: "+ msgHandler.stuffColor(`${vaultData.mtime}`,'yellow'));

  const encState = configHandler.checkConfig()? "ON":"OFF";
  const encColor = encState==="ON"?"green":"red";
  console.info("Encryption Status: "+ msgHandler.stuffColor(encState,encColor));
}

function generateEnv([path]:string[]){
  if(path==="." || path==="./"){
    path = process.cwd();
  }
  if(existsSync(path)){
    const FILE_NAME = "//.env";

    // Generate ENV format:
    let envFormat = "";
    const vault = quikVault.dump();
    for(let key in vault){
      envFormat+= key + "=" + vault[key] + "\n";
    }

    // Save to path
    try{
      writeFileSync(path+FILE_NAME, envFormat);
    }catch(e){
      if(isFileAccessError(e as Error)){
        msgHandler.warn("Cannot save env");
        console.log(msgHandler.stuffColor(`Likely due to a permission error.Provide a different location!`,'cyan'));
      }
    }
  }else{
    msgHandler.softError(`Invalid path: ${path}`);
  }
}

function generateBackup([path]:string[]){
  if(path==="." || path==="./"){
    path = process.cwd();
  }
  if(existsSync(path)){
    const FILE_NAME = "//backup.json";

    // Generate Backup json format:
    const vault = quikVault.dump();

    // Save to path
    try{
      writeFileSync(path+FILE_NAME, JSON.stringify(vault));
    }catch(e){
      if(isFileAccessError(e as Error)){
        msgHandler.warn(`Cannot create backup at path:${path}`);
        console.log(msgHandler.stuffColor(`Likely due to a permission error.Provide a different location!`,'cyan'));
      }
    }
  }else{
    msgHandler.softError(`Invalid path: ${path}`);
  }
}

export default configVault;