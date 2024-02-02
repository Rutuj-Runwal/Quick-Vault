import { existsSync, writeFileSync, readFileSync, statSync } from "fs";

interface JSON_OBJ {
  [key: string]: string | undefined;
}

class Store {
  readonly vaultFile: string;
  vaultDB: JSON_OBJ;

  constructor(vaultPath: string,filename:string,defaults={}) {
    this.vaultFile = vaultPath + filename;
    if (!existsSync(this.vaultFile)) {
      // Initialize a vault
      writeFileSync(this.vaultFile, JSON.stringify(defaults));
      // TODO: Ascii cli - welcome
    }
    this.vaultDB = parseVault(this.vaultFile);
  }

  exists(key: string) {
    return this.vaultDB.hasOwnProperty(key);
  }

  get(key: string) {
    return this.vaultDB[key];
  }

  // getAll
  dump() {
    try {
      const dt = readFileSync(this.vaultFile);
      return JSON.parse(dt.toString());
    } catch (err) {
      console.log(err);
      return;
    }
  }

  set(key: string, val: string) {
    this.vaultDB[key] = val;

    writeFileSync(this.vaultFile, JSON.stringify(this.vaultDB));
  }

  del(key: string) {
    delete this.vaultDB[key];
    writeFileSync(this.vaultFile, JSON.stringify(this.vaultDB));
  }

  clear() {
    writeFileSync(this.vaultFile, JSON.stringify({}));
  }
  stats(){
    const stats = statSync(this.vaultFile);
    return stats;
  }
  performRestore(option: string,path:string){
    if(existsSync(path)){
      const newData = parseVault(path);
      if(option==="--replace"){
        // Empty the vault file
        this.clear();

        // Rewrite 
        try{
          writeFileSync(this.vaultFile, JSON.stringify(newData));
        }catch(e){
          console.log(e);
        }
      }
      else if(option==="--append"){
        let currentData = this.dump();
        let append = {...currentData,...newData};

        try{
          writeFileSync(this.vaultFile, JSON.stringify(append));
        }catch(e){
          console.log(e);
        }
      }
    }
  }
  
}

function parseVault(path: string) {
  try {
    const data = readFileSync(path);
    const vaultDB = JSON.parse(data.toString());
    return vaultDB;
  } catch (e) {
    return {};
  }
}


export default Store;
