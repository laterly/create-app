const isInteractive = process.stdout.isTTY;
const clearConsole = () => {
  if (isInteractive) {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
  }
};

module.exports = {
  clearConsole,
};
