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
      "SN编码",
      "名称",
      "公式",
      "量程单位",
      "设置温度",
      "状态",
      "创建时间",
      "操作",
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const sensorName = ref("");

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      currentPage.value++;
    };

    const fetchsensorData = async () => {
      const response = await getSensors(
        sensorName.value,
        currentPage.value,
        itemsPerPage.value
      );
      const sensorData = [];
      response.records.forEach((item) => {
        sensorData.push({
          sensorId: item.sensorId,
          sensorCode: item.sensorCode,
          sensorName: item.sensorName,
          formula: item.formula,
          rangeUnit: item.rangeUnit,
          setTemperature: item.setTemperature,
          sensorState: item.sensorState,
          sysAddTime: item.sysAddTime,
          operation: "修改/删除/详情",
        });
      });

      // 填充数据以确保至少有 itemsPerPage.value 行
      while (sensorData.length < itemsPerPage.value) {
        sensorData.push({
          sensorId: " ",
          sensorCode: " ",
          sensorName: " ",
          formula: " ",
          rangeUnit: " ",
          setTemperature: " ",
          sensorState: " ",
          sysAddTime: " ",
          operation: " ",
        });
      }

      tableData.value = sensorData;
    };

    onMounted(() => {
      fetchsensorData();
    });

    return {
      tableData,
      itemsPerPage,
      currentPage,
      sensorName,
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
