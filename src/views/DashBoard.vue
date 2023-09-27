<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <!-- 在此添加仪表盘内容 -->
    <div class="squares">
      <Square name="设备总数" :number="squareData?.deviceNum" backgroundColor="lightblue"></Square>
      <Square name="传感器总数" :number="squareData?.sensorNum" backgroundColor="lightsalmon"></Square>
      <Square name="设备在线总数" :number="squareData?.deviceOnlineNum" backgroundColor="lightgreen"></Square>
      <Square name="报警总数" :number="squareData?.warmEventeNum" backgroundColor="pink"></Square>
    </div>
    <div class="chart-container">
        
    </div>
  </div>
</template>

<script>
import Square from "@/components/Square.vue";
import { fetchDashBoardSquare } from '@/services/dashboard';
export default {
  components: {
    Square,
  },
  data() {
    return {
      squareData: null,
    };
  },
  created() {
    // 在组件创建时调用请求函数来获取数据
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetchDashBoardSquare()
        .then(data => {
          // 请求成功，处理返回的数据
          this.squareData = data;
          console.log(this.squareData);
        })
        .catch(error => {
          // 请求失败，处理错误信息
          console.error('获取后端数据失败', error);
        });
    },
  },
};
</script>

<style>
.dashboard {
  margin: 10px;
  width: 100%;
  color: black;
  background-color: white;
}

.squares {
  margin-left: 30px;
  height: 200px;
  width: 40%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列 */
  grid-template-rows: repeat(2, 1fr); /* 两行 */
  grid-gap: 16px; /* 网格间隙 */
}
</style>
