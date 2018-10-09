import Vue from 'vue'

import App from './app/app.component.vue'
import bootstrap from './config/bootstrap'
import router from './router'

bootstrap.loadElement()
bootstrap.loadIcons()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
