#!/usr/bin/env node

const program = require("commander");
const path = require("path");
const { ESLint } = require("eslint");

const { runServer, build } = require("../src");

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
    build();
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
    } catch (error) {
      console.error("Linting failed:", error);
    }
  });

program.parse(process.argv);
