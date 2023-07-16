import Webpack, { type Configuration } from "webpack";
import path from "path";
import fs from "fs-extra";
import webpackConfig from "./prod.config";

const startBuild = async () => {
  const targetAir = path.resolve(process.cwd(), `dist`);
  if (fs.existsSync(targetAir)) {
    await fs.remove(targetAir);
  }
  const compiler = Webpack(webpackConfig as Configuration);
  compiler.watch({}, (err, stats) => {
    if (err) throw err;
    process.stdout.write(
      stats?.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false,
      }) + "\n\n"
    );

    if (stats?.hasErrors()) {
      process.exit(1);
    } else {
      compiler.close((err) => {
        if (err) {
          console.log("err", err);
        }
      });
    }
  });
};

function buildProd() {
  startBuild();
}
export { buildProd };
