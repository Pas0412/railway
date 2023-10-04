<template>
    <div>
      <canvas class="bar-canvas" ref="barChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart, Title, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
  Chart.register(BarController, Title, CategoryScale, LinearScale, BarElement);
  export default {
    props: {
      chartData: Object, // 柱状图数据
      barChartTitle: String,
    },
    setup(props) {
      const barChartCanvas = ref(null);
      // eslint-disable-next-line no-unused-vars
      let barChart = null;
  
      onMounted(() => {
        if (barChartCanvas.value) {
          barChart = new Chart(barChartCanvas.value, {
            type: 'bar',
            data: {
              labels: props.chartData.labels,
              datasets: [
                {
                  label: props.chartData.label,
                  data: props.chartData.data,
                  backgroundColor: props.chartData.backgroundColor,
                },
              ],
            },
            options: {
              scales: {
                x: {
                  type: 'category', // 设置 X 轴为 category 刻度
                  title: {
                    display: false,
                    text: 'X轴标题',
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: false,
                    text: 'Y轴标题',
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: props.barChartTitle,
                },
              },
            },
          });
        }
      });
  
      return {
        barChartCanvas,
      };
    },
  };
  </script>
  <style>
  .bar-canvas {
    width: 200px;
    height: 300px;
  }
  </style>
  