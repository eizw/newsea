import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import NewsView from '@/views/NewsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/search',
      component: SearchView,
    },
    {
      path:'/news/:title',
      name: 'news',
      component: NewsView,
    },
    {
      path:'/news/:country/:title',
      name: 'topnews',
      component: NewsView,
    }
  ]
})

export default router