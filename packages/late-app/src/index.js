const { defineConfig } = require('./define');
const { runServer } = require('./webpack/start');
const { build } = require('./webpack/build');
const prettier = require('./prettier/prettier.config');
const eslintrc = require('./eslint/.eslintrc');
console.log('defineConfig',defineConfig,eslintrc);
module.exports = {
  defineConfig,
  runServer,
  build,
  prettier,
  eslintrc,
};
