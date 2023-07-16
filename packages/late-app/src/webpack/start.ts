import Webpack, { type Configuration } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./dev.config";
import { clearConsole, getPort, printInstructions } from "./utils/index";
const compiler = Webpack(webpackConfig as Configuration);
const devServerOptions = { ...(webpackConfig as Configuration).devServer };
const runServer = async () => {
  try {
    const port = await getPort({
      port: Number(devServerOptions.port),
      stopPort: 9999,
    });
    //@ts-ignore
    process.env.PORT = port?.toString();
    devServerOptions.port = port;
    const server = new WebpackDevServer(devServerOptions, compiler);
    await server.start();
    // clearConsole();
    process.stdin.on("end", function () {
      server.close();
      process.exit();
    });
  } catch (error: any) {
    if (error && error.message) {
      console.log(error.message);
    }
    process.exit(1);
  }
};

compiler.hooks.invalid.tap("invalid", () => {
  // clearConsole();
  console.log("Compiling...");
});

compiler.hooks.done.tap("done", async () => {
  // clearConsole();
  printInstructions();
});

export { runServer };
