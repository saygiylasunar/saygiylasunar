import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/global.css'

const app = createApp(App)

app.directive('reveal', {
  mounted(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible')
      return
    }

    element.classList.add('reveal')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.classList.add('is-visible')
        observer.disconnect()
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
  },
})

app.use(router)
app.mount('#app')
