<template>
  <div class="dashboard">
    <!-- 在此添加仪表盘内容 -->
    <div class="top-dashboard">
      <div class="squares">
        <router-link to="/devices" class="router-link">
          <Square
            name="设备总数"
            :number="squareData?.deviceNum"
            backgroundColor="lightblue"
          ></Square>
        </router-link>
        <router-link to="/sensors" class="router-link">
          <Square
            name="传感器总数"
            :number="squareData?.sensorNum"
            backgroundColor="lightsalmon"
          ></Square>
        </router-link>
        <Square
          name="设备在线总数"
          :number="squareData?.deviceOnlineNum"
          backgroundColor="lightgreen"
        ></Square>
        <router-link to="/warnings" class="router-link">
          <Square
            name="报警总数"
            :number="squareData?.warmEventeNum"
            backgroundColor="pink"
          ></Square>
        </router-link>
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
    <div class="map-container">
      <AmapMap :center="this.center" :zoom=15 />
      <div class="project-container">
        <div class="project-title">工程简介</div>
        <div class="project-description">{{ this.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "@/components/Square.vue";
import { fetchDashBoardSquare } from "@/services/dashboard";
import ChartContainer from "@/components/ChartContainer.vue";
import AmapMap from '@/components/AmapMap.vue';
export default {
  components: {
    Square,
    ChartContainer,
    AmapMap
  },
  data() {
    return {
      squareData: null,
      isUpdated: false,
      barChartData: null,
      barChartTitle: "预警情况",
      pieChartData: null,
      pieChartTitle: "在线情况",
      center: [103.4103, 24.3355],
      description: "金温铁路线路自东孝站引出后，沿金温货线增建二线至金华南站。金温铁路新双线自金华南站引出，在武义县城偏东北距武义站约8千米的汤村设武义北站;出站后，线路跨过武义县深塘工业区，在千金山森林公园(省级)南侧边缘通过。随后穿过永康市规划区，跨越永康江、武二线及永康市五金大道，在永康市金大道以东设永康南站。出站后，线路向南拐，过蝙蝠岭，经新店镇东侧，跨金丽温高速公路和小溪，穿越茶叶山，再跨金丽温高速公路和新建溪，在缙云县城西七里乡设缙云西站。"
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
              this.squareData.warmSituation[1].warm_level,
              // this.squareData.warmSituation[2].warm_level,
              '三级'
            ],
            data: [
            {
              name: this.squareData.warmSituation[0].warm_level,
              value: this.squareData?.warmSituation[0].count,
              // 设置单个柱子的样式
              itemStyle: {
                color: 'yellow',
              }},
              {
                name: this.squareData.warmSituation[1].warm_level,
              value: this.squareData?.warmSituation[1].count,
              // 设置单个柱子的样式
              itemStyle: {
                color: 'orange',
              }},
              {
                name: '三级',
              value: 0,
              // 设置单个柱子的样式
              itemStyle: {
                color: 'red',
              }},
            ],
            backgroundColor: [
              "yellow",
              "orange",
              "red",
            ],
          };
          this.pieChartData = {
            labels: [this.squareData?.deviceOnlineSituation[0].device_state, "不在线"],
            data: [this.squareData?.deviceOnlineSituation[0].count, 10],
            backgroundColor: ["lightgreen", "lightgrey"],
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

<style scoped>
.dashboard {
  margin: 10px;
  width: 100%;
  flex: 1;
  color: black;
  background-color: white;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}

.top-dashboard {
  margin: 10px;
  color: black;
  background-color: white;
  display: flex;
  flex-direction: row;
}

.router-link {
  height: 100%;
  text-decoration: none;
}

.squares {
  margin-left: 30px;
  height: 210px;
  /* width: 40%; */
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列 */
  grid-template-rows: repeat(2, 1fr); /* 两行 */
  grid-gap: 16px; /* 网格间隙 */
}

.chart-container {
  background-color: rgb(244, 243, 243);
  margin-left: 50px;
  height: 200px;
  padding-bottom: 10px;
}

.map-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 30px;
}

.project-container {
  width: 30%;
  right: 0;
  background-color: rgb(244, 243, 243);
  padding: 10px 20px;
}

.project-title {
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
}

.project-description {
  display: flex;
  justify-content: flex-start;
  text-align: start;
  flex: 1;
}
</style>
