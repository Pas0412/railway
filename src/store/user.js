const state = {
  token: null,
  user: null,
  menuList: []
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
  CLEAR_TOKEN(state) {
    state.token = null;
  },
  SET_MENU_LIST(state, menuList) {
      state.menuList = menuList;
  },
};

const actions = {
  login({ commit }, user) {
    commit('SET_TOKEN', user.token);
    commit('SET_USER', user);
    const menuList = user.menuList[0].children;
    const processedMenuList = processMenuList(menuList); // 函数用于处理 menuList
    commit('SET_MENU_LIST', processedMenuList);
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN');
    commit('CLEAR_USER');
  },
};

function processMenuList(menuList) {
  const uniqueMenuList = [];
  const seenIds = new Set();

  const menuToComponentMapping = {
      "首页": "DashBoard",
      "设备管理": "Devieces",
      "传感器管理": "Sensors",
      "数据管理": "Data",
      "监测数据": "MonitoringData",
      "实时曲线": "RealTimeChart",
      "预警管理": "Warnings",
      "权限管理": "Auth",
      "设置": "Settings",
      // 其他菜单项和组件的映射
  };
  
  const menuNameToRouteMapping = {
      "首页": "dashboard",
      "设备管理": "devices",
      "传感器管理": "sensors",
      "数据管理": "data",
      "监测数据": "monitoring-data",
      "实时曲线": "real-time-chart",
      "预警管理": "warnings",
      "权限管理": "auth",
      "设置": "settings"
    };  
  
  menuList.forEach(item => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      const componentName = menuToComponentMapping[item.name]; // 根据菜单项名称获取组件名称
      const routeName = menuNameToRouteMapping[item.name];
      if (componentName) {
        uniqueMenuList.push({
          ...item,
          componentName, // 将组件名称添加到菜单项中
          routeName
        });
      }
    }
  });

  return uniqueMenuList;
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  getUser: (state) => state.user,
  getMenuList: (state) => state.user ? state.menuList : [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};