import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'table' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Log',
    meta: { title: '日志管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '行为日志',
        component: () => import('@/views/log/actlog'),
        meta: { title: '行为日志', icon: 'table' }
      },
      {
        path: 'tree',
        name: '请求日志',
        component: () => import('@/views/log/reqlog'),
        meta: { title: '请求日志', icon: 'tree' }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/nested/menu1',
    name: '首页管理',
    meta: { title: '首页管理', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: '首页数据',
        component: () => import('@/views/front/list'),
        meta: { title: '首页数据', icon: 'tree' }
      },
      {
        path: 'add',
        name: '添加图书',
        component: () => import('@/views/front/add'),
        meta: { title: '添加图书', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑图书',
        component: () => import('@/views/front/edit'),
        meta: { title: '编辑图书', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/example/table',
    name: 'Log',
    meta: { title: '统计分析', icon: 'example' },
    children: [
      {
        path: 'chart',
        name: '统计分析',
        component: () => import('@/views/statistics/chart'),
        meta: { title: '统计分析', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
/*  mode: 'history', // 后端支持可开*/
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})