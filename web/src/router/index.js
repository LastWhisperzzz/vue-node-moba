import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/articles/:id',
        name: 'Article',
        component: () => import('../views/Article.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
