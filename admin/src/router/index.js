import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/categories/create',
        component: () => import('@/views/CategoryEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import('@/views/CategoryEdit.vue'),
        props: true
      },
      {
        path: '/categories/list',
        component: () => import('@/views/CategoryList.vue')
      },
      {
        path: '/items/create',
        component: () => import('@/views/ItemEdit.vue')
      },
      {
        path: '/items/edit/:id',
        component: () => import('@/views/ItemEdit.vue'),
        props: true
      },
      {
        path: '/items/list',
        component: () => import('@/views/ItemList.vue')
      },
      {
        path: '/heroes/create',
        component: () => import('@/views/HeroEdit.vue')
      },
      {
        path: '/heroes/edit/:id',
        component: () => import('@/views/HeroEdit.vue'),
        props: true
      },
      {
        path: '/heroes/list',
        component: () => import('@/views/HeroList.vue')
      },
      {
        path: '/articles/create',
        component: () => import('@/views/ArticleEdit.vue')
      },
      {
        path: '/articles/edit/:id',
        component: () => import('@/views/ArticleEdit.vue'),
        props: true
      },
      {
        path: '/articles/list',
        component: () => import('@/views/ArticleList.vue')
      },
      {
        path: '/ads/create',
        component: () => import('@/views/AdEdit.vue')
      },
      {
        path: '/ads/edit/:id',
        component: () => import('@/views/AdEdit.vue'),
        props: true
      },
      {
        path: '/ads/list',
        component: () => import('@/views/AdList.vue')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
