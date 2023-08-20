<template>
  <h1>Hello</h1>
</template>

<script>
export default {
  name: "MachineDataChart",
  mounted() {
    const start = "2022-12-25T01:00:00";
    const end = "2022-12-25T02:00:00";
    this.$axios.get(`/machine-data/?TimeStamp=&start_date=${start}&end_date=${end}`)
      .then((data) => {
        console.log(data)
      })
  }
}
</script>

<style scoped>

</style>
