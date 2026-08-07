import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 88 }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'home' } },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
      meta: { title: 'services' },
    },
    {
      path: '/services/:slug',
      name: 'service-detail',
      component: () => import('../views/ServiceDetailView.vue'),
      meta: { title: 'services' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { title: 'projects' },
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
      meta: { title: 'projects' },
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
      meta: { title: 'experience' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'about' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'contact' },
    },
    {
      path: '/tools/password',
      name: 'password',
      component: () => import('../views/PasswordToolView.vue'),
      meta: { title: 'password' },
    },
    {
      path: '/arsalar',
      name: 'lands',
      component: () => import('../views/LandPortfolioView.vue'),
      meta: { title: 'lands' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'notFound' },
    },
  ],
})

export default router
