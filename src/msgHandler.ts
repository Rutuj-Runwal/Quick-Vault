const STYLING = {
  reset: "\x1b[0m",
  //text color
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  //background color
  background: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
};
function error(message: string) {
  console.error(STYLING.background.red + "%s " + STYLING.reset, message);
}

function welcome() {
  console.log(STYLING.green + "Welcome to QuickVault! " + STYLING.reset);
  console.log(STYLING.green + "Ⓒ Rutuj Runwal 2024-Present  " + STYLING.reset);
  console.log(
    STYLING.black +
      "Commands: add,get,edit,delete,dump and clear  " +
      STYLING.reset
  );
}

function help() {
  console.log(STYLING.blue + "TODO: quickvault -h" + STYLING.reset);
}

export default { welcome, help, error };
