const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.config');
const { clearConsole, getPort, printInstructions } = require('./utils/index');
const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer };
const runServer = async () => {
  try {
    const port = await getPort({ port: devServerOptions.port, stopPort: 9999 });
    devServerOptions.port = process.env.PORT = port;
    const server = new WebpackDevServer(devServerOptions, compiler);
    await server.start();

    clearConsole();
    process.stdin.on('end', function () {
      server.close();
      process.exit();
    });
  } catch (error) {
    if (error && error.message) {
      console.log(error.message);
    }
    process.exit(1);
  }
};

compiler.hooks.invalid.tap('invalid', () => {
  clearConsole();
  console.log('Compiling...');
});

compiler.hooks.done.tap('done', async () => {
  clearConsole();
  printInstructions();
});

module.exports = {
  runServer,
};
