import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vueFormCreate',
      component: () => import('../views/vueFormCreate.vue')
    },
    {
      path: '/formDesign',
      name: 'formDesign',
      component: () => import('../views/formDesign.vue')
    },
    {
      path:'/vFormDesigner',
      name: 'vFormDesigner',
      component: () => import('../views/vFormDesigner.vue')
    }
  ]
})

export default router
