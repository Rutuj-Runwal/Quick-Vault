import {existsSync, writeFileSync, readFileSync } from "fs";

interface JSON_OBJ {
  [key: string]: string | undefined
}

class Store{
    readonly vaultFile:string;
    vaultDB: JSON_OBJ;


    constructor(vaultPath:string) {
        this.vaultFile = vaultPath + "vault.json";
        if(!existsSync(this.vaultFile)){
            // Initialize a vault 
            writeFileSync(this.vaultFile,JSON.stringify({}));
            // TODO: Ascii cli - welcome
            console.log("Welcome to QuikVault!");
        }
        this.vaultDB = parseVault(this.vaultFile);
    }

    get(key:string){
        return this.vaultDB[key];
    }

    getAll(){
         try {
            const dt = readFileSync(this.vaultFile);
            return JSON.parse(dt.toString());
        } catch (err) {
            console.log(err);
            return;
        }
    }

    set(key:string,val:string){
        this.vaultDB[key] = val;

        writeFileSync(this.vaultFile,JSON.stringify(this.vaultDB));
    }
}

function parseVault(path:string){
    try{
        const data = readFileSync(path)
        const vaultDB = JSON.parse(data.toString());
        return vaultDB;
    }catch(e){
        return {};
    }
}

export default Store;