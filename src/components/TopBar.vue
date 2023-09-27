<template>
  <div class="top-bar">
    <img
      :class="sidebarVisible? 'list-active':'list'"
      src="../assets/list.svg"
      alt="list"
      @click="toggleSidebar"
    />
    <img class="logo" src="../assets/logo.png" alt="logo">
    <div class="title">软土地区铁路路基远程在线监测信息管理系统</div>
  </div>
</template>

<script>
export default {
    computed: {
    sidebarVisible() {
      return this.$store.state.sidebar.sidebarVisible; // 从 Vuex 中获取侧边栏状态
    },
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("sidebar/toggleSidebar"); // 调用 Vuex action 切换侧边栏状态
    },
  },
};
</script>

<style>
.top-bar {
  background-color: #fff;
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}

.list {
  height: 30px;
  width: 30px;
  cursor: pointer;
  padding: 5px;
}

.list-active {
  height: 30px;
  width: 30px;
  cursor: pointer;
  padding: 5px;
  background-color: rgb(244, 243, 243);
  border-radius: 5px;
}

.list:hover {
  height: 30px;
  width: 30px;
  cursor: pointer;
  padding: 5px;
  background-color: rgb(228, 224, 224);
  border-radius: 5px;
}

.logo {
    margin-left: 50px;
    height: 30px;
    width: 30px;
}

.title {
  margin-left: 10px;
  font-size: 24px;
}
</style>
