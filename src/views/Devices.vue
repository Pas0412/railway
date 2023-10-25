<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <div class="table-header-operations">
      <div class="left-part">
        <input v-model="deviceName" type="text" placeholder="请输入设备关键字" />
        <button @click="fetchDeviceData">搜索</button>
        <button @click="fetchDeviceData">刷新</button>
      </div>
      <div class="right-part">
        <button>新增</button>
      </div>
    </div>
    <DeviceDetail :showModal="showModal" @update:showModal="showModal = $event" :data="deviceDetailData"/>
    <TableComponent
      :data="tableData"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :tableHeaders="tableHeaders"
      :actions="actions"
      :hasOperations="hasOperations"
      @showDetails="showDetails"
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
import DeviceDetail from "@/components/DeviceDetail.vue";

export default {
  // 在此添加组件逻辑
  components: {
    TableComponent,
    Pagination,
    DeviceDetail
  },
  setup() {
    const tableData = ref([]);

    const showModal = ref(false);

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
    ]);

    const actions = ref({
        edit: true,    // 传递每种操作的配置
        delete: true, // true 表示显示，false 表示隐藏
        details: true,
        annonce: false,
        setoff: false
    });

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const deviceName = ref("");
    const totalItems = ref(0);
    const maxPage = ref(1);
    const hasOperations = ref(true);
    const deviceDetailData = ref(null);

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
         });
      }

      tableData.value = deviceData;
    };

    const fetchDeviceDetail = async (name) => {
      const response = await getDevices(
        name,
        1,
        1
      );
      console.log(response.records[0]);
      return response.records[0]
    }
    
    const showDetails = async (device) => {
      deviceDetailData.value = await fetchDeviceDetail(device.deviceName)
      openModal();
    }

    const openModal = () => {
      showModal.value = true;
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
      goToPage,
      actions,
      hasOperations,
      showModal,
      openModal,
      showDetails,
      deviceDetailData,
      fetchDeviceDetail
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

.left-part button {
  height: 35px;
  margin-left: 10px;
  width: 100px;
  color: black;
}

.left-part button:first-of-type {
  background-color: lightblue;
}

.left-part button:last-child {
  background-color: lightgreen;
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
</style>
