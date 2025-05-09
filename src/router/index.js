import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blog from '@/views/Blog.vue'
import SingleArticle from '@/views/SingleArticle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/blog/:slug',
      name: 'single-article',
      component: SingleArticle
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'blog' || to.name === 'single-article') {
      return { top: 0 }
    }
    return { top: 0 }
  },
})

export default router
