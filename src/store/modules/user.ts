let state = {
  info: {},
  jwt: null,
};

const mutations = {
  SETJWT(state, jwt) {
    state.jwt = jwt;
  },
  SETUSERINFO(state, userInfo) {
    state.userInfo = userInfo || {};
  },
};

const actions = {
  //用户登录
  async login({commit, state}) {

  },
  //用户退出
  async loginOut({commit, state}) {

    commit('SETJWT', null);
  },
  //设置用户信息
  async getUserInfo({commit, state}) {

  },
};

const getters = {
  info: state => state.info,
  jwt: state => state.jwt||sessionStorage.getItem(''),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
