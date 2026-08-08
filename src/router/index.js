import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const LORAVOW_URL = 'https://loravow.com'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path && !to.hash) return false
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 48 }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'home' } },
    { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue'), meta: { title: 'services' } },
    { path: '/services/:slug', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue'), meta: { title: 'services' } },
    { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue'), meta: { title: 'projects' } },
    {
      path: '/projects/loravow',
      name: 'loravow-external',
      beforeEnter() {
        window.location.assign(LORAVOW_URL)
        return false
      },
    },
    { path: '/projects/:slug', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue'), meta: { title: 'projects' } },
    { path: '/music', name: 'music', component: () => import('../views/MusicView.vue'), meta: { title: 'music' } },
    { path: '/experience', name: 'experience', component: () => import('../views/ExperienceView.vue'), meta: { title: 'experience' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: 'about' } },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { title: 'contact' } },
    { path: '/tools', name: 'tools', component: () => import('../views/ToolsView.vue'), meta: { title: 'tools' } },
    { path: '/tools/password', name: 'password', component: () => import('../views/PasswordToolView.vue'), meta: { title: 'password' } },
    { path: '/tools/exif', name: 'exif', component: () => import('../views/ExifCleanerView.vue'), meta: { title: 'exif' } },
    { path: '/tools/webp', name: 'webp', component: () => import('../views/WebpToolView.vue'), meta: { title: 'tools' } },
    { path: '/tools/resize', name: 'resize', component: () => import('../views/ImageResizeToolView.vue'), meta: { title: 'tools' } },
    { path: '/tools/hash', name: 'hash', component: () => import('../views/HashToolView.vue'), meta: { title: 'tools' } },
    { path: '/tools/json', name: 'json', component: () => import('../views/JsonToolView.vue'), meta: { title: 'tools' } },
    { path: '/tools/contrast', name: 'contrast', component: () => import('../views/ContrastToolView.vue'), meta: { title: 'tools' } },
    { path: '/arsalar', name: 'lands', component: () => import('../views/LandPortfolioView.vue'), meta: { title: 'lands' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'notFound' } },
  ],
})

export default router
