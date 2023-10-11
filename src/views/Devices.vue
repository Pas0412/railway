<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <input v-model="deviceName" type="text" placeholder="搜索设备" />
    <TableComponent
      :data="tableData"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :tableHeaders="tableHeaders"
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
import { getDevices } from "@/services/devices";
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
      "设备类型",
      "电池电量",
      "设备信号",
      "传感器状态",
      "状态",
      "创建时间",
      "操作",
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const deviceName = ref("");
    const totalItems = ref(0);
    const maxPage = ref(1);

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchDeviceData();
      }
    };

    const nextPage = () => {
      console.log("clicked");
      currentPage.value++;
      fetchDeviceData();
    };

    const updateItemsPerPage = (newItemsPerPage) => {
      console.log(newItemsPerPage);
      itemsPerPage.value = newItemsPerPage;
      currentPage.value = 1; // Reset to the first page when changing items per page
      fetchDeviceData();
    };

    const goToPageInput = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchDeviceData();
    };

    const goToPage = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchDeviceData();
    };

    const fetchDeviceData = async () => {
      const response = await getDevices(
        deviceName.value,
        currentPage.value,
        itemsPerPage.value
      );
      const deviceData = [];
      totalItems.value = response.total;
      maxPage.value = response.pages;
      console.log(currentPage.value);
      response.records.forEach((item) => {
        deviceData.push({
          deviceId: item.deviceId,
          deviceCode: item.deviceCode,
          deviceName: item.deviceName,
          deviceType: item.deviceType,
          batteryLevel: item.batteryLevel,
          deviceSignal: item.deviceSignal,
          sensorAbnormalCondition: item.sensorAbnormalCondition,
          deviceState: item.deviceState,
          sysAddTime: item.sysAddTime,
          operation: "修改/删除/详情"
        });
      });

      // 填充数据以确保至少有 itemsPerPage.value 行
      while (deviceData.length < itemsPerPage.value) {
        deviceData.push({ 
          deviceId: ' ',
          deviceCode: ' ',
          deviceName: ' ',
          deviceType: ' ',
          batteryLevel: ' ',
          deviceSignal: ' ',
          sensorAbnormalCondition: ' ',
          deviceState: ' ',
          sysAddTime: ' ',
          operation: ' '
         });
      }

      tableData.value = deviceData;
    };

    onMounted(() => {
      fetchDeviceData();
    });

    return {
      tableData,
      totalItems,
      maxPage,
      itemsPerPage,
      currentPage,
      deviceName,
      tableHeaders,
      previousPage,
      nextPage,
      updateItemsPerPage,
      goToPageInput,
      goToPage
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
