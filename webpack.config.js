const fs = require("fs");
const dotenv = require("dotenv");
const webpack = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;

const env = dotenv.config().parsed;
const envKeys = Object.keys(env || {}).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
const packageName = require("./package.json").name;
function removeChar(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}
const exposes = fs
  .readdirSync("./src/components/")
  .reduce(function (exposes, module) {
    exposes[`./${module}`] = `./src/components/${module}`;
    return exposes;
  }, {});

module.exports = {
  entry: "./index.ts",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    publicPath: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${process.env.S3_BUCKET_KEY}/`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, // to inject the result into the DOM as a style block
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
              sourceMap: true,
            },
          }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          }, // to convert SASS to CSS
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    // https://github.com/webpack/webpack/issues/7172
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      exclude: [/node_modules/],
      test: /\.ts($|\?)/i,
    }),
    new webpack.DefinePlugin(envKeys),
    new ModuleFederationPlugin({
      name: packageName,
      // library.name is expose for other app, package
      library: { type: "var", name: removeChar(packageName) },
      filename: "remoteEntry.js",
      exposes: exposes,
      shared: ["react", "react-dom"],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
