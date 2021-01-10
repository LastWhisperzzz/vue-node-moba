import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/articles/:id',
        name: 'Article',
        component: () => import('../views/Article.vue'),
        props: true
      },
      {
        path: '/heroes/:id',
        name: 'Hero',
        component: () => import('../views/Hero.vue'),
        props: true
      },
      {
        path: '/strategy',
        name: 'Strategy',
        component: () => import('../views/Strategy.vue')
      },
      {
        path: '/match',
        name: 'Match',
        component: () => import('../views/Match.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
