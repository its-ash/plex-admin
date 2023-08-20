<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Machine IPs Table</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">User</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                    Ip
                  </th>
                  <!--                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Last-->
                  <!--                    Ping-->
                  <!--                  </th>-->
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                    Location
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="machine in machineList" class="machine-list"
                    @click="showMachineDetail(machine)">
                  <td>
                    <div class="d-flex px-2">
                      <div class="my-auto">
                        <h6 class="mb-0 text-sm">{{ machine.name }}</h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold mb-0">{{ users[machine.user] && users[machine.user].name }}</p>
                  </td>
                  <td class="text-center">
                    <span class="badge badge-sm bg-gradient-danger">{{ machine.ip }}</span>
                  </td>
                  <!--                  <td class="text-center">-->
                  <!--                    <h5 class="text-sm m-0 text-black-50">-->
                  <!--                      {{ MQTT_MACHINES[machine.ip+machine.user].CTSpeed }}-->
                  <!--                    </h5>-->
                  <!--                  </td>-->
                  <td class="text-center">
                    <h6 class="m-0 text-black-50">
                      {{
                        users[machine.user] && users[machine.user].district
                      }},{{ users[machine.user] && users[machine.user].state }}
                    </h6>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "plc",
  computed: {
    users() {
      let result = {};
      this.$store.state.users.forEach(user => {
        result[user.mobile] = user;
      });
      return result;
    },
    ...mapState({
      MQTT_MACHINES: state => state.MQTT_MACHINES,
      machineList: state => state.allMachines,
    })
  },
  methods: {
    showMachineDetail(machine) {
      this.$store.commit('setCurrentMachine', machine);
      this.$store.commit('setCurrentMachineID', machine['ip'] + machine['user']);
      this.$store.dispatch('showMachineDetailBox');
    },
  },
  mounted() {
    this.$store.dispatch('fetchAllMachine');
  }
}
</script>

<style lang="scss">
.machine-list {
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
}
</style>
