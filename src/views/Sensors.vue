<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <input v-model="sensorName" type="text" placeholder="搜索设备" />
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
  </div>
</template>

<script>
import { ref, onMounted, triggerRef } from "vue";
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
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const sensorName = ref("");
    const totalItems = ref(0);
    const maxPage = ref(1);
    const hasOperations = ref(true);

    const actions = ref({
        edit: true,    // 传递每种操作的配置
        delete: true, // true 表示显示，false 表示隐藏
        details: false,
        annonce: false,
        setoff: false
    });

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchSensorData();
      }
    };

    const nextPage = () => {
      console.log("clicked");
      currentPage.value++;
      fetchSensorData();
    };

    const updateItemsPerPage = (newItemsPerPage) => {
      console.log(newItemsPerPage);
      itemsPerPage.value = newItemsPerPage;
      currentPage.value = 1; // Reset to the first page when changing items per page
      fetchSensorData();
    };

    const goToPageInput = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchSensorData();
    };

    const goToPage = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchSensorData();
    };

    const fetchSensorData = async () => {
      const response = await getSensors(
        sensorName.value,
        currentPage.value,
        itemsPerPage.value
      );
      const sensorData = [];
      totalItems.value = response.total;
      maxPage.value = response.pages;
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
        });
      }

      console.log(tableData.value);
      tableData.value = sensorData;
      triggerRef(tableData);
    };

    onMounted(() => {
      fetchSensorData();
    });

    return {
      tableData,
      totalItems,
      maxPage,
      itemsPerPage,
      currentPage,
      sensorName,
      tableHeaders,
      previousPage,
      nextPage,
      updateItemsPerPage,
      goToPageInput,
      goToPage,
      actions,
      hasOperations
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
