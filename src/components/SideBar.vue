<template>
  <div class="sidebar" :class="{ hidden: !sidebarVisible }">
    <!-- 使用v-for动态渲染菜单项 -->
    <template v-for="menuItem in menuList" :key="menuItem.routeName">
      <router-link
        :to="{ path: `/${menuItem.routeName}` }"
        :class="{
          active: $route.path === `/${menuItem.routeName}`,
          'non-active': $route.path !== `/${menuItem.routeName}`,
        }"
      >
        <img
          :src="require(`../assets/${menuItem.routeName}.svg`)"
          class="sidebar-logo"
          alt=""
        />
        {{ menuItem.name }}
      </router-link>

      <!-- 在 "数据管理" 后面插入 "监测数据" 和 "实时曲线" -->
      <template
        v-if="menuItem.routeName === 'data' && isDataManagementSelected"
      >
        <router-link
          to="/monitoring-data"
          :class="{
            active: $route.path === '/monitoring-data',
            'non-active': $route.path !== '/monitoring-data',
          }"
          :key="'monitoring-data'"
        >
          <!-- 包装元素，添加左边距 -->
          <div class="sidebar-item-wrapper sidebar-item-sub">
            <img
              :src="require(`../assets/monitoring-data.svg`)"
              class="sidebar-logo"
              alt=""
            />
            监测数据
          </div>
        </router-link>
        <router-link
          to="/real-time-chart"
          :class="{
            active: $route.path === '/real-time-chart',
            'non-active': $route.path !== '/real-time-chart',
          }"
          :key="'real-time-chart'"
        >
          <!-- 包装元素，添加左边距 -->
          <div class="sidebar-item-wrapper sidebar-item-sub">
            <img
              :src="require(`../assets/real-time-chart.svg`)"
              class="sidebar-logo"
              alt=""
            />
            实时曲线
          </div>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script>
// import router from "@/router";
export default {
  data() {
    return {
      isDataManagementSelected: false,
    };
  },
  computed: {
    sidebarVisible() {
      console.log(this.$store.state.sidebar.sidebarVisible);
      return this.$store.state.sidebar.sidebarVisible; // 从 Vuex 中获取侧边栏状态
    },
    menuList() {
      const storedMenuList = localStorage.getItem('menuList');
      // console.log(storedMenuList);
    
    // 如果LocalStorage中有存储的menuList，就使用它，否则从Vuex获取
    return storedMenuList ? JSON.parse(storedMenuList) : this.$store.getters["user/getMenuList"];
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
      const monitoringDataPath = "/monitoring-data";
      const realTimeChartPath = "/real-time-chart";
      const warningsPath = "/warnings";
      const authPath = "/auth";
      const settingsPath = "/settings";

      // console.log(this.$route.fullPath);

      if (currentPath != dataPath || !currentPath.startsWith(`${dataPath}/`)) {
        this.toggleSubSidebar();
      }

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
        this.activeSubSidebar();
        this.activateSidebarItem("data");
      } else if (
        currentPath === monitoringDataPath ||
        currentPath.startsWith(`${monitoringDataPath}/`)
      ) {
        this.activeSubSidebar();
        this.activateSidebarItem("monitoring-data");
      } else if (
        currentPath === realTimeChartPath ||
        currentPath.startsWith(`${realTimeChartPath}/`)
      ) {
        this.activeSubSidebar();
        this.activateSidebarItem("real-time-chart");
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
    activeSubSidebar() {
      this.isDataManagementSelected = true;
    },
    toggleSubSidebar() {
      this.isDataManagementSelected = false;
    },
  },
};
</script>

<style scoped>
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
  padding: 10px 0 10px 20px;
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
  padding: 10px 0 10px 20px;
  margin-bottom: 10px;
  background-color: rgb(244, 243, 243);
  text-decoration: none;
}

.non-active:hover {
  display: flex;
  justify-content: flex-start;
  color: black;
  padding: 10px 0 10px 20px;
  margin-bottom: 10px;
  background-color: rgb(228, 224, 224);
  text-decoration: none;
}

.sidebar-logo {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

/* 给包装元素添加左边距 */
.sidebar-item-wrapper {
  margin-left: 10px; /* 这里设置左边距的大小 */
}

/* 对于子菜单项，添加额外的左边距 */
.sidebar-item-sub {
  margin-left: 20px; /* 子菜单项的左边距可以根据需要设置更大的值 */
}
</style>
