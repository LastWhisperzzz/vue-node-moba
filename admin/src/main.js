import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'nprogress/nprogress.css'
import './assets/css/global.scss' // global css
import './assets/iconfont/iconfont.css' // 字体图标
import './plugins/element.js' // element插件
// axios
import http from './api/http'
Vue.prototype.axios = http

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.axios.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
