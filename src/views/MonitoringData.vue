<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="settings">
      <h1>monitoring-data</h1>
      <!-- 在此添加设置页面内容 -->
    </div>
  </template>
  
  <script>
  export default {
    // 在此添加组件逻辑
    mounted() {
    console.log('Component mounted:', this.$route.path);
  },
  };
  </script>
  
  <style>
  .settings {
    margin: 10px;
    width: 100%;
    color: black;
    background-color: white;
  }
  </style>
  