<template>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const chartInstance = ref(null); // 用于存储Chart.js实例
      const renderChart = () => {
        if (props.chartData == null){
            return null
        }
        const ctx = document.getElementById('myChart').getContext('2d');
        // Chart.register(Chart.controllers.line);
        // 销毁之前的Chart.js实例
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
        
        chartInstance.value = new Chart(ctx, {
          type: 'line',
          data: props.chartData,
          options: {
            scales: {
              x: {
                position: 'bottom',
                title: {
                  display: true,
                  text: 'X轴',
                },
              },
              y: {
                position: 'left',
                title: {
                  display: true,
                  text: 'Y轴',
                },
              },
            },
          },
        });
      };
  
      onMounted(() => {
        renderChart();
      });
  
      watch(() => props.chartData, () => {
        renderChart();
      });
  
      return {
        renderChart,
      };
    },
  };
  </script>
  