<template>
  <div>
    <canvas class="pie-canvas" ref="pieChartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  Chart,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  PieController,
} from "chart.js";
Chart.register(
  PieController,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

export default {
  props: {
    chartData: Object, // 饼状图数据
    pieChartTitle: String, // 饼状图标题
  },
  setup(props) {
    const pieChartCanvas = ref(null);
    // eslint-disable-next-line no-unused-vars
    let pieChart = null;

    onMounted(() => {
      if (pieChartCanvas.value) {
        pieChart = new Chart(pieChartCanvas.value, {
          type: "pie",
          data: {
            labels: props.chartData.labels,
            datasets: [
              {
                data: props.chartData.data,
                backgroundColor: props.chartData.backgroundColor,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
              title: {
                display: true,
                position: "top",
                text: props.pieChartTitle,
              },
            },
          },
        });
      }
    });

    return {
      pieChartCanvas,
    };
  },
};
</script>
<style>
.pie-canvas {
    height: 200px;
}
</style>
