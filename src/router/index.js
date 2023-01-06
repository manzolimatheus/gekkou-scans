import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/ErrorView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/manga/:id',
    name: 'manga',
    props: true,
    component: () => import('../views/MangaView.vue')
  },
  {
    path: '/category/:id',
    name: 'category',
    props: true,
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/read/:chapterId',
    name: 'read',
    props: true,
    component: () => import('../views/ReadView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
