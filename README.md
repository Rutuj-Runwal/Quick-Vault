### Quick Vault
A fast and reliable key-value store CLI.

Quickvault allows for storing and retriving key value pairs using the commandline.

#### Commands:

- add:
`quickvault add KEY VALUE`
<br/>Add KEY and its corresponding value to vault
<br/>

- get:
`quickvault get KEY`
<br/>Get a value from the vault for a corresponding key
<br/>

- edit
`quickvault edit KEY VALUE`
<br/>Edit the value for a corresponding key
<br/>

- dump:
`quickvault dump`
<br/>Get all values in json format on the cli
<br/>

- clear:
<br/>Empty the vault
`quickvault clear`
<br/>

- env:
<br/>Generate a .env file at the specified path.
<br/>Use `.` or `./` to generate `.env` at current working directory
`quickvault env PATH`
