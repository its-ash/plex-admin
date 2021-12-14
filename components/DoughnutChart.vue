<template>
  <chart-doughnut :data="chartData" :options="chartOption"></chart-doughnut>
</template>

<script>
export default {
  props: ["title"],
  name: "DoughnutChart",
  data: () => ({
    chartData: {
      datasets: [{
        data: [8, 2],
        backgroundColor: [
          '#36eb9d',
          '#ff6384'
        ]
      }],
      labels: ['4 Online', '10 Offline']
    },
  }),
  computed: {
    chartOption() {
      return {
        title: {
          display: true,
          text: this.title
        },
      }
    },
  }
}
</script>

<style scoped>

</style>
