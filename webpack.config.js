"use strict";

const path = require('path');

const paths = {
  app: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'build'),
};

module.exports = require('alvaro-cuesta-webpack-parts').spa({
  name: 'Instant Trivia',
  paths,
  alias: {
    presenational: path.join(paths.app, 'presenational'),
    smart: path.join(paths.app, 'smart'),
  },
});
