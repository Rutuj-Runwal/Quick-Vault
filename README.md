### Quick Vault
A fast and reliable key-value store CLI.

Quickvault allows for storing and retriving key value pairs using the commandline.

#### Commands:

- add:
<br/>`quickvault add KEY VALUE`
<br/>Add KEY and its corresponding value to vault
<br/>

- get:
<br/>`quickvault get KEY`
<br/>Get a value from the vault for a corresponding key
<br/>

- edit
<br/>`quickvault edit KEY VALUE`
<br/>Edit the value for a corresponding key
<br/>

- del
<br/>`quickvault del KEY`
<br/>Delete a key-value pair
<br/>

- dump:
<br/>`quickvault dump`
<br/>Get all values in json format on the cli
<br/>

- search:
<br/>`quickvault search PATTERN`
<br/>Search for keys matching a particular pattern
<br/>

- clear:
<br/>Empty the vault
<br/>`quickvault clear`
<br/>

- env:
<br/>Generate a .env file at the specified path.
<br/>Use `.` or `./` to generate `.env` at current working directory
<br/>`quickvault env PATH`
