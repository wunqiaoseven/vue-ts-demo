import Vue from 'vue';

// @ts-ignore
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import i18n from '@/plugins/i18n';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.scss'; // global css
import '@/router/routeGuard'

Vue.use(ElementUI, {locale: process.env.VUE_APP_I18N_LOCALE === 'cn' ? zhLocale : enLocale});

Vue.config.productionTip = false;
// 取消所有 vue 日志与警告
Vue.config.silent = true;
export default new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
