import { useAppStore } from '@/store/app';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue')
    },
    {
      path: '/vueFormCreate',
      name: 'vueFormCreate',
      component: () => import('../views/vueFormCreate.vue')
    },
    {
      path: '/design',
      name: 'design',
      component: () => import('../views/vueFormDesign.vue')
    },
    {
      path: '/vFormDesign',
      name: 'vFormDesign',
      component: () => import('../views/vFormDesign.vue')
    },
    {
      path: '/vFormCreate',
      name: 'vFormCreate',
      component: () => import('../views/vFormCreate.vue')
    },
    {
      path: '/antdDesignFormCreate',
      name: 'antdDesignFormCreate',
      component: () => import('../views/AntdDesignFormCreate.vue')
    },
    {
      path: '/antdDesignFormDesign',
      name: 'antdDesignFormDesign',
      component: () => import('../views/AntdDesignFormDesign.vue')
    },
    {
      path: '/nuxt',
      name: 'nuxt',
      component: () => import('../views/nuxt.vue')
    },
    {
      path: '/vueAceEditor',
      name: 'vueAceEditor',
      component: () => import('../views/vueAceEditor.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/editor.vue')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/music.vue')
    },
    {
      path: '/myView',
      name: 'myView',
      component: () => import('../views/myView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // todo
  const appStore = useAppStore()
  appStore.setLoadingVal(true)
  next()
})


router.afterEach(() => {
  // todo
  const appStore = useAppStore()
  appStore.setLoadingVal(false)
})

export default router
