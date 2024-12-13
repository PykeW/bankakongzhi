import { createRouter, createWebHistory } from 'vue-router'
import AxisControlView from '@/views/AxisControlView.vue'

const routes = [
  {
    path: '/axis-control',
    name: 'AxisControl',
    component: AxisControlView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router