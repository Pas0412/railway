<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <TopBar />
    <div class="content">
      <Sidebar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Sidebar from "@/components/SideBar.vue";

export default {
  components: {
    TopBar,
    Sidebar,
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}
</style>
