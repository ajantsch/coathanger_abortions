const webpack = require("webpack");
const path = require("path");
const NodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { NODE_ENV, OPTIMIZED_BUILD, PORT } = process.env;

// Webpack setup
const localEnvironment = NODE_ENV === "local";
const optimizedBuild = OPTIMIZED_BUILD === "true";
const webpackMode = optimizedBuild ? "production" : "development";
const webpackWatch = localEnvironment;
const webpackDevtool = optimizedBuild
  ? "hidden-source-map"
  : "cheap-eval-source-map";

console.log(
  `Building webpack in ${optimizedBuild ? "optimized" : "non-optimized"} mode`,
);

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
        test: /\.txt$/i,
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
      "process.env.PORT": JSON.stringify(PORT),
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
