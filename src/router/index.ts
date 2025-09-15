import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Statics from '@/views/Statics/Statics.vue'
import NotFound from '@/views/NotFound.vue'
import SensorList from '@/views/SensorList/SensorList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sensorList',
      name: 'SensorList',
      component: SensorList,
    },
    {
      path: '/statics',
      name: 'statics',
      component: Statics,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
