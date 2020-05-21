'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',//环境变量
  VUE_APP_I18N_LOCALE: '"cn"',//初始化语言
});
