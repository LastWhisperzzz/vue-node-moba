//default
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

//plugins
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//axios
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

// 在app引入
import './assets/css/style.scss'
import './assets/iconfont/iconfont.css'

import Card from './components/Card.vue'
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
