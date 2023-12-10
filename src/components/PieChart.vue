<template>
  <div>
    <div class="echarts-container" ref="echartsContainer" :style="{ height: '200px' }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    chartData: Object, // 饼状图数据
    pieChartTitle: String, // 饼状图标题
  },
  data() {
    return {
      echartsInstance: null,
    };
  },
  watch: {
    chartData: {
      handler(newData) {
        // 数据变化时更新图表
        this.updateChart(newData);
      },
      deep: true,
    },
  },
  mounted() {
    // 初始化图表
    this.initChart();
  },
  methods: {
    initChart() {
      this.echartsInstance = echarts.init(this.$refs.echartsContainer);
      this.updateChart(this.chartData);
    },
    updateChart(data) {
      this.echartsInstance.setOption({
        title: {
          text: this.pieChartTitle,
          top: 'top',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: data.labels.map((label, index) => ({
              name: label,
              value: data.data[index],
              itemStyle: {
                color: data.backgroundColor[index],
              },
            })),
          },
        ],
      });
    },
  },
};
</script>

<style>
.echarts-container {
  height: 200px;
  width: 200px;
}
</style>
