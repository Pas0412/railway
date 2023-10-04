<template>
  <div class="dashboard">
    <!-- 在此添加仪表盘内容 -->
    <div class="top-dashboard">
      <div class="squares">
        <Square
          name="设备总数"
          :number="squareData?.deviceNum"
          backgroundColor="lightblue"
        ></Square>
        <Square
          name="传感器总数"
          :number="squareData?.sensorNum"
          backgroundColor="lightsalmon"
        ></Square>
        <Square
          name="设备在线总数"
          :number="squareData?.deviceOnlineNum"
          backgroundColor="lightgreen"
        ></Square>
        <Square
          name="报警总数"
          :number="squareData?.warmEventeNum"
          backgroundColor="pink"
        ></Square>
      </div>
      <div class="chart-container">
        <ChartContainer
          v-if="isUpdated"
          :barChartData="barChartData"
          :barChartTitle="barChartTitle"
          :pieChartData="pieChartData"
          :pieChartTitle="pieChartTitle"
        ></ChartContainer>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "@/components/Square.vue";
import { fetchDashBoardSquare } from "@/services/dashboard";
import ChartContainer from "@/components/ChartContainer.vue";
export default {
  components: {
    Square,
    ChartContainer,
  },
  data() {
    return {
      squareData: null,
      isUpdated: false,
      barChartData: null,
      barChartTitle: "预警情况",
      pieChartData: null,
      pieChartTitle: "在线情况",
    };
  },
  created() {
    // 在组件创建时调用请求函数来获取数据
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetchDashBoardSquare()
        .then((data) => {
          // 请求成功，处理返回的数据
          this.squareData = data;
          this.barChartData = {
            labels: [
              this.squareData.warmSituation[0].warm_level,
              this.squareData.warmSituation[2].warm_level,
              this.squareData.warmSituation[1].warm_level,
            ],
            label: "柱状图数据",
            data: [
              this.squareData?.warmSituation[0].count,
              this.squareData?.warmSituation[2].count,
              this.squareData?.warmSituation[1].count,
            ],
            backgroundColor: [
              "cornflowerblue",
              "cornflowerblue",
              "cornflowerblue",
            ],
          };
          this.pieChartData = {
            labels: [this.squareData?.deviceOnlineSituation[0].device_state],
            data: [this.squareData?.deviceOnlineSituation[0].count],
            backgroundColor: ["lightgreen"],
          },
            (this.isUpdated = true);
        })
        .catch((error) => {
          // 请求失败，处理错误信息
          console.error("获取后端数据失败", error);
        });
    },
  },
};
</script>

<style>
.dashboard {
  margin: 10px;
  width: 100%;
  flex: 1;
  color: black;
  background-color: white;
  padding-top: 1rem;
}

.top-dashboard {
  margin: 10px;
  color: black;
  background-color: white;
  display: flex;
  flex-direction: row;
}

.squares {
  margin-left: 30px;
  height: 210px;
  width: 40%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列 */
  grid-template-rows: repeat(2, 1fr); /* 两行 */
  grid-gap: 16px; /* 网格间隙 */
}

.chart-container {
  background-color: lightgrey;
  margin-left: 50px;
  height: 200px;
  padding-bottom: 10px;
}
</style>
