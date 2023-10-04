import { createStore } from 'vuex';
import sidebar from './sidebar';
import user from './user';

export default createStore({
  state: {
    // 在此处添加状态管理
  },
  mutations: {
    // 在此处添加 mutations
  },
  actions: {
    // 在此处添加 actions
  },
  modules: {
    // 在此处添加模块
    sidebar,
    user,
  },
});
