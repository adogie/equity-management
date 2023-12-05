import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/BasicLayout'

export const constantRoutes = []
export const asyncRoutes = [
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...asyncRoutes, ...constantRoutes]
})

export default router
