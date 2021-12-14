<template>
  <chart-line :data="chartData" :options="chartOption"></chart-line>
</template>

<script>
export default {
  name: "LineChart",
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
        data: [8, 2, 23, 21, 3, 23, 2],
        backgroundColor: 'rgba(196,70,160,0.28)',
      }],
      labels: ['Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11', 'Aug 12',]
    },

  }),

}
</script>

<style scoped>

</style>
