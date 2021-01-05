import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import NProgress from 'nprogress'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api/',
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    NProgress.start() // 展示进度条
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer' + token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
http.interceptors.response.use(
  res => {
    NProgress.done() //隐藏进度条
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

export default http
