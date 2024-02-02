// OPEARTIONS in quickvault
const OPERATION = {
  ADD: "add",
  DELETE: "del",
  GET: "get",
  EDIT: "edit",
  SEARCH:"search",
  DUMP: "dump",
  CLEAR: "clear",
  STAT:"stat",
  ENV:"env",
  CONFIG:"config",
  BACKUP:"backup",
  RESTORE:"restore",
  HELP:"help"
};

const DESCRIPTION = {
  [OPERATION.ADD]: {desc: 'Add KEY and its corresponding VALUE to vault',usage: 'quickvault add KEY VALUE'},
  [OPERATION.GET]:{desc: 'Get a value from the vault for a corresponding key',usage: 'quickvault get KEY'},
  [OPERATION.EDIT]:{desc: 'Edit the value for a corresponding key',usage: 'quickvault edit KEY VALUE'},
  [OPERATION.SEARCH]:{desc:'Search for keys matching specified pattern',usage:'quickvault search PATTERN'},
  [OPERATION.DUMP]:{desc: 'Get all values in the vault',usage: 'quickvault dump'},
  [OPERATION.DELETE]:{desc:'Delete a specific key-value pair from vault',usage:'quickvault del KEY'},
  [OPERATION.CLEAR]:{desc:'Empty the vault',usage: 'quickvault clear'},
  [OPERATION.STAT]:{desc:'Stats for the vault',usage:'quickvault stat'},
  [OPERATION.CONFIG]:{desc:'Change configuration options.\n\t"quickvault config" to view availbale presets.',usage:'quickvault config OPTION VALUE'},
  [OPERATION.BACKUP]:{desc: "Create a backup(backup.json) of vault's current state at specified location",usage:'quickvault backup LOCATION'},
  [OPERATION.RESTORE]:{desc:'Restore a key-value json from specified path.\n\tOptions:"append" OR "replace"',usage:'quickvault restore OPTION PATH'},
  [OPERATION.ENV]:{desc:'Generate a .env file at the specified path usig vault data',usage:'quickvault env LOCATION'}
}

export {OPERATION,DESCRIPTION};