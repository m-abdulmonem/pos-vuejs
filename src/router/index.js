import { createRouter, createWebHistory } from 'vue-router'

// import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component:  () =>import('../views/HomeView.vue'),
  },
  {
    path: '/invoice',
    name: 'invoice',
    component:  () =>import('../views/InvoiceView.vue'),
  },
  {
    path: '/daily',
    name: 'daily',
    component:  () =>import('../views/DailyView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
