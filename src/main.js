import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入组件库模块
import ElementUI from 'element-ui'
import '@/assets/css/global.css'
import '@/utils/ax.js'
// 注册
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
