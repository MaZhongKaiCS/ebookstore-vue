import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/',
    //  重定向
    redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index.vue'),
      children: [
        {
          // 动态路由就是以：为起点
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader.vue')
        }
      ]
    }
  ]
})
