import {homedir} from 'os';
import {join} from 'path';
import {mkdirSync} from 'fs';
import { isFileAccessError } from '../consts/consts.js';

const HOME_DIR = homedir();
const APP_CONTAINER = "/NPM_QuickVault/";
const platform = process.platform;

var BASE_DIR;
if(platform==='win32'){
    // Windows
    BASE_DIR = join(HOME_DIR,'AppData','Local')
}else if(platform==='linux'){
    // Linux
    BASE_DIR = join(HOME_DIR,'.config');
}else if(platform==='darwin'){
    // MacOS
    BASE_DIR = join(HOME_DIR,'Library','Application Support');
}

let CORE_PATH = BASE_DIR + APP_CONTAINER;

try{
    mkdirSync(CORE_PATH);
}catch(e){
    if(isFileAccessError(e as Error)){
        CORE_PATH = "./";
    }
}

export default CORE_PATH;