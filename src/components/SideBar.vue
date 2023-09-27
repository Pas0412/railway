<template>
  <div class="sidebar" :class="{ hidden: !sidebarVisible }">
    <!-- 侧边栏内容 -->
    <router-link
      to="/dashboard"
      :class="{
        active: $route.path === '/dashboard',
        'non-active': $route.path !== '/dashboard',
      }"
      >
      <img src="../assets/dashboard.svg" class="sidebar-logo" alt="">
      首页</router-link
    >
    <router-link
      to="/devices"
      :class="{
        active: $route.path === '/devices',
        'non-active': $route.path !== '/devices',
      }"
      ><img src="../assets/device.svg" class="sidebar-logo" alt="">设备管理</router-link
    >
    <router-link
      to="/sensors"
      :class="{
        active: $route.path === '/sensors',
        'non-active': $route.path !== '/sensors',
      }"
      ><img src="../assets/sensor.svg" class="sidebar-logo" alt="">传感器管理</router-link
    >
    <router-link
      to="/data"
      :class="{
        active: $route.path === '/data',
        'non-active': $route.path !== '/data',
      }"
      ><img src="../assets/data.svg" class="sidebar-logo" alt="">数据管理</router-link
    >
    <router-link
      to="/warnings"
      :class="{
        active: $route.path === '/warnings',
        'non-active': $route.path !== '/warnings',
      }"
      ><img src="../assets/warning.svg" class="sidebar-logo" alt="">预警管理</router-link
    >
    <router-link
      to="/auth"
      :class="{
        active: $route.path === '/auth',
        'non-active': $route.path !== '/auth',
      }"
      ><img src="../assets/auth.svg" class="sidebar-logo" alt="">权限管理</router-link
    >
    <router-link
      to="/settings"
      :class="{
        active: $route.path === '/settings',
        'non-active': $route.path !== '/settings',
      }"
      ><img src="../assets/setting.svg" class="sidebar-logo" alt="">设置</router-link
    >
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
      const dashboardPath = "/dashboard";
      const devicesPath = "/devices";
      const sensorsPath = "/sensors";
      const dataPath = "/data";
      const warningsPath = "/warnings";
      const authPath = "/auth";
      const settingsPath = "/settings";

      // 更新侧边栏选项的激活状态
      if (
        currentPath === dashboardPath ||
        currentPath.startsWith(`${dashboardPath}/`)
      ) {
        // 如果当前路由路径匹配或以 "/dashboard" 开头，表示 Dashboard 被选中
        this.activateSidebarItem("dashboard");
      } else if (
        currentPath === devicesPath ||
        currentPath.startsWith(`${devicesPath}/`)
      ) {
        this.activateSidebarItem("devices");
      } else if (
        currentPath === sensorsPath ||
        currentPath.startsWith(`${sensorsPath}/`)
      ) {
        this.activateSidebarItem("sensors");
      } else if (
        currentPath === dataPath ||
        currentPath.startsWith(`${dataPath}/`)
      ) {
        this.activateSidebarItem("data");
      } else if (
        currentPath === warningsPath ||
        currentPath.startsWith(`${warningsPath}/`)
      ) {
        this.activateSidebarItem("warnings");
      } else if (
        currentPath === authPath ||
        currentPath.startsWith(`${authPath}/`)
      ) {
        this.activateSidebarItem("auth");
      } else if (
        currentPath === settingsPath ||
        currentPath.startsWith(`${settingsPath}/`)
      ) {
        this.activateSidebarItem("settings");
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
        sidebarItem.classList.add("active");
      }
    },
    // 辅助方法：取消激活所有侧边栏选项
    deactivateAllSidebarItems() {
      // 移除所有侧边栏选项上的 "active" 类名
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      sidebarItems.forEach((item) => {
        item.classList.remove("active");
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
  background-color: rgb(255, 213, 154); /* 选中时的背景颜色 */
  color: rgb(255, 153, 0); /* 选中时的文本颜色 */
  display: flex;
  justify-content: flex-start;
  padding: 10px 0  10px 20px;
  margin-bottom: 10px;
  text-decoration: none;
  position: relative;
}

.active::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0; /* 将伪元素定位到整个框的最右边 */
  width: 4px; /* 短条宽度 */
  height: 100%; /* 与框高度相同 */
  background-color: rgb(255, 111, 0); /* 短条背景颜色 */
}

.non-active {
  display: flex;
  justify-content: flex-start;
  color: black;
  padding: 10px 0  10px 20px;
  margin-bottom: 10px;
  background-color: rgb(244, 243, 243);
  text-decoration: none;
}

.sidebar-logo {
    height: 20px;
    width: 20px;
    margin-right: 10px;
}
</style>
