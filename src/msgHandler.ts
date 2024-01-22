import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";

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
  success("Welcome to QuickVault!");
  success("Ⓒ Rutuj Runwal 2024-Present  ");
  info("Commands: add,get,edit,delete,dump and clear ");
}

function success(message: string) {
  console.log(STYLING.green + "%s " + STYLING.reset, message);
}

function info(message: string) {
  console.log(STYLING.blue + "%s " + STYLING.reset, message);
}

function warn(message: string) {
  console.log(STYLING.yellow + "%s " + STYLING.reset, message);
}

function softError(message: string) {
  console.error(STYLING.red + "%s " + STYLING.reset, message);
}

async function ask(message: string, handleAnswers?: string[]) {
  const rl = createInterface({ input: stdin, output: stdout });
  const answer = await rl.question(
    STYLING.blue + " > " + STYLING.reset + message
  );
  rl.close();

  return answer;
}

function help() {
  console.log(STYLING.blue + "TODO: quickvault -h" + STYLING.reset);
}

function stuffColor(message: string, color: string) {
  return helper(color) + message + STYLING.reset;
}

function helper(color: string) {
  switch (color) {
    case "green":
      return STYLING.green;
    case "blue":
      return STYLING.blue;
    case "yellow":
      return STYLING.yellow;
    case "red":
      return STYLING.red;
    case "bgr":
      return STYLING.background.red;
    default:
      return STYLING.blue;
  }
}

export default {
  welcome,
  ask,
  help,
  error,
  success,
  info,
  warn,
  softError,
  stuffColor,
};
