#!/usr/bin/env node

import {ArgumentParser} from 'argparse';
import Store from './store.js';

const QUIK_COMMANDS = ["add","edit","get","remove","dump","clear"];
const QUIK_VAULT_PATH = "./";

const quikVault = new Store(QUIK_VAULT_PATH);

const parser = new ArgumentParser();
const subparsers = parser.add_subparsers({title:"Quik Vault actions"});
parser.add_argument('-v', '--version', { action: 'version','version':'1.0.0' });

const add_parser = subparsers.add_parser("add", {help:"Add key-value pair to Quik Vault"});
const get_parser = subparsers.add_parser("get", {help:"Get value for a particular key from Quik Vault"});
const edit_parser = subparsers.add_parser("edit", {help:"Get value for a particular key from Quik Vault"});

//@ts-ignore
add_parser.add_argument({
    dest:"quikcommands",
    nargs: 2,
    help: "Aceepts a key value pair",
});
add_parser.set_defaults({func:add});

//@ts-ignore
get_parser.add_argument({
    dest:"quikcommands",
    nargs: 1,
    help: "Access the value based on key",
});
get_parser.set_defaults({func:get});

//@ts-ignore
edit_parser.add_argument({
    dest:"quikcommands",
    nargs: 2,
    help: "Edit the value based on key",
});
edit_parser.set_defaults({func:edit});

const args = parser.parse_args();

try{
    args.func(args.quikcommands);
}catch{
    parser.print_help();
}


function add([key,val]:[string,string]){
    const prevVal = quikVault.get(key);
    if(prevVal){
        console.log(`${key} already exists.`);
        console.log(`Use "get" command to retrieve from quikvault`);
    }else{
        quikVault.set(key,val);
    }
}

function edit([key,val]:[string,string]){
    const prevVal = quikVault.get(key);
    if(prevVal){
        if(prevVal!==val){
            quikVault.set(key,val);
            console.log(`Key: ${key}`);
            console.log(`Previous Value: ${prevVal}`);
            console.log(`Updated Value: ${val}`);
        }else{
            console.warn("Exisitng value is same");
        }
    }else{
        console.log(`Key: ${key} dosen't exisits.`);
        console.log(`Use "add" command to insert ${key} into quikvault`);
    }
}

function get([key]:[string]){
    const prevVal = quikVault.get(key);
    if(prevVal){
        console.log(prevVal);
    }else{
        console.log(`Key: ${key} dosen't exisits.`);
        console.log(`Use "add" command to insert ${key} into quikvault`);
    }

}

// TODO: Add a `Did you mean?` spell check message

