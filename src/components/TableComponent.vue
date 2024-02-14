<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">
            {{ header }}
          </th>
          <th v-if="actions.edit || actions.delete || actions.details || actions.annonce || actions.setoff">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in displayedData" :key="'device_' + device.deviceId">
          <td :class="{ 'red-text': item === '三级' || item === '未解除', 'yellow-text': item === '一级', 'orange-text': item === '二级', 'green-text': item === '已解除'}" v-for="(item, index) in device" :key="'item_' + index">{{ item }}</td>
          <td v-if="showOperations(device)">
            <span v-if="actions.edit" @click="editDevice(device)" class="action-link">修改 / </span>
            <span v-if="actions.delete" @click="() => $emit('onDelete', device)" class="action-link">删除</span>
            <span v-if="actions.details" @click="() => $emit('showDetails', device)" class="action-link"> / 详情</span>
            <span v-if="actions.annonce" @click="annonce(device)" class="action-link">通知 / </span>
            <span v-if="actions.setoff" @click="() => $emit('setOff', device)" class="action-link">解除</span>
          </td>
          <td v-if="isEmptyRow(device)"><span></span></td>
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
    actions: Object,
    hasOperations: Boolean
  },
  setup(props) {
    const displayedData = computed(() => {
      return props.data;
    });

    const editDevice = (device) => {
      // 在这里执行编辑操作
      console.log("Edit Device:", device);
    };

    const deleteDevice = (device) => {
      // 在这里执行删除操作
      console.log("Delete Device:", device);
    };

    const annonce = (device) => {
      // 在这里执行删除操作
      console.log("Delete Device:", device);
    };

    const isEmptyRow = (device) => {
      if (device.deviceId == " " || device.WarmId == ' ' || device.sensorId == " "){
        return true;
      }
      return false; // 在这里根据你的数据结构判断是否为空行
    };

    const showOperations = (device) => {
      if (device.deviceId != " " && device.WarmId != ' ' && device.sensorId != " " && props.hasOperations){
        return true;
      }
      return false;
    }

    return {
      displayedData,
      editDevice,
      deleteDevice,
      annonce,
      isEmptyRow,
      showOperations
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

.action-link {
  cursor: pointer;
  margin: 0 5px;
}

.yellow-text {
  color: yellow; /* 设置黄色字体 */
}

.orange-text {
  color: orange; /* 设置黄色字体 */
}

.red-text {
  color: red; /* 设置黄色字体 */
}

.green-text {
  color: green; /* 设置黄色字体 */
}
</style>
