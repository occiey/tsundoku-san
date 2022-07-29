import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import BookSearch from '../views/BookSearch.vue'
import BookForm from '../views/BookForm.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home
  }, //トップページ
  { 
    path: '/search',
    name: 'Search',
    component: BookSearch
  }, //Googleブックス検索フォーム
  { 
    path: '/form',
    name: 'From',
    component: BookForm
  }, //書籍レビュー用フォーム
  { 
    path: '/:paths(.*)*',
    name: 'Fallback',
    redirect: '/'
  }, //その他存在しないurl
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
