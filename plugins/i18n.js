import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: app.$cookies.get('lang') || 'ja',
    fallbackLocale: 'ja',
    silentTranslationWarn: true,
    messages: {
      'ja': require('~/locales/ja.json'),
      'en': require('~/locales/en.json')
    }
  })
}
