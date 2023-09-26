<template>
  <div class="sidebar" :class="{ hidden: !sidebarVisible }">
    <!-- 侧边栏内容 -->
    <router-link to="/dashboard" :class="{ 'active': $route.path === '/dashboard' }">Dashboard</router-link>
    <router-link to="/settings" :class="{ 'active': $route.path === '/settings' }">Settings</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    sidebarVisible() {
      return this.$store.state.sidebar.sidebarVisible; // 从 Vuex 中获取侧边栏状态
    },
  },
  watch: {
    $route(to) {
      // 获取当前路由的路径
      const currentPath = to.path;

      // 获取侧边栏选项的路由路径
      const dashboardPath = '/dashboard';
      const settingsPath = '/settings';

      // 更新侧边栏选项的激活状态
      if (currentPath === dashboardPath || currentPath.startsWith(`${dashboardPath}/`)) {
        // 如果当前路由路径匹配或以 "/dashboard" 开头，表示 Dashboard 被选中
        this.activateSidebarItem('dashboard');
      } else if (currentPath === settingsPath || currentPath.startsWith(`${settingsPath}/`)) {
        // 如果当前路由路径匹配或以 "/settings" 开头，表示 Settings 被选中
        this.activateSidebarItem('settings');
      } else {
        // 其他情况，取消选中所有侧边栏选项
        this.deactivateAllSidebarItems();
      }
    },
  },
  methods: {
    // 辅助方法：激活指定的侧边栏选项
    activateSidebarItem(itemName) {
      // 在侧边栏选项上添加 "active" 类名
      const sidebarItem = document.querySelector(`.sidebar-${itemName}`);
      if (sidebarItem) {
        sidebarItem.classList.add('active');
      }
    },
    // 辅助方法：取消激活所有侧边栏选项
    deactivateAllSidebarItems() {
      // 移除所有侧边栏选项上的 "active" 类名
      const sidebarItems = document.querySelectorAll('.sidebar-item');
      sidebarItems.forEach((item) => {
        item.classList.remove('active');
      });
    },
  },
};
</script>

<style>
.sidebar {
  width: 250px;
  background-color: #fff;
  color: black;
  margin-top: 10px;
  padding-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* 隐藏横向溢出内容 */

  /* 添加过渡效果 */
  transition: width 0.3s ease; /* 过渡宽度，以实现平滑动画 */
}

.hidden {
  width: 0;
}

.active {
  background-color: lightgrey; /* 选中时的背景颜色 */
  color: black; /* 选中时的文本颜色 */
}

.sidebar-link {
  padding: 10px;
  text-decoration: none;
  color: black;
}

/* 激活状态的链接样式 */
.sidebar-link.active {
  background-color: lightgrey;
  color: black;
}
</style>
