import Cookies from 'js-cookie';

const getters = {
  sidebar: state => state.sidebar,
};
const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus')||false,
  },
  hideLayOut: false,
  hideSceneList: false,
  hideSceneAllOption: false,
};
const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
    state.sidebar.opened = !state.sidebar.opened;
  },
  SET_LAYOUT: (state, bLayOut) => {
    state.hideLayOut = bLayOut;
  },
  SET_SCENELIST: (state, bScene) => {
    state.hideSceneList = bScene;
  },
  SET_SCENEALLBTN: (state, bSceneBtn) => {
    state.hideSceneAllOption = bSceneBtn;
  },
};
const actions = {
  toggleSideBar: ({commit}) => {
    commit('TOGGLE_SIDEBAR');
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
