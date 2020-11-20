import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TodoShow from '@/views/TodoShow.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todos/:id',
    name: 'TodoShow',
    component: TodoShow
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
