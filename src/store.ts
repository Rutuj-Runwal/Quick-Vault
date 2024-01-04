import { existsSync, writeFileSync, readFileSync, write } from "fs";

interface JSON_OBJ {
  [key: string]: string | undefined;
}

class Store {
  readonly vaultFile: string;
  vaultDB: JSON_OBJ;

  constructor(vaultPath: string) {
    this.vaultFile = vaultPath + "vault.json";
    if (!existsSync(this.vaultFile)) {
      // Initialize a vault
      writeFileSync(this.vaultFile, JSON.stringify({}));
      // TODO: Ascii cli - welcome
      console.log("Welcome to QuikVault!");
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
