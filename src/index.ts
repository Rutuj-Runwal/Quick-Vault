#!/usr/bin/env node
import Store from "./store.js";
import argparse from "./argsHandler.js";
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
      console.warn("Exisitng value is same");
    }
  } else {
    console.log(`Key: ${key} dosen't exists.`);
    console.log(`Use "add" command to insert ${key} into quikvault`);
  }
}

function get([key]: string[]) {
  const prevVal = quikVault.get(key);
  if (prevVal) {
    console.log(prevVal);
  } else {
    console.log(`Key: ${key} dosen't exists.`);
    console.log(`Use "add" command to insert ${key} into quikvault`);
  }
}

// TODO: Add a `Did you mean?` spell check message
