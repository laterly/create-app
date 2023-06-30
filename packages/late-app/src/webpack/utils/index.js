const { commonCssLoader } = require('./loader');
const { resolvePath } = require('./path');
const { clearConsole } = require('./clearConsole');
const { getPort } = require('./getPort');
const { printInstructions } = require('./printInstructions');
module.exports = {
  commonCssLoader,
  resolvePath,
  clearConsole,
  getPort,
  printInstructions,
};
