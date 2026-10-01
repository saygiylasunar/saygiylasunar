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
    { path: '/', name: 'home', component: HomeView, meta: { seoKey: 'home', section: 'studio' } },
    { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue'), meta: { seoKey: 'services', section: 'work' } },
    { path: '/services/:slug', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue'), meta: { seoKey: 'services', section: 'work' } },
    { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue'), meta: { seoKey: 'projects', section: 'work' } },
    {
      path: '/projects/loravow',
      name: 'loravow-external',
      beforeEnter() {
        window.location.assign(LORAVOW_URL)
        return false
      },
    },
    { path: '/projects/:slug', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue'), meta: { seoKey: 'projects', section: 'work' } },

    { path: '/blog', name: 'blog', component: () => import('../views/BlogView.vue'), meta: { seoKey: 'blog', section: 'journal' } },
    { path: '/blog/:slug', name: 'blog-detail', component: () => import('../views/BlogDetailView.vue'), meta: { seoKey: 'blog', section: 'journal' } },
    { path: '/logbook', redirect: '/blog' },
    { path: '/logbook/:slug', redirect: (to) => `/blog/${to.params.slug}` },

    { path: '/music', name: 'music', component: () => import('../views/MusicView.vue'), meta: { seoKey: 'music', section: 'music' } },
    { path: '/experience', name: 'experience', component: () => import('../views/ExperienceView.vue'), meta: { seoKey: 'experience', section: 'profile' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { seoKey: 'about', section: 'profile' } },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { seoKey: 'contact', section: 'profile' } },

    { path: '/tools', name: 'tools', component: () => import('../views/ToolsView.vue'), meta: { seoKey: 'tools', section: 'lab' } },
    { path: '/tools/password', name: 'password', component: () => import('../views/PasswordToolView.vue'), meta: { seoKey: 'password', section: 'lab' } },
    { path: '/tools/exif', name: 'exif', component: () => import('../views/ExifCleanerView.vue'), meta: { seoKey: 'exif', section: 'lab' } },
    { path: '/tools/webp', name: 'webp', component: () => import('../views/WebpToolView.vue'), meta: { seoKey: 'webp', section: 'lab' } },
    { path: '/tools/resize', name: 'resize', component: () => import('../views/ImageResizeToolView.vue'), meta: { seoKey: 'resize', section: 'lab' } },
    { path: '/tools/hash', name: 'hash', component: () => import('../views/HashToolView.vue'), meta: { seoKey: 'hash', section: 'lab' } },
    { path: '/tools/json', name: 'json', component: () => import('../views/JsonToolView.vue'), meta: { seoKey: 'json', section: 'lab' } },
    { path: '/tools/contrast', name: 'contrast', component: () => import('../views/ContrastToolView.vue'), meta: { seoKey: 'contrast', section: 'lab' } },

    { path: '/arsalar', name: 'lands', component: () => import('../views/LandPortfolioView.vue'), meta: { seoKey: 'lands', section: 'property' } },
    { path: '/ogg', name: 'ogg', component: () => import('../views/OggScheduleView.vue'), meta: { seoKey: 'ogg', section: 'security' } },
    { path: '/ogg/:slug', name: 'ogg-lesson', component: () => import('../views/OggLessonView.vue'), meta: { seoKey: 'ogg', section: 'security' } },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { seoKey: 'notFound', section: 'studio', noindex: true } },
  ],
})

export default router
