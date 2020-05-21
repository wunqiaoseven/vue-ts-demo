import router from './index';
import store from '@/store/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {Message} from 'element-ui';
import {EnWhiteList}from'@/types/enum'

function makeRouters(perms, next, to) {
  store.dispatch('GenerateRoutes', {perms}).then(() => { // 生成可访问的路由表
    router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
    next({...to});
  });
}

function getUser(to, from, next) {
  store.dispatch('getUserInfo').then(res => {
    if (!res.success) return this.$router.push({path: '/login'});
    store.getters.userIdentity.enterpriseId ? makeRouters(store.getters.perms, next, to) : next('/chooseCompany');
  }).catch(async err => {
    await store.dispatch('LoginOut');
    Message.error(err.description || '登录信息失效,请重新登录');
    next('/login');//重定向到登录页
  });
}

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (EnWhiteList.hasOwnProperty(to.path)) { // 在白名单，直接进入
    return next();
  }
  next();
  if (!store.getters['user/jwt']) {//没有jwt
    // store.dispatch('SyncLogin').then(() => getUser(to, from, next)).catch(async err => {
    //   await store.dispatch('LoginInvalid');
    //   from.path !== '/' && Message.error(err.description || '登录信息失效,请重新登录');
    //   next('/login');//重定向到登录页
    // });
  } else {
    // if (!store.getters.addRouters) {
    //   if (store.getters.userIdentity) {
    //     store.getters.userIdentity.enterpriseId ? makeRouters(store.getters.perms, next, to) : next('/chooseCompany');
    //   } else {
    //     getUser(to, from, next);
    //   }
    // } else {
    //   store.getters.userIdentity.enterpriseId ? next() : next('/chooseCompany');
    //
    // }
  }
});

router.afterEach(() => NProgress.done()); // 结束Progress;
