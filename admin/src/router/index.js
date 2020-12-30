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
