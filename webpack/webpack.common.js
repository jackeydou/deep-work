const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.join(__dirname, "..", "src");

const htmlPlugins = [
  new HTMLWebpackPlugin({
    filename: 'popup.html',
    template: path.join(__dirname, '../public/index.html'),
    chunks: ['popup']
  }),
  new HTMLWebpackPlugin({
    filename: 'focus.html',
    template: path.join(__dirname, '../public/index.html'),
    chunks: ['focus']
  }),
  new HTMLWebpackPlugin({
    filename: 'options.html',
    template: path.join(__dirname, '../public/index.html'),
    chunks: ['options']
  })
];

module.exports = {
    entry: {
      popup: path.join(srcDir, 'pages/popup.tsx'),
      focus: path.join(srcDir, 'pages/focus/index.tsx'),
      options: path.join(srcDir, 'pages/options.tsx'),
      background: path.join(srcDir, 'scripts/background.ts'),
      content_script: path.join(srcDir, 'scripts/content_script.ts'),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                  MiniCssExtractPlugin.loader, // "style-loader",
                  "css-loader",
                  {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            "postcss-preset-env",
                            {
                              // Options
                            },
                          ],
                        ],
                      },
                    },
                  },
                ],
            },
            {
              test: /\.svg/,
              use: {
                loader: "svg-react-loader",
                options: {
                },
              },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash:8].css",
        }),
        ...htmlPlugins,
    ],
};
