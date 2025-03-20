import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/meeting/:id?',
      name: 'meeting',
      component: () => import('../views/meeting/index.vue'),
    },
  ],
})

export default router
