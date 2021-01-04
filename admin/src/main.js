import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import './style/style.css'

axios.defaults.baseURL = 'http://localhost:3000/admin/api'
// axios.defaults.baseURL: process.env.VUE_APP_API_URL || '/web/api'
Vue.use(VueAxios, axios)

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (sessionStorage.token) {
      config.headers.Authorization = 'Bearer ' + sessionStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
      if (err.response.status === 401) {
        router.push('/login')
      }
    }
    return Promise.reject(err)
  }
)

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
