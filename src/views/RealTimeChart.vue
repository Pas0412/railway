<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <div class="table-header-operations">
      <div class="left-part">
        <input v-model="deviceId" type="text" placeholder="选择设备" />
        <input v-model="sensorTypeId" type="text" placeholder="选择传感器类型" />
        <input v-model="sensorId" type="text" placeholder="选择传感器" />
        <select v-model="selectedItem" class="custom-select">
          <option value="">选择预测方法</option>
          <option v-for="item in methods" :key="item" :value="item.methodId">
            {{ item.methodName }}
          </option>
        </select>
      </div>
      <div class="right-part">
        <button>单次测量值</button>
        <button>刷新</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getMethods } from "@/services/data";
export default {
  // 在此添加组件逻辑
  setup() {
    const deviceId = ref("");
    const endTime = ref("");
    const methodID = ref("");
    const sensorId = ref("");
    const sensorTypeId = ref("");
    const startTime = ref("");
    const methods = ref([]);
    const selectedItem = ref("");

    const getForeCast = async () => {
      const response = await getMethods(
        sensorTypeId.value
      );
      methods.value = response
    }

    onMounted(() => {
      getForeCast();
    })

    return {
      deviceId,
      endTime,
      methodID,
      sensorId,
      sensorTypeId,
      startTime,
      methods,
      getForeCast,
      selectedItem
    };
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

.table-header-operations {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.left-part {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-part {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-part button:first-of-type {
  height: 35px;
  margin-right: 10px;
  width: 120px;
  background-color: lightcoral !important;
  color: black;
}

.right-part button:last-child {
  background-color: #007bff;
  height: 35px;
  margin-right: 10px;
  width: 120px;
  color: black;
}

.custom-select {
  /* 自定义样式 */
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: grey;
}
</style>
