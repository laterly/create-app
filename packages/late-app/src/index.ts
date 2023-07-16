import { program } from "commander";
import path from "path";
import { ESLint } from "eslint";
import stylelint from "stylelint";
import { runServer, buildProd } from "./webpack";

//webpack构建
program
  .command("dev")
  .description("Starting dev server...")
  .action(() => {
    runServer();
  });

program
  .command("build")
  .description("Starting build...")
  .action(() => {
    buildProd();
  });

program
  .command("lint")
  .description("Starting lint...")
  .action(async () => {
    const linter = new ESLint({ fix: true });
    try {
      const results = await linter.lintFiles([
        path.resolve(process.cwd(), `src/**/*.ts`),
        path.resolve(process.cwd(), `src/**/*.tsx`),
      ]);
      await ESLint.outputFixes(results);
      const formatter = await linter.loadFormatter("stylish");
      const resultText = formatter.format(results);
      console.log(resultText);
      console.log("lint 执行完成。");
    } catch (error) {
      console.error("Linting failed:", error);
    }
  });

program
  .command("lint:style")
  .description("Starting lint:style...")
  .action(() => {
    stylelint
      .lint({
        files: path.resolve(process.cwd(), `src/**/*.scss`),
        fix: true,
      })
      .then(() => {
        // console.log(result.output);
        console.log("lint:style 执行完成。");
      })
      .catch((error) => {
        console.error("lint:style 执行出错：", error);
      });
  });

program.parse(process.argv);
