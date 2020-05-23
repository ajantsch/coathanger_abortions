const webpack = require("webpack");
const path = require("path");
const { spawn } = require("child_process");
const colors = require("colors");
const Dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const { NODE_ENV, OPTIMIZED_BUILD } = process.env;

const envConfigPath = `./config/.env.${NODE_ENV}`;
const envConfig = Dotenv.config({ path: envConfigPath }).parsed;
const localEnvironment = NODE_ENV === "local";
const productionEnvironment = NODE_ENV === "production";
const isOptimized = OPTIMIZED_BUILD === "true" || productionEnvironment;
const webpackWatch = localEnvironment && !isOptimized;
const webpackMode = isOptimized ? "production" : "development";
const webpackDevtool = isOptimized ? "hidden-source-map" : "cheap-eval-source-map";

console.log(`Webpack building in ${isOptimized ? "optimized" : "non-optimized"} mode`);

const config = {
  mode: webpackMode,
  watch: webpackWatch,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  target: "web",
  devtool: webpackDevtool,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", "woff", "woff2", "ttf"],
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
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "fonts",
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
    new CopyWebpackPlugin({ patterns: [{ from: "public" }] }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      // We need NODE_ENV in the env object and as a separate expression
      // Otherwise, webpack will not build properly.
      "process.env": JSON.stringify({ ...process.env, ...envConfig }),
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
  config.plugins.push(new ForkTsCheckerWebpackPlugin(), new LiveReloadPlugin(), {
    apply: compiler => {
      let executed = false;
      compiler.hooks.afterEmit.tap("AfterFirstEmitPlugin", () => {
        if (!executed) {
          const cmd = spawn("yarn", ["server:build"], { stdio: "pipe" });
          cmd.stdout.on("data", function(data) {
            console.log(colors.green.bold(data.toString()));
          });
          cmd.stderr.on("data", function(data) {
            console.error(colors.red.bold(data.toString()));
          });
          cmd.on("exit", function(code) {
            console.log("AfterFirstEmitPlugin exited with code " + code.toString());
          });
          executed = true;
        }
      });
    },
  });
}

if (productionEnvironment) {
  config.plugins.push(
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ["console.info", "console.debug", "console.warn"],
          },
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
