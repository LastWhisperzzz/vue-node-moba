import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    redirect: '/welcome',
    children: [
      // welcome
      {
        path: 'welcome',
        component: () => import('@/views/Welcome.vue')
      },
      // 分类
      {
        path: 'categories',
        component: () => import('@/views/Category.vue')
      },
      // 物品
      {
        path: 'items',
        component: () => import('@/views/Item.vue')
      },
      // 英雄
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
      // 文章
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
      // 广告位
      {
        path: '/ads',
        component: () => import('@/views/Ad.vue')
      },
      //用户
      {
        path: '/admin_users',
        component: () => import('@/views/AdminUser.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 客户端路由限制
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router
