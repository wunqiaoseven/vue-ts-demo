import {asyncRouterMap, constantRouterMap} from '@/router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param perms
 * @param route
 */
function hasPermission(perms, route) {
  if (route.meta && route.meta.perms) {
    return perms.some(role => route.meta.perms.indexOf(role) !== -1);
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param perms
 */
function filterAsyncRouter(asyncRouterMap, perms) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(perms, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, perms);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: null,
  },

  getters: {
    permissionRouters: state => state.routers,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {perms} = data;
        let accessedRouters;
        if (perms.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = asyncRouterMap.filter(route => {
            if (!route.meta || !route.meta.perms) {
              return true;
            } else {
              return perms.indexOf(route.meta.perms) !== -1;
            }
          });
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
  },
};

export default permission;
