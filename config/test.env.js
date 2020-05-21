'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',//环境变量
  VUE_APP_I18N_LOCALE: '"cn"',//初始化语言
});
