const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { NODE_ENV, OPTIMIZED_BUILD, PORT } = process.env;
const webpackDotEnvPath = `./config/.env.${NODE_ENV}`;
const webpackEnvVars = Dotenv.config({ path: webpackDotEnvPath }).parsed;
const localEnvironment = NODE_ENV === "local";
const isOptimized = OPTIMIZED_BUILD === "true" || NODE_ENV === "production";
const webpackWatch = localEnvironment && !isOptimized;
const webpackMode = isOptimized ? "production" : "development";
const webpackDevtool = isOptimized
  ? "hidden-source-map"
  : "cheap-eval-source-map";

const config = {
  mode: webpackMode,
  watch: webpackWatch,
  watchOptions: {
    poll: true,
  },
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  target: "web",
  devtool: webpackDevtool,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
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
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        exclude: /node_modules/,
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
    new CopyWebpackPlugin(["public"], { copyUnmodified: localEnvironment }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      // We need NODE_ENV in the env object and as a separate expression
      // Otherwise, webpack will not build properly.
      "process.env": JSON.stringify({ NODE_ENV, ...webpackEnvVars }),
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // Don't let webpack override our NODE_ENV
    nodeEnv: false,
  },
};

if (localEnvironment) {
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin(),
    new LiveReloadPlugin(),
    new WebpackShellPlugin({
      dev: true,
      onBuildEnd: ["yarn server:build"],
    }),
  );
}

if (isOptimized) {
  config.performance = {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
    hints: "warning",
  };
  config.optimization = {
    ...config.optimization,
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            beautify: false,
            comments: false,
          },
        },
      }),
    ],
  };
}

module.exports = config;
