// PROGRAM -> OPEARTION data
// quickvault -> add path usr/lib/
// quickvault -> get path
import msgHandler from "./msgHandler.js";
import Store from "./store.js";

// Types of operation in quickvault
const OPERATION = {
  ADD: "add",
  DELETE: "del",
  GET: "get",
  EDIT: "edit",
  SEARCH:"search",
  DUMP: "dump",
  CLEAR: "clear",
  ENV:"env",
  CONFIG:"config"
};

// Extract OPEARTION from cmd args
function getOperation(args: Array<string>) {
  const operation = args[0];
  if (Object.values(OPERATION).includes(operation)) {
    return operation;
  } else {
    msgHandler.warn(`Undefined operation for QuickVault: ${operation}`);
    // TODO: Print help/docs
    msgHandler.info(
      "Possible commands: " + JSON.stringify(Object.values(OPERATION))
    );
  }
}


// Extract data from cmd args based on type of OPERATION
function getData(args: Array<string>) {
  const operationType = getOperation(args);
  // TODO: handle invalid no of arguments passed
  if (operationType === OPERATION.ADD || operationType === OPERATION.EDIT) {
    // Needs two args: key -> val
    if (args.length === 3) {
      const key = args[args.length - 2];
      const val = args[args.length - 1];
      return { operationType, data: [key, val] };
    } else {
      msgHandler.softError(
        `Invalid arguments to ${operationType} command.Expected 2`
      );
    }
  } else if (operationType === OPERATION.GET || operationType === OPERATION.DELETE || operationType === OPERATION.SEARCH || operationType == OPERATION.ENV)  {
    if(args.length === 2){
      const key = args[args.length - 1];
      return { operationType, data: [key] };
    } else {
      msgHandler.softError(
        `Invalid arguments to ${operationType} command.Expected 1`
      );
    }
  } else if (operationType === OPERATION.DUMP || operationType === OPERATION.CLEAR){
    // No args for OPERATION of type DUMP and CLEAR 
    if (args.length === 1) {
      return { operationType, data: [] };
    } else {
      msgHandler.softError(
        `Invalid arguments to ${operationType} command.Expected 0`
      );
    }
  } else if(operationType === OPERATION.CONFIG){
    // `config` is a special type with two cases

    // Case 1: 3 args - Modifying a specific config
    if (args.length === 3) {
      const key = args[args.length - 2];
      const val = args[args.length - 1];
      return { operationType, data: [key, val] };
    } 
    // Case 2: No args - Viewing all configs 
    else if(args.length === 1){
      return { operationType, data: [] };
    }
    else {
      msgHandler.softError(
        `Invalid arguments to ${operationType} command.Expected 0`
      );
    }
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    msgHandler.welcome();
  } else {
    const handledArgs = getData(args);
    return handledArgs;
  }
}

export default { parseArgs, OPERATION };
