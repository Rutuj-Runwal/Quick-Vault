#!/usr/bin/env node
import Store from "./store.js";
import argparse from "./argsHandler.js";
import msgHandler from "./msgHandler.js";
import { existsSync, writeFileSync } from "fs";

const QUIK_COMMANDS = ["add", "edit", "get", "remove", "dump", "clear"];
const QUIK_VAULT_PATH = "./";

const quikVault = new Store(QUIK_VAULT_PATH);
const parsedArgs = argparse.parseArgs();

switch (parsedArgs?.operationType) {
  case argparse.OPERATION.ADD:
    add(parsedArgs.data);
    break;
  case argparse.OPERATION.EDIT:
    edit(parsedArgs.data);
    break;
  case argparse.OPERATION.GET:
    get(parsedArgs.data);
    break;
  case argparse.OPERATION.DELETE:
    remove(parsedArgs.data);
    break;
  case argparse.OPERATION.DUMP:
    dump();
    break;
  case argparse.OPERATION.CLEAR:
    clear();
    break;
  case argparse.OPERATION.ENV:
    generateEnv(parsedArgs.data);
    break;
  default:
    // TODO: Print help/docs
    break;
}

function add([key, val]: string[]) {
  if (quikVault.exists(key)) {
    console.log(`${key} already exists.`);
    console.log(`Use "get" command to retrieve from quikvault`);
  } else {
    quikVault.set(key, val);
  }
}

function edit([key, val]: string[]) {
  if (quikVault.exists(key)) {
    const prevVal = quikVault.get(key);
    if (prevVal !== val) {
      quikVault.set(key, val);
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

function get([key]: string[]) {
  const prevVal = quikVault.get(key);
  if (prevVal) {
    msgHandler.success(prevVal);
  } else {
    msgHandler.warn(`Key: ${key} dosen't exists.`);
    msgHandler.info(`Use "add" command to insert ${key} into quikvault`);
  }
}

function remove([key]: string[]) {
  if (quikVault.exists(key)) {
    quikVault.del(key);
    msgHandler.info(`${key} removed.`);
  } else {
    msgHandler.warn(`Unable to delete "${key}" - not found in quickvault`);
  }
}

function dump() {
  const vault = quikVault.dump();
  console.log(vault);
}

async function clear() {
  msgHandler.warn("`clear` will reset the quickvault");
  const answer = await msgHandler.ask("Do you wish to continue (Y/N) ? ");

  if (answer === "Y" || answer === "y") {
    console.log();
    msgHandler.info(" Quickvault reset successful.");
    quikVault.clear();
  } else if (answer === "N" || answer === "n") {
    msgHandler.info("Reset cancelled.");
  } else {
    msgHandler.error(
      `Invalid response, expected "Y" or "N". Received ${answer}`
    );
  }
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
      msgHandler.warn("Cannot save env");
      msgHandler.softError(e as string);
    }
    
  }else{
    msgHandler.softError(`Invalid path: ${path}`);
  }
}
// TODO: Add a `Did you mean?` spell check message
