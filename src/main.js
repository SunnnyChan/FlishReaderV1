import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 公共css
import './assets/scss/global.scss'

Vue.config.productionTip = false
// 开启 debug  mode
Vue.config.devtools = true

// 启用router
Vue.use(router)

/* eslint-disable no-new */

new Vue({// 页面入口
  el: '#app',
  router,
  render: h => h(App)
})
