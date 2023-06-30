#!/usr/bin/env node

const program = require("commander");
const path = require("path");
const { ESLint } = require("eslint");
const stylelint = require('stylelint');
const { runServer, build } = require("../lib");

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
      console.log('lint 执行完成。');
    } catch (error) {
      console.error("Linting failed:", error);
    }
  });

  program
  .command("lint:style")
  .description("Starting lint:style...")
  .action(() => {
    stylelint.lint({
      files: path.resolve(process.cwd(), `src`),
      rules: `src/**/*.scss`,
      // formatter: 'string',
      fix: true,
    })
      .then(() => {
        // console.log(result.output);
        console.log('lint:style 执行完成。');
      })
      .catch((error) => {
        console.error('lint:style 执行出错：', error);
      });
  });

program.parse(process.argv);
