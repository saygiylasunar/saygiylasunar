import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import PasswordTool from '../views/tools/PasswordTool.vue'
import ExifTool from '../views/tools/ExifTool.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tools/password-generator',
    name: 'PasswordTool',
    component: PasswordTool,
    meta: {
      title: 'Online Keygen – Parola Oluşturucu',
      description: 'Güçlü rastgele parolalar oluşturun – güvenli, ücretsiz ve kullanımı kolay parola üretici.'
    }
  },
  {
    path: '/tools/exif-remover',
    name: 'ExifTool',
    component: ExifTool,
    meta: {
      title: 'EXIF Remover – Görsel Meta Temizleyici',
      description: 'Görsellerinizdeki gizli bilgileri kaldırın – EXIF kaldırıcı aracı.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// SEO Meta güncellemesi
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router