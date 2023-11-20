<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
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
        <input v-model="startTime" type="date" placeholder="开始日期" /> 至
        <input v-model="endTime" type="date" placeholder="结束日期" />
        <button @click="refresh">刷新</button>
      </div>
      <div class="right-part">
        <button>全部解除</button>
        <button>预警录入</button>
        <button>记录导出</button>
      </div>
    </div>
    <TableComponent
      :data="tableData"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :tableHeaders="tableHeaders"
      :actions="actions"
      :hasOperations="hasOperations"
      @setOff="setOff"
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
import { getWarnings, setOffWarning } from "@/services/warnings";
import { getDevices, getSensorTypes } from "@/services/data";
export default {
  // 在此添加组件逻辑
  components: {
    TableComponent,
    Pagination,
  },
  setup() {
    const tableData = ref([]);

    const tableHeaders = ref([
      "序号",
      "预警名称",
      "预警项",
      "预警阈值",
      "预警等级",
      "是否解除",
      "创建时间",
      "备注"
    ]);

    const actions = ref({
        edit: false,    // 传递每种操作的配置
        delete: false, // true 表示显示，false 表示隐藏
        details: false,
        annonce: true,
        setoff: true
    });

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const deviceId = ref("");
    const sensorTypeId = ref("");
    const endTime = ref("");
    const configName = ref("");
    const startTime = ref("");
    const totalItems = ref(0);
    const maxPage = ref(1);
    const hasOperations = ref(true);
    const devices = ref([]);
    const sensorTypes = ref([]);

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchWarnings();
      }
    };

    const nextPage = () => {
      console.log("clicked");
      currentPage.value++;
      fetchWarnings();
    };

    const updateItemsPerPage = (newItemsPerPage) => {
      console.log(newItemsPerPage);
      itemsPerPage.value = newItemsPerPage;
      currentPage.value = 1; // Reset to the first page when changing items per page
      fetchWarnings();
    };

    const goToPageInput = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchWarnings();
    };

    const goToPage = (newCurrentPage) => {
      console.log(newCurrentPage);
      currentPage.value = newCurrentPage;
      fetchWarnings();
    };

    const fetchWarnings = async () => {
      const response = await getWarnings(
        configName.value,
        deviceId.value,
        endTime.value,
        currentPage.value,
        itemsPerPage.value,
        startTime.value
      );
      const wData = [];
      totalItems.value = response.total;
      maxPage.value = response.pages;
      response.records.forEach((item) => {
        wData.push({
          WarmId: item.WarmId,
          configName: item.configName,
          configType: item.configType,
          configTerm: item.configTerm,
          warmLevel: item.warmLevel,
          warmState: item.warmState,
          warm_time: item.warm_time,
          note: ' ',
        });
      });

      // 填充数据以确保至少有 itemsPerPage.value 行
      while (wData.length < itemsPerPage.value) {
        wData.push({
          WarmId: ' ',
          configName: ' ',
          configType: ' ',
          configTerm: ' ',
          warmLevel: ' ',
          warmState: ' ',
          warm_time: ' ',
          note: ' ',
        });
      }

      tableData.value = wData;
    };

    const setOff = async (device) => {
      var res = await setOffWarning(device.WarmId);
      console.log(res);
    }

    onMounted(() => {
      fetchWarnings();
      fetchDevices();
      fetchSensorTypes();
    });

    const refresh = () => {
      fetchWarnings();
    }

    const fetchDevices = async () => {
      const response = await getDevices(
      );
      devices.value = response;
      console.log(response);
    }

    const fetchSensorTypes = async () => {
      const response = await getSensorTypes(
      );
      sensorTypes.value = response;
      console.log(response);
    }

    return {
      tableData,
      totalItems,
      maxPage,
      itemsPerPage,
      currentPage,
      deviceId,
      endTime,
      configName,
      startTime,
      tableHeaders,
      previousPage,
      nextPage,
      updateItemsPerPage,
      goToPageInput,
      goToPage,
      actions,
      hasOperations,
      setOff,
      refresh,
      fetchSensorTypes,
      fetchDevices,
      sensorTypes,
      devices,
      sensorTypeId
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

.left-part input {
  width: 100px;
}

.left-part button:first-of-type {
  background-color: lightblue;
}

.right-part {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-part button {
  height: 35px;
  margin-right: 10px;
  width: 120px;
  color: black;
}

.right-part button:first-of-type {
  background-color: lightgreen !important;
}

.right-part button:nth-child(2) {
  background-color: lightcoral;
}

.right-part button:last-child {
  background-color: lightblue;
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
</style>
