// Handle configs changes for the application

import Store from "../utli/store.js";
const QUIK_VAULT_PATH = "./";
const configVault = new Store(QUIK_VAULT_PATH,"vault_config.json",{encrypt:0});
const encrpytionStateVault = new Store(QUIK_VAULT_PATH,"vault_encryption_state.json");

// Check for config options
function checkConfig(){
    const data = configVault.dump();
    if(data.encrypt==="1"){
        return true;
    }
    return false;
}

function checkEncryptionState(key:string){
    return encrpytionStateVault.exists(key);
}

function addEncryptionState(key:string){   
    // Add key to encryption state to denote this value is encrypted.
    if (checkEncryptionState(key)) {
        console.log(`${key} already encrypted.`);
    } else {
        encrpytionStateVault.set(key, "1");
    }
}

export default {addEncryptionState,checkEncryptionState,checkConfig};