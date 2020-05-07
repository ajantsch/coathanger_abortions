const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv");
const NodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { NODE_ENV, OPTIMIZED_BUILD } = process.env;

const envConfigPath = `./config/.env.${NODE_ENV}`;
const envConfig = Dotenv.config({ path: envConfigPath }).parsed;
const localEnvironment = NODE_ENV === "local";
const isOptimized = OPTIMIZED_BUILD === "true" || NODE_ENV === "production";
const webpackWatch = localEnvironment && !isOptimized;
const webpackMode = isOptimized ? "production" : "development";
const webpackDevtool = isOptimized ? "hidden-source-map" : "cheap-eval-source-map";

console.log(`Webpack building in ${isOptimized ? "optimized" : "non-optimized"} mode`);

const config = {
  entry: "./src/index.ts",
  mode: webpackMode,
  watch: webpackWatch,
  target: "node",
  devtool: webpackDevtool,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    sourceMapFilename: "index.js.map",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  externals: [NodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // load only the files that are actually bundled by webpack
              onlyCompileBundledFiles: true,
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(txt|md)$/i,
        use: "raw-loader",
      },
      {
        test: /\.(ts|js)$/,
        enforce: "pre",
        use: [
          {
            loader: "eslint-loader",
            options: {
              emitWarning: true,
              emitError: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // We need NODE_ENV in the env object and as a separate expression
      // Otherwise, webpack will not build properly.
      "process.env": JSON.stringify({ ...process.env, ...envConfig }),
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
  ],
  optimization: {
    // Don't let webpack override our NODE_ENV
    nodeEnv: false,
  },
};

if (localEnvironment) {
  config.plugins.push(
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackShellPlugin({
      dev: true,
      onBuildEnd: ["npm run start:watch"],
    }),
  );
}

module.exports = config;
