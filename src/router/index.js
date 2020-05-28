import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export const constantRouterMap = [
  {path: '/', redirect: '/main'},
  {path: '/login', component: ()=>import('@/pages/Login'), hidden: true},
  {
    path: '/main',
    name: 'ChildTable',
    redirect: '/main/table',
    component: ()=>import('@/pages/layouts/main/Layout.vue'),//table组件demo
    meta: {
      title: '页面名称',//面包屑或者动态menu文案
    },
    children: [
      {
        path: 'table',
        name: 'ChildTable',
        component: () => import('@/demo/ChildTable.vue'),//table组件demo
        meta: {
          title: '页面名称',//面包屑或者动态menu文案
        },
      },

    ],
  },
  {
    path: '/vue',
    name: 'TsObjectComponent',
    component: ()=>import('@/demo/TsObjectComponent'),//vue.js组件
    meta: {
      title: '页面名称',
    },
  },
  {
    path: '/JsxTable',
    name: 'JsxTable',
    component: ()=>import('@/components/JsxTable'),//vue.js组件
    meta:{
      title:'页面名称'
    }
  },
  {path: '/404', component: ()=>import('@/pages/NoFound'), hidden: true},
  {path: '*', redirect: '/404', hidden: true},
];

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  // {
  //   path: '/index',
  //   component: Layout,
  //   name: 'index',
  //   hidden: true,
  //   meta: {title: '首页'},
  //   children: [
  //     {
  //       path: '/',
  //       meta: {title: '首页'},
  //       hidden: true,
  //       component: () => import('@/views/index/Index'),
  //     },
  //     {
  //       path: 'userInfo',
  //       name: 'userInfo',
  //       component: () => import('@/views/index/userInfo'),
  //       meta: {title: '基本资料'},
  //       hidden: true,
  //     },
  //   ],
  // },

];
