<template>
    <div class="chart-component-container">
      <div class="bar-chart">
        <BarChart :chartData="barChartData" :barChartTitle="barChartTitle"/>
      </div>
      <div class="pie-chart">
        <PieChart :chartData="pieChartData" :pieChartTitle="pieChartTitle"/>
      </div>
    </div>
  </template>
  
  <script>
  import BarChart from '@/components/BarChart.vue';
  import PieChart from '@/components/PieChart.vue';
  
  export default {
    components: {
      BarChart,
      PieChart,
    },
    props: {
      barChartData: Object, // 柱状图数据
      barChartTitle: String, // 柱状图标题
      pieChartData: Object, // 饼状图数据
      pieChartTitle: String, // 饼状图标题
    },
  };
  </script>
  
  <style scoped>
  .chart-component-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .bar-chart,
  .pie-chart {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  </style>
  