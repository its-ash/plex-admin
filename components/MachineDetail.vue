<template>
  <div class="display-box">
    <div ref="focusMe" class="row d-flex justify-content-center align-items-center mt-5">
      <div class="col-md-5 col-12 card h-100 mb-4">
        <div class="card-header pb-0 px-3">
          <div class="row">
            <div class="col-md-6">
              <h6 class="mb-0">
                <span class="text-primary">
                {{ machine.name }}
               <strong class="text-secondary"> {{ machine.ip }}</strong>
              </span> Machine's Detail</h6>
            </div>
            <div class="col-md-6 d-flex justify-content-end align-items-center">
              <i class="far fa-calendar-alt me-2"></i>
              <input class="form-control" type="date" id="detailDate" name="date">
            </div>
          </div>
        </div>
        <div class="card-body pt-4 p-3" style="overflow: auto;max-height: 60vh;">
          <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Type</h6>
          <ul class="list-group">
            <li v-for="item in list"
                class="list-group-item border-0 border-bottom-sm mb-2 d-flex justify-content-between p-0 ps-0">
              <div class="d-flex align-items-center">
                <div class="d-flex flex-column">
                  <h6 class="mb-1 text-dark text-sm">{{ item[0] }}</h6>
                </div>
              </div>
              <div class="d-flex align-items-center text-primary font-weight-bold">{{ item[1] }}</div>
            </li>

          </ul>
        </div>
        <button class="btn btn-behance" @click="$store.dispatch('hideMachineDetailBox')">Close</button>
      </div>
      <MachineDataChart></MachineDataChart>
    </div>
  </div>
</template>

<script>
export default {
  name: "MachineDetail",
  data: () => ({}),
  computed: {
    machine() {
      return this.$store.state.currentMachine;
    },
    list() {
      const data = this.$store.state.MQTT_MACHINES[this.$store.state.currentMachineID];
      const dummy = [
        ['Machine Mode', 'Loading..'],
        ['Machine Status', 'Loading..'],
        ["Fault Status", "Loading.."],
        ["Total Production", "Loading.."],
        ["Today Production", "Loading.."],
        ["Total Running Hours", "Loading.."],
        ["Today Running Hours", "Loading.."],
        ["Total Ideal Time", "Loading.."],
        ["Today Idle Time", "Loading.."],
        ["Total Energy Consumption", "Loading.."],
        ["Today Energy Consumption", "Loading.."],
      ];
      console.log(data);
      if (data) {
        let result = [];
        for (const [key, value] of Object.entries(data)) {
          result.push([key, value]);
        }
        return result;
      } else return dummy;
    }
  },
  mounted() {
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        this.$store.dispatch('hideMachineDetailBox');
      }
    });
  }
}
</script>

<style lang="scss">
.display-box {
  position: absolute;
  z-index: 1000000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>
