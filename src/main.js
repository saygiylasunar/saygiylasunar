import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import messages from './locales'
import './styles/global.scss'

const i18n = createI18n({
  legacy: false,
  locale: 'tr',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')