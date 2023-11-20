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
          <option v-for="item in sensors" :key="item" :value="item.sensorId">
            {{ item.sensorName }}
          </option>
        </select>
        <select v-model="methodId" class="custom-select">
          <option value="">选择预测方法</option>
          <option v-for="item in methods" :key="item" :value="item.methodId">
            {{ item.methodName }}
          </option>
        </select>
      </div>
      <div class="right-part">
        <button>单次测量值</button>
        <button @click="refresh">刷新</button>
      </div>
    </div>
    <div>
      <DataChart :chartData=chartData />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getMethods, getChartData, getDevices, getSensorTypes, getSensors } from "@/services/data";
import DataChart from "@/components/DataChart.vue";
export default {
  components: {
    DataChart
  },
  // 在此添加组件逻辑
  setup() {
    const deviceId = ref(1);
    const endTime = ref("");
    const methodId = ref("");
    const sensorId = ref("");
    const sensorTypeId = ref("");
    const startTime = ref("");
    const methods = ref([]);
    const chartData = ref(null);
    const devices = ref([]);
    const sensorTypes = ref([]);
    const sensors = ref([]);

    const getForeCast = async () => {
      const response = await getMethods(
        sensorTypeId.value
      );
      methods.value = response;
    }

    const getChart = async () => {
      const response = await getChartData(
        deviceId.value,
        methodId.value,
        sensorId.value,
        sensorTypeId.value
      );
      const labels = [];
      const totalData = [];
      const forecastData = [];
      response.forEach((item) => {
        labels.push(item.channelName);
        totalData.push(item.totalValue);
        forecastData.push(item.forecastValue);
      });
      chartData.value = {
        labels: labels,
        datasets: [
          {
            label: '累计物理量',
            data: totalData,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
          {
            label: '预测',
            data: forecastData,
            fill: false,
            borderColor: 'red',
            tension: 0.1,
          },
        ],
      };
    }

    onMounted(() => {
      getForeCast();
      getChart();
      fetchDevices();
      fetchSensorTypes();
      fetchSensors();
    })

    const refresh = () => {
      getChart();
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

    const fetchSensors = async () => {
      const response = await getSensors(
        deviceId.value,
        sensorTypeId.value
      );
      sensors.value = response
    }

    return {
      deviceId,
      endTime,
      methodId,
      sensorId,
      sensorTypeId,
      startTime,
      methods,
      getForeCast,
      fetchDevices,
      chartData,
      getChart,
      refresh,
      fetchSensorTypes,
      fetchSensors,
      sensors,
      sensorTypes,
      devices
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
  width: 180px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: grey;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
