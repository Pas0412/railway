<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <div class="table-header-operations">
      <div class="left-part">
        <input v-model="deviceId" type="text" placeholder="选择设备" />
        <input
          v-model="sensorTypeId"
          type="text"
          placeholder="选择传感器类型"
        />
        <input v-model="sensorId" type="text" placeholder="选择传感器"/>
        <select v-model="selectedItem" class="custom-select">
          <option value="">选择预测方法</option>
          <option v-for="item in methods" :key="item" :value="item.methodId">
            {{ item.methodName }}
          </option>
        </select>
      </div>
      <div class="right-part">
        <input v-model="startTime" type="text" placeholder="开始日期" /> 至
        <input v-model="endTime" type="text" placeholder="结束日期" />
        <button @click="fetchMonitoringData">刷新</button>
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
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { monitoringData, getMethods } from "@/services/data";
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
    const selectedItem = ref("");

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
      console.log(newItemsPerPage);
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
    });

    const getForeCast = async () => {
      const response = await getMethods(
        sensorTypeId.value
      );
      methods.value = response
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
      updateItemsPerPage,
      goToPageInput,
      goToPage,
      hasOperations,
      actions,
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

.custom-select {
  /* 自定义样式 */
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: grey;
}
</style>
