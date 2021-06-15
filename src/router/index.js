import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/ProfileList')
  },
  {
    path: '/detalles',
    name: 'details',
    component: () => import('../components/ProfileDetails.vue'),
    props: true
  },
  {
    path: '/favoritos',
    name: 'favorites',
    component: () => import('../components/ExportProfile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL,
})

export default router
