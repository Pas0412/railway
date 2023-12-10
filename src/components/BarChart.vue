<template>
  <div>
    <div ref="echarts" class="echarts-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    chartData: Object, // 柱状图数据
    barChartTitle: String,
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.echarts);
      const option = {
        title: {
          text: this.barChartTitle,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: this.chartData.labels,
          bottom: 20,
          show: true
        },
        xAxis: {
          type: 'category',
          // data: this.chartData.labels,
          data: " "
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: this.chartData.labels[0],
            type: 'bar',
            data: [this.chartData.data[0]],
            itemStyle: {
              color: this.chartData.backgroundColor[0],
            },
          },
          {
            name: this.chartData.labels[1],
            type: 'bar',
            data: [this.chartData.data[1]],
            itemStyle: {
              color: this.chartData.backgroundColor[1],
            },
          },
          {
            name: this.chartData.labels[2],
            type: 'bar',
            data: [this.chartData.data[2]],
            itemStyle: {
              color: this.chartData.backgroundColor[2],
            },
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style>
.echarts-chart {
  width: 250px;
  height: 200px;
}
</style>
