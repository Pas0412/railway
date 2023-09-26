const state = {
    sidebarVisible: true, // 默认侧边栏可见
  };
  
  const mutations = {
    TOGGLE_SIDEBAR(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
  };
  
  const actions = {
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  