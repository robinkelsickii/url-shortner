import { createRouter, createWebHistory } from 'vue-router'
import UrlInput from '@/components/UrlInput.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'url-input',
      component: UrlInput,
    },
  ],
})

export default router
