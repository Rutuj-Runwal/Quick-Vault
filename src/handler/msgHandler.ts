import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";
import {DESCRIPTION} from "../consts/consts.js";

const STYLING = {
  reset: "\x1b[0m",
  //text color
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  //background color
  background: {
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    cyan: "\x1b[46m"
  },
};

function error(message: string) {
  console.error(STYLING.background.red + "%s " + STYLING.reset, message);
}

function welcome() {
  success("Welcome to QuickVault!");
  success("Ⓒ Rutuj S. Runwal 2024-Present  ");
  info("quickvault help - for detailed usage");
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

async function askHelper(message:string){
  let answer = (await ask(message)).trim();
  if (answer === "Y" || answer === "y") {
    return true;
  } else if (answer === "N" || answer === "n") {
    return false;
  } else {
    error(`Invalid response, expected "Y" or "N". Received "${answer}"`);
  }
}

function help() {
  success("Quick Vault - A fast and reliable key-value store Command Line Interface.");
  console.log(stuffColor('Copyright Ⓒ Rutuj S. Runwal','cyan'));
  info('\nUsage:');
  console.log('  quickvault <command> [options]');
  success('\nAvailable commands and their usage:\n');
  Object.keys(DESCRIPTION).forEach(cmd => {
    console.log("  "+cmd+":");
    console.log(stuffColor(`\t${DESCRIPTION[cmd].usage}`,'cyan'));
    console.log(stuffColor(`\t${DESCRIPTION[cmd].desc}`,'yellow'));
    console.log("\n");
  });
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
    case 'cyan':
      return STYLING.cyan;
    case "bgr":
      return STYLING.background.red;
    default:
      return STYLING.blue;
  }
}

export default {welcome,askHelper,help,error,success,info,warn,softError,stuffColor};