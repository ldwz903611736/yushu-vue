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
    redirect: '/index',
    name: '首页',
    children: [{
      path: 'index',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'index' }
    }]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/table',
    name: 'Log',
    meta: { title: '系统监控', icon: 'monitor' },
    children: [
      {
        path: 'infolog',
        name: '操作日志',
        component: () => import('@/views/log/log'),
        meta: { title: '操作日志', icon: 'log' }
      },
      {
        path: 'errorlog',
        name: '异常日志',
        component: () => import('@/views/log/erlog'),
        meta: { title: '异常日志', icon: 'error' }
      },
      {
        path: 'servers',
        name: '服务监控',
        component: () => import('@/views/server/index'),
        meta: { title: '服务监控', icon: 'codeConsole' }
      },
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/nested/menu1',
    name: '首页管理',
    meta: { title: '首页管理', icon: 'system' },
    children: [
      {
        path: 'list',
        name: '首页数据',
        component: () => import('@/views/front/list'),
        meta: { title: '首页数据', icon: 'education' }
      },
      {
        path: 'add',
        name: '添加图书',
        component: () => import('@/views/front/add'),
        meta: { title: '添加图书', icon: 'education' }
      },
      {
        path: 'edit/:id',
        name: '编辑图书',
        component: () => import('@/views/front/edit'),
        meta: { title: '编辑图书', icon: 'education' },
        hidden: true
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/nested/menu1',
    name: '鱼漂记录',
    meta: { title: '鱼漂记录', icon: 'education' },
    children: [
      {
        path: 'list',
        name: '鱼漂记录',
        component: () => import('@/views/record/record'),
        meta: { title: '鱼漂记录', icon: 'education' }
      }
    ]
  },
  {
    path: '/sys-tools',
    component: Layout,
    redirect: '/example/table',
    name: 'Log',
    meta: { title: '系统工具', icon: 'sys-tools' },
    children: [
      {
        path: 'swagger',
        name: '接口文档',
        component: () => import('@/views/tools/swagger'),
        meta: { title: '接口文档', icon: 'swagger' }
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
        meta: { title: '统计分析', icon: 'chart' }
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
