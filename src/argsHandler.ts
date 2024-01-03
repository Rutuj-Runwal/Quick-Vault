// PROGRAM -> OPEARTION data
// quickvault -> add path usr/lib/
// quickvault -> get path


// Types of operation in quickvault
const OPERATION = {
    ADD : "add",
    DELETE : "delete",
    GET : "get",
    EDIT :"edit",
    DUMP : "dump",
    CLEAR : "clear"
};

// Extract OPEARTION from cmd args
function getOperation(args:Array<string>) {
    const operation = args[0];
    console.log(operation);
    if(Object.values(OPERATION).includes(operation)){
        return operation;
    }else{
        console.warn(`Undefined operation for QuickVault: ${operation}`);
        // TODO: Print help/docs
        console.log("Possible commands: "+JSON.stringify(OPERATION));
    }
    
}

// Extract data from cmd args based on type of OPERATION
function getData(args:Array<string>){
    const operationType = getOperation(args); 
    // TODO: handle invalid no of arguments passed
    if(operationType===OPERATION.ADD || operationType===OPERATION.EDIT){
        // Needs two args: key -> val
        if(args.length===3){
            const key = args[args.length-2];
            const val = args[args.length-1];
            return {operationType,data:[key,val]};
        }
    }else if(operationType===OPERATION.GET || operationType===OPERATION.DELETE){
        if(args.length===2){
            const key = args[args.length-1];
            return {operationType,data:[key]};
        }
    }else{
        // No args for OPERATION of type DUMP and CLEAR
        return {operationType,data:[]};
    }
}

function parseArgs() {
    const args = process.argv.slice(2);
    const handledArgs = getData(args);
    return handledArgs;
}

export default {parseArgs,OPERATION};