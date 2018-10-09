import Vue from 'vue'
import VueRouter from 'vue-router'

import ListUsers from './user/listUsers/listUsers.component.vue'

Vue.use(VueRouter)

const routers = [
  {
    path: '/',
    component: ListUsers,
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routers
})
