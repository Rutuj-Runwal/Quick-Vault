### Quick Vault
<div align="center">
  <img width="170" alt="quickvault logo" src="https://github.com/Rutuj-Runwal/Quick-Vault/assets/59436520/03c32536-97b3-41a4-bab5-f4ac5b247a35" >
</div>
A fast and reliable key-value store CLI.

Quickvault allows for storing and retriving key value pairs using the commandline.

#### Commands:

- help
  <br/> Get usae details and available commands for quickvault
  <br/>`quickvault help`
  <br/>

  
- add:
  <br/>`quickvault add KEY VALUE`
  <br/>Add KEY and its corresponding value to vault
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/add.svg" height="275" />
  <br/>

- get:
  <br/>`quickvault get KEY`
  <br/>Get a value from the vault for a corresponding key
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/get.svg" height="300" />
  <br/>

- edit
  <br/>`quickvault edit KEY VALUE`
  <br/>Edit the value for a corresponding key
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/edit.svg" height="300" />
  <br/>
  
- del
  <br/>`quickvault del KEY`
  <br/>Delete a key-value pair
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/del.svg" height="300" />
  <br/>

- dump:
  <br/>`quickvault dump`
  <br/>Get all values in json format on the cli
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/dump.svg" height="335" />
  <br/>

- stat:
  <br/>`quickvault stat`
  <br/>Stats for the vault
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/stat.svg" height="325" />
  <br/>

- search:
  <br/>`quickvault search PATTERN`
  <br/>Search for keys matching a particular pattern
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/search.svg" height="260" />
  <br/>

- clear:
  <br/>Empty the vault
  <br/>`quickvault clear`
  <br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/clear.svg" height="330" />
  <br/>
  
- env:
  <br/>Generate a .env file at the specified path.
  <br/>Use `.` or `./` to generate `.env` at current working directory
  <br/>`quickvault env PATH`

- backup
  <br/>`quickvault backup LOCATION`
  <br/>Creates a backup(backup.json) of vault's current state at specified location

- restore
  <br/>`quickvault restore OPTION PATH`
  <br/>Restore a key-value json from specified path.
  <br/>Options:"append" OR "replace"

<br/>

Command Recommendtation suggests nearset possible matching command in case of typos
<br/>Command Recommendtation is based on [Levenshtein distance](https://github.com/Rutuj-Runwal/Quick-Vault/blob/master/src/utli/lvt.ts)
<br/><br/>
  <img src="https://github.com/Rutuj-Runwal/Quick-Vault/raw/master/assets/autocorrect.svg" height="270" />
  <br/>
