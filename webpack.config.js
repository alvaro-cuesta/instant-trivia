"use strict";

const path = require('path');

const merge = require('webpack-merge');
const parts = require('alvaro-cuesta-webpack-parts');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const metadata = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'build'),
};

const COMMON = merge(
  // parts.dontEmitIfErrors(),

  parts.basic({
    entry: path.join(PATHS.app, 'index.jsx'),
    outputPath: PATHS.output,
  }),

  {
    resolve: {
      alias: {
        presenational: path.join(PATHS.app, 'presenational'),
        smart: path.join(PATHS.app, 'smart'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Instant Trivia',
        metadata,
        template: path.join(PATHS.app, 'index.ejs'),
        chunksSortMode: 'dependency',
        minify: { collapseWhitespace: true },
      }),
    ],
  },

  parts.babelJS(),
  parts.babelJSX(),
  parts.styles([
    parts.CSS(),
  ]),
);

let config;

switch(process.env.npm_lifecycle_event) {
  case 'deploy:gh-pages':
  case 'build:gh-pages':
    config = merge(
      COMMON,
      { output: { publicPath: '/instant-trivia/' } },
      /*parts.clean(PATHS.build),
      parts.minify(),*/
    );
    break;

  case 'build':
    config = merge(
      COMMON,
      /*parts.clean(PATHS.build),
      parts.minify(),*/
    )

    break

  case 'dev':
    config = merge(
      COMMON,
      { output: { publicPath: '/' } },
    )

    break

  default:
    config = COMMON
}

module.exports = config
