import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path && !to.hash) return false
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 48 }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { seoKey: 'home' } },
    { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue'), meta: { seoKey: 'services' } },
    { path: '/services/:slug', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue'), meta: { seoKey: 'services' } },
    { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue'), meta: { seoKey: 'projects' } },
    { path: '/projects/:slug', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue'), meta: { seoKey: 'projects' } },
    { path: '/music', name: 'music', component: () => import('../views/MusicView.vue'), meta: { seoKey: 'music' } },
    { path: '/experience', name: 'experience', component: () => import('../views/ExperienceView.vue'), meta: { seoKey: 'experience' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { seoKey: 'about' } },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { seoKey: 'contact' } },
    { path: '/tools', name: 'tools', component: () => import('../views/ToolsView.vue'), meta: { seoKey: 'tools' } },
    { path: '/tools/password', name: 'password', component: () => import('../views/PasswordToolView.vue'), meta: { seoKey: 'password' } },
    { path: '/tools/exif', name: 'exif', component: () => import('../views/ExifCleanerView.vue'), meta: { seoKey: 'exif' } },
    { path: '/tools/webp', name: 'webp', component: () => import('../views/WebpToolView.vue'), meta: { seoKey: 'tools' } },
    { path: '/tools/resize', name: 'resize', component: () => import('../views/ImageResizeToolView.vue'), meta: { seoKey: 'tools' } },
    { path: '/tools/hash', name: 'hash', component: () => import('../views/HashToolView.vue'), meta: { seoKey: 'tools' } },
    { path: '/tools/json', name: 'json', component: () => import('../views/JsonToolView.vue'), meta: { seoKey: 'tools' } },
    { path: '/tools/contrast', name: 'contrast', component: () => import('../views/ContrastToolView.vue'), meta: { seoKey: 'tools' } },
    { path: '/arsalar', name: 'lands', component: () => import('../views/LandPortfolioView.vue'), meta: { seoKey: 'lands' } },
    { path: '/ogg', name: 'ogg', component: () => import('../views/OggScheduleView.vue'), meta: { seoKey: 'ogg' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { seoKey: 'notFound', noindex: true } },
  ],
})

export default router
