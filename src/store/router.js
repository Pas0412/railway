const state = {
    isUpdated: false, // 默认侧边栏可见
  };
  
  const mutations = {
    TOGGLE_IS_UPDATED(state) {
      state.isUpdated = true;
    },
  };
  
  const actions = {
    toggleIsUpdated({ commit }) {
      commit('TOGGLE_IS_UPDATED');
    },
  };

  const getters = {
    isUpdated: (state) => !!state.isUpdated
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  