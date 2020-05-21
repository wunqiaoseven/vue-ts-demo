import VueI18n from 'vue-i18n';
import axios from 'axios';
import Vue from 'vue';
import cn from '@/assets/lang/cn.json';

const locale = process.env.VUE_APP_I18N_LOCALE || 'cn';//init，语言

const loadedLanguages = [locale];//已加载的语言包

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: locale,//初始化语言
  fallbackLocale: locale,//备用回退语言
  messages: {cn: cn},//初始语言包加载默认与备用语言
});

/**加载lang目录下的所有语言包*/
function loadLocaleMessages() {
  const locales = require.context('@/assets/lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) messages[matched[1]] = locales(key);
  });
  return messages;
}

/**异步引入语言包*/
function ImportLangJson(lang) {
  return new Promise((resolve, reject) => {
    import(`@/assets/lang/${lang}.json`).then(msgs => resolve(msgs.default));
  });
}

/**更新语言设置*/
function setI18nLanguage(lang, msg) {
  i18n.locale = lang;
  msg && i18n.setLocaleMessage(lang, msg);
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

/**按需加载对应语言包
 * 大于两名语言时*/
export function loadLanguageAsync(lang = 'cn') {
  return new Promise((resolve, reject) => {
    if (i18n.locale === lang) return resolve(lang);
    if (loadedLanguages.includes(lang)) return resolve(setI18nLanguage(lang));
    ImportLangJson(lang).then(msg => {
      loadedLanguages.push(lang);
      resolve(setI18nLanguage(lang, msg));
    });

  });
}

export default i18n;
