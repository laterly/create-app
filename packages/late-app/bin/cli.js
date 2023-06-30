#!/usr/bin/env node

const program = require('commander');
// const chalk = require('chalk');
// const figlet = require("figlet");
// const pkg = require('../package.json');
const { runServer, build } = require('../src');

//webpack构建
program
  .command('dev')
  .description('Starting dev server...')
  .action(() => {
    runServer();
  });

program
  .command('build')
  .description('Starting build...')
  .action(() => {
    build();
  });

program.parse(process.argv);
