<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="settings">
      <!-- 在此添加设置页面内容 -->
      <div class="table-header-operations">
      <div class="left-part">
        <input v-model="deviceName" type="text" placeholder="选择设备" />
        <input v-model="deviceName" type="text" placeholder="选择传感器类型" />
        <input v-model="deviceName" type="text" placeholder="选择传感器" />
      </div>
      <div class="right-part">
        <button>单次测量值</button>
        <button>刷新</button>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    // 在此添加组件逻辑
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
  