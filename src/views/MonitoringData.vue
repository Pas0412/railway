<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <input v-model="searchTerm" type="text" placeholder="搜索设备" />
    <TableComponent
      :data="tableData"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :tableHeaders="tableHeaders"
    />
    <Pagination
      :currentPage="currentPage"
      @previousPage="previousPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { monitoringData } from "@/services/data";
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

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      currentPage.value++;
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
      response.records.forEach((item) => {
        mData.push({
          Id: item.Id,
          frequencyConstant: item.frequencyConstant,
          totalValue: item.totalValue,
          addValue: item.addValue,
          forecastValue: item.forecastValue,
          setTemperature: item.setTemperature,
          sensorState: item.sensorState,
          scollectTime: item.collectTime,
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
          scollectTime: " ",
        });
      }

      tableData.value = mData;
    };

    onMounted(() => {
      fetchMonitoringData();
    });

    return {
      tableData,
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
</style>
