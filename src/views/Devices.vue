<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <h1>Devices</h1>
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

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      currentPage.value++;
    };

    const fetchDeviceData = async () => {
      const response = await getDevices(
        deviceName.value,
        currentPage.value,
        itemsPerPage.value
      );
      const deviceData = [];
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
      itemsPerPage,
      currentPage,
      deviceName,
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
