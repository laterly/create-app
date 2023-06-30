const webpack = require('webpack');
const path = require('path');
const rm = require('rimraf');
const chalk = require('chalk');
const webpackConfig = require('./webpack.prod.config.js');

const startBuild = () => {
  return new Promise(resolve => {
    rm(path.resolve(process.cwd(), `dist/*`), removeErr => {
      if (removeErr) {
        throw removeErr;
      }
      const compiler = webpack(webpackConfig);
      compiler.watch({}, (err, stats) => {
        if (err) throw err;
        process.stdout.write(
          stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false,
          }) + '\n\n',
        );

        if (stats.hasErrors()) {
          console.log(chalk.red('Build failed with errors.\n'));
          process.exit(1);
        }
        resolve();
        console.log(
          chalk.cyan(
            `Build complete production in ${
              stats.endTime - stats.startTime
            }ms.\n`,
          ),
        );
      });
    });
  });
};

async function build() {
  try {
    await startBuild();
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  build,
};
