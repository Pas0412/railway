<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in displayedData" :key="'device_' + device.deviceId">
          <td v-for="(item, index) in device" :key="'item_' + index">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
      return props.data;
    });

    return {
      displayedData,
    };
  },
};
</script>

<style scoped>
.table-container {
    display: flex;
    width: 100%;
}

/* 样式化表格头部和内容 */
table {
  margin: 0 10px;
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: lightgray; /* 表头背景颜色 */
  color: white; /* 表头文字颜色 */
}

th {
  padding: 10px;
}

tbody tr {
  background-color: #f2f2f2; /* 表格内容背景颜色 */
}

tbody td {
  height: 50px;
  border: 1px solid white; /* 表格边框颜色 */
}
</style>
