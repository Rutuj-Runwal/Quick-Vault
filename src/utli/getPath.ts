import {homedir} from 'os';
import {join} from 'path';
import {mkdirSync} from 'fs';

// https://dev.to/jdbar/the-problem-with-handling-node-js-errors-in-typescript-and-the-workaround-m64
// https://stackoverflow.com/a/77652817
const isNodeError = (error: any): error is NodeJS.ErrnoException => {
    return error instanceof Error && 'code' in error;
};

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
    if(isNodeError(e) && e instanceof Error){
        // https://nodejs.org/api/errors.html#common-system-errors
        if(e.code==='EACCES' || e.code==='EPERM' || e.code==='ENOENT'){
            CORE_PATH = "./";
        }
    }
}

export default CORE_PATH;