<template>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(device, index) in displayedData" :key="index">
          <td>{{ device.deviceId }}</td>
          <td>{{ device.deviceCode }}</td>
          <td>{{ device.deviceName }}</td>
          <td>{{ device.deviceType }}</td>
          <td>{{ device.batteryLevel }}</td>
          <td>{{ device.deviceSignal }}</td>
          <td>{{ device.sensorAbnormalCondition }}</td>
          <td>{{ device.deviceState }}</td>
          <td>{{ device.sysAddTime }}</td>
          <td>修改/删除/详情</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  import { computed } from "vue";
  
  export default {
    props: {
      data: Array,
      itemsPerPage: Number,
      currentPage: Number,
      tableHeaders: Array, // 传入的表头数组
    },
    setup(props) {
      const displayedData = computed(() => {
        // const startIndex = (props.currentPage - 1) * props.itemsPerPage;
        // const endIndex = startIndex + props.itemsPerPage;
        // return props.data.slice(startIndex, endIndex);
        return props.data;
      });
  
      return {
        displayedData,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 样式化表格头部和内容 */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #333; /* 表头背景颜色 */
    color: white; /* 表头文字颜色 */
  }
  
  th {
    padding: 10px;
  }
  
  tbody tr:nth-child(odd) {
    background-color: #f2f2f2; /* 表格内容背景颜色 */
  }
  
  tbody td {
    padding: 10px;
    border: 1px solid #ddd; /* 表格边框颜色 */
  }
  
  </style>
  