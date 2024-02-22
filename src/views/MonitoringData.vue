<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <div class="table-header-operations">
      <div class="left-part">
        <select v-model="deviceId" class="custom-select">
          <option value="">选择设备</option>
          <option v-for="item in devices" :key="item" :value="item.deviceId">
            {{ item.deviceName }}
          </option>
        </select>
        <select v-model="sensorTypeId" class="custom-select">
          <option value="">选择传感器类型</option>
          <option v-for="item in sensorTypes" :key="item" :value="item.sensorTypeId">
            {{ item.sensorType }}
          </option>
        </select>
        <select v-model="sensorId" class="custom-select">
          <option value="">选择传感器</option>
          <option v-for="item in sensors" :key="item" :value="item.sensorNumber">
            {{ item.sensorNumber }}
          </option>
        </select>
        <select v-model="methodID" class="custom-select">
          <option value="">选择预测方法</option>
          <option v-for="item in methods" :key="item" :value="item.methodId">
            {{ item.methodName }}
          </option>
        </select>
      </div>
      <div class="right-part">
        <input v-model="startTime" type="date" placeholder="开始日期" /> 至
        <input v-model="endTime" type="date" placeholder="结束日期" />
        <button @click="refresh">刷新</button>
      </div>
    </div>
    <TableComponent
      :data="tableData"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :tableHeaders="tableHeaders"
      :actions="actions"
      :hasOperations="hasOperations"
    />
    <Pagination
      v-model:currentPage="currentPage"
      v-model:itemsPerPage="itemsPerPage"
      :totalItems="totalItems"
      :maxPage="maxPage"
      @previousPage="previousPage"
      @nextPage="nextPage"
      @itemsPerPage="updateItemsPerPage"
      @goToPageInput="goToPageInput"
      @goToPage="goToPage"
    />
    <button class="download" @click="download">下载</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { monitoringData, getMethods, getDevices, getSensorTypes } from "@/services/data";
import { getSensors } from "@/services/sensors";
export default {
  // 在此添加组件逻辑
  components: {
    TableComponent,
    Pagination,
  },
  setup() {
    const tableData = ref([]);

    const tableHeaders = ref([
      "ID",
      "频率",
      "累计物理量",
      "新增物理量",
      "预测值",
      "温度",
      "状态",
      "采集时间",
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const deviceId = ref("");
    const endTime = ref("");
    const methodID = ref("");
    const sensorId = ref("");
    const sensorTypeId = ref("");
    const startTime = ref("");
    const totalItems = ref(0);
    const maxPage = ref(1);
    const hasOperations = ref(false);
    const methods = ref([]);
    const devices = ref([]);
    const sensorTypes = ref([]);
    const sensorType = ref("");
    const sensors = ref([]);
    const sensorNumber = ref(0);

    const actions = ref({
      edit: false, // 传递每种操作的配置
      delete: false, // true 表示显示，false 表示隐藏
      details: false,
      annonce: false,
      setoff: false,
    });

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchMonitoringData();
      }
    };

    const nextPage = () => {
      console.log("clicked");
      currentPage.value++;
      fetchMonitoringData();
    };

    const updateItemsPerPage = (newItemsPerPage) => {
      // console.log(newItemsPerPage);
      itemsPerPage.value = newItemsPerPage;
      currentPage.value = 1; // Reset to the first page when changing items per page
      fetchMonitoringData();
    };

    const goToPageInput = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchMonitoringData();
    };

    const goToPage = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchMonitoringData();
    };

    const fetchMonitoringData = async () => {
      const response = await monitoringData(
        deviceId.value,
        endTime.value,
        methodID.value,
        currentPage.value,
        itemsPerPage.value,
        sensorId.value,
        sensorTypeId.value,
        startTime.value
      );
      const mData = [];
      totalItems.value = response.total;
      maxPage.value = response.pages;
      console.log(response.records);
      response.records.forEach((item) => {
        mData.push({
          Id: item.Id,
          frequencyConstant: item.frequencyConstant,
          totalValue: item.totalValue,
          addValue: item.addValue,
          forecastValue: item.forecastValue,
          setTemperature: item.setTemperature,
          sensorState: item.sensorState,
          collectTime: item.collectTime,
        });
      });

      // 填充数据以确保至少有 itemsPerPage.value 行
      while (mData.length < itemsPerPage.value) {
        mData.push({
          Id: " ",
          frequencyConstant: " ",
          totalValue: " ",
          addValue: " ",
          forecastValue: " ",
          setTemperature: " ",
          sensorState: " ",
          collectTime: " ",
        });
      }

      tableData.value = mData;
    };

    onMounted(() => {
      fetchMonitoringData();
      getForeCast();
      fetchDevices();
      fetchSensorTypes();
      fetchSensors();
    });

    const getForeCast = async () => {
      const response = await getMethods(
        sensorTypeId.value
      );
      methods.value = response
    }

    const fetchDevices = async () => {
      const response = await getDevices(
      );
      devices.value = response
    }

    const fetchSensorTypes = async () => {
      const response = await getSensorTypes(
      );
      sensorTypes.value = response
      sensorType.value = response.sensorType
    }

    const fetchSensors = async () => {
      const response = await getSensors(
        sensorType.value,
        currentPage.value,
        itemsPerPage.value
      );
      sensors.value = response.records
    }

    const download = async () => {

    }
    
    const refresh = () => {
      fetchMonitoringData();
    }

    return {
      tableData,
      totalItems,
      maxPage,
      itemsPerPage,
      currentPage,
      deviceId,
      endTime,
      methodID,
      sensorId,
      sensorTypeId,
      startTime,
      tableHeaders,
      previousPage,
      nextPage,
      fetchDevices,
      updateItemsPerPage,
      goToPageInput,
      goToPage,
      hasOperations,
      actions,
      methods,
      getForeCast,
      devices,
      sensorTypes,
      download,
      refresh,
      fetchSensorTypes,
      fetchSensors,
      sensors,
      sensorNumber
    };
  },
};
</script>

<style scoped>
.settings {
  margin: 10px;
  width: 100%;
  color: black;
  background-color: white;
}

.right-part button:last-child {
  background-color: #007bff;
  height: 35px;
  margin-right: 10px;
  width: 120px;
  color: black;
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

.right-part input {
  width: 80px;
}

.custom-select {
  /* 自定义样式 */
  width: 180px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: grey;
  margin-left: 10px;
}

.download {
  position: fixed;
  right: 50px;
  bottom: 50px;
  background-color: lightcoral;
  color: black;
}
</style>
