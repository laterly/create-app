import Webpack, { type Configuration } from "webpack";
import path from "path";
import WebpackDevServer, {
  type Configuration as DevServerConfiguration,
} from "webpack-dev-server";
import webpackConfig from "./dev.config";
import { clearConsole, getPort, printInstructions } from "./utils/index";
const profile = require(path.resolve(process.cwd(), `late.config`));
const compiler = Webpack(webpackConfig as Configuration);

const devServerOptions: DevServerConfiguration = {
  ...profile?.devServer,
};

const runServer = async () => {
  try {
    const port = await getPort({
      port: Number(devServerOptions),
      stopPort: 9999,
    });

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
  clearConsole();
  printInstructions();
});

export { runServer };
