import chalk from "chalk";
import ip from "ip";
const printInstructions = () => {
  console.log();
  console.log(`App runing at:`);
  console.log();

  console.log(
    `  ${chalk.white.bold(">Local:")}    ${chalk.cyanBright(
      "http://localhost:" + process.env.PORT + ""
    )}`
  );
  console.log(
    `  ${chalk.white.bold(">Network:")}  ${chalk.cyanBright(
      "http://" + ip.address() + ":" + process.env.PORT + ""
    )}`
  );

  console.log();
  console.log(
    `${chalk.cyanBright("Note that the development build is not optimized.")}`
  );
  console.log(
    `${chalk.cyanBright(
      "To create a production build, execute build command."
    )}`
  );
  console.log();
};
export { printInstructions };
