import chalk from "chalk";

class OutputType {
  static I = "INFORMATION";
  static S = "SUCCESS";
  static W = "WARNING";
  static E = "ERROR";
}

const print = (msg, outputType) => {
  switch (outputType) {
    case OutputType.I:
      console.log(chalk.blue(msg));
      break;
    case OutputType.S:
      console.log(chalk.green(msg));
      break;
    case OutputType.W:
      console.log(chalk.yellow(msg));
      break;
    case OutputType.E:
      console.log(chalk.red(msg));
      break;
    default:
      console.log(msg);
  }
};

export { OutputType, print };
