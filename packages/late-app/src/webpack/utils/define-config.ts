import { resolvePath } from "./path-config";
interface DefaultConfig {
  publicPath?: string;
  outputDir?: string;
  resolve?: {
    alias: Record<string, string>;
    extensions: string[];
  };
  devServer?: {
    historyApiFallback: boolean;
    compress: boolean;
    port: number;
    hot: boolean;
    host: string;
    client: {
      logging: string;
      overlay: {
        errors: boolean;
        warnings: boolean;
      };
    };
  };
  env: Record<string, string>;
  lessOptions: Record<string, string>;
  sassOptions: Record<string, string>;
}
const defaultConfig: DefaultConfig = {
  publicPath: "/",
  outputDir: "dist",
  resolve: {
    alias: {
      "@": resolvePath("src"),
    },
    extensions: [".ts", ".tsx", ".jsx", ".json", ".js", ".sass", ".scss"],
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
    host: "0.0.0.0",
    client: {
      logging: "none",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  env: {},
  lessOptions: {},
  sassOptions: {},
};

function defineConfig(config: DefaultConfig) {
  const merged = [defaultConfig, config].reduce((result: any, current) => {
    Object.entries(current).forEach(([key, value]) => {
      if (!result.hasOwnProperty(key)) {
        result[key] = value;
      } else if (typeof value === "object" && typeof result[key] === "object") {
        result[key] = { ...result[key], ...value };
      }
    });
    return result;
  }, {});

  return merged;
}

export { defineConfig };
