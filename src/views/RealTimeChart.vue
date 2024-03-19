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
          <option
            v-for="item in sensorTypes"
            :key="item"
            :value="item.sensorTypeId"
          >
            {{ item.sensorType }}
          </option>
        </select>
        <select v-model="sensorId" class="custom-select">
          <option value="">选择传感器</option>
          <option
            v-for="item in sensors"
            :key="item"
            :value="item.sensorNumber"
          >
            {{ item.sensorNumber }}
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
      <DataChart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  getMethods,
  // getChartData,
  getDevices,
  getSensorTypes,
} from "@/services/data";
import DataChart from "@/components/DataChart.vue";
import { getSensors } from "@/services/sensors";
export default {
  components: {
    DataChart,
  },
  // 在此添加组件逻辑
  setup() {
    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const deviceId = ref(1);
    const endTime = ref("");
    const methodId = ref("");
    const sensorId = ref("");
    const sensorTypeId = ref("");
    const startTime = ref("");
    const methods = ref([]);
    let chartData = ref(null);
    const devices = ref([]);
    const sensorTypes = ref([]);
    const sensors = ref([]);
    const sensorType = ref("");
    const sensorNumber = ref(0);

    const getForeCast = async () => {
      const response = await getMethods(sensorTypeId.value);
      methods.value = response;
    };

    const getChart = async () => {
      if (chartData.value) {
        chartData.value = null;
      }
      console.log(
        deviceId.value,
        methodId.value,
        sensorNumber.value,
        sensorTypeId.value
      );
      // const response = await getChartData(
      //   deviceId.value,
      //   methodId.value,
      //   sensorNumber.value,
      //   sensorTypeId.value
      // );
      const labels = [
        0, 2, 7, 10, 14, 16, 18, 23, 27, 32, 36, 39, 41, 43, 45, 47, 49, 51, 54,
        58, 62, 65, 67, 69, 71, 73, 75, 79, 81, 83, 87, 89, 92, 94, 96, 98, 100,
        102, 104, 106, 109, 111, 113, 116, 118, 121, 124, 127, 129, 131, 136,
        139, 142, 147, 154, 158, 164, 167, 193, 196, 201, 208, 211, 216, 218,
        225, 229, 233, 237, 240, 243, 245, 248, 251, 254, 257, 261, 268, 271,
        274, 289, 308, 312, 321, 324, 337, 342, 355, 366, 375, 386, 397, 407,
        418, 426, 436, 446, 456, 467, 479, 486, 534, 545, 546, 574, 585, 595,
        607,
      ];
      const totalData = [
        0, 2.7, 4.1, 4.8, 4.9, 5.5, 6.2, 6.8, 7.3, 7.8, 9.1, 9.4, 9.6, 9.8, 10,
        10.6, 11.8, 13, 15.4, 17.7, 19.1, 20, 20.1, 20.6, 20.9, 21.6, 22.3,
        23.8, 25.4, 26, 27.4, 27.725, 28.225, 28.525, 29.125, 29.525, 30.225,
        31.425, 32.225, 32.725, 33.325, 33.925, 34.425, 34.625, 35.525, 35.325,
        36.125, 37.025, 37.825, 37.625, 37.525, 38.625, 38.425, 39.625, 39.725,
        40.525, 41.425, 42.625, 43.225, 43.525, 44.025, 44.325, 44.725, 45.025,
        45.325, 45.6, 45, 44.4, 44.1, 44.4, 43.7, 45.5, 45.7, 45.9, 45.6, 46,
        46.1, 46.9, 46.4, 46.6, 46, 46.5, 47.1, 48.21, 49.03, 48.63, 48.36,
        48.14, 47.825, 47.54, 47.465, 47.58, 48.08, 47.815, 47.445, 48.85,
        48.375, 48.075, 48.575, 48.875, 49.475, 50.275, 50.475, 50.875, 51.175,
        51.375, 51.775, 51.975,
      ];
      const forecastData = [
        23.56081523, 23.64279997, 23.84896102, 23.97348411, 24.14048499,
        24.22440307, 24.3086007, 24.52032338, 24.69097225, 24.90588295,
        25.07909959, 25.20976797, 25.2972418, 25.38500591, 25.47306116,
        25.56140844, 25.65004862, 25.73898256, 25.87293623, 26.05257756,
        26.23340986, 26.36981995, 26.4611359, 26.55275361, 26.64467397,
        26.73689788, 26.82942625, 27.01539995, 27.1088471, 27.20260233,
        27.39104066, 27.48572559, 27.62833776, 27.72380373, 27.81958374,
        27.9156787, 28.01208954, 28.10881719, 28.20586257, 28.30322662,
        28.44987224, 28.54803704, 28.64652378, 28.7948596, 28.89415531,
        29.043709, 29.19399768, 29.34502455, 29.44612083, 29.54754758,
        29.80256654, 29.95657845, 30.11134473, 30.37097379, 30.73801904,
        30.94964065, 31.26965959, 31.4308402, 32.86099169, 33.0299043,
        33.31324489, 33.71376964, 33.886807, 34.17706065, 34.29381546,
        34.7054164, 34.94269605, 35.18149824, 35.42183138, 35.60309099,
        35.78522006, 35.90712425, 36.09071038, 36.27517553, 36.4605233,
        36.64675729, 36.8964541, 37.33725591, 37.52767354, 37.71899799,
        38.68935093, 39.95186191, 40.22249029, 40.83764171, 41.04462486,
        41.95284002, 42.30708226, 43.24109811, 44.04625195, 44.71526924,
        45.5456547, 46.390188, 47.1703871, 48.04246985, 48.68594243,
        49.50134207, 50.32916709, 51.16956541, 52.10870269, 53.15100428,
        53.76768438, 58.17285708, 59.22683276, 59.32348862, 62.08749051,
        63.20422358, 64.23480238, 65.49102849,
      ];
      // response.forEach((item) => {
      //   // console.log(item);
      //   for(var k in item) {
      //     // console.log(item[k]);
      //     item[k].forEach((i) => {
      //       labels.push(i.collectTime);
      //       totalData.push(i.totalValue);
      //       forecastData.push(i.forecastValue);
      //     });
      //   }
      // });
      // console.log(totalData);
      chartData.value = {
        labels: labels,
        datasets: [
          {
            label: "累计物理量",
            data: totalData,
            fill: false,
            borderColor: "blue",
            tension: 0.1,
          },
          {
            label: "预测",
            data: forecastData,
            fill: false,
            borderColor: "red",
            tension: 0.1,
          },
        ],
      };
    };

    onMounted(() => {
      getForeCast();
      getChart();
      fetchDevices();
      fetchSensorTypes();
      fetchSensors();
    });

    const refresh = () => {
      getChart();
    };

    const fetchDevices = async () => {
      const response = await getDevices();
      devices.value = response;
      console.log(response);
    };

    const fetchSensorTypes = async () => {
      const response = await getSensorTypes();
      sensorTypes.value = response;
      console.log(response);
    };

    const fetchSensors = async () => {
      const response = await getSensors(
        sensorType.value,
        currentPage.value,
        itemsPerPage.value
      );
      sensors.value = response.records;
    };

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
      devices,
      currentPage,
      itemsPerPage,
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
