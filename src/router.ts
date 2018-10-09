import Vue from 'vue'
import VueRouter from 'vue-router'

import ListUsers from './modules/user/listUsers/listUsers.component.vue'
import formUser from './modules/user/formUser/formUser.component.vue'

Vue.use(VueRouter)

const routers = [
  {
    path: '/nuevo-usuario',
    component: formUser,
  },
  {
    path: '/editar-usuario-:idUsuario',
    component: formUser,
  },
  {
    path: '/',
    component: ListUsers,
    name: 'ListUsers'
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routers
})
