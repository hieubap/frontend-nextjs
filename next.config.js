/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  // optional: you can modify antd less variables directly here
  modifyVars: {
    '@primary-color': '#4caf50' ,

  },
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},
  // Other Config Here...
  webpack(config) {
    return config;
  },

});

