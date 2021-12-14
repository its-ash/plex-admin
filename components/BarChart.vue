<template>
  <chart-bar :data="chartData" :options="chartOption"></chart-bar>
</template>

<script>
export default {
  name: "BarChart",
  data: () => ({
    chartOption: {
      title: {
        display: true,
        text: 'Machine Total Processed Sheets'
      },
      showAllTooltips: true,
      legend: false,
      scales: {
        label: false,
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: true
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    },
    chartData: {
      datasets: [{
        backgroundColor: "#cbf3f0",
        borderWidth: 1,
        label: false,
        barPercentage: 0.5,
        barThickness: 40,
        maxBarThickness: 50,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
      }],
      labels: ['Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11', 'Aug 12',]
    },

  }),

}
</script>

<style scoped>

</style>
