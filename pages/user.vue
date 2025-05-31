<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <h6 class="col-6 m-0">User table</h6>
              <div class="col-6 m-0">
                <input v-model="search" class="form-control" placeholder="Search here" type="text">
              </div>
            </div>

          </div>
          <div class="card-body px-0 pt-0 pb-2" :key="reloadKey">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Location</th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Last
                    Ping
                  </th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Connect
                  </th>
                </tr>
                </thead>
                <tbody :key="updateKey">
                <tr v-for="user in users" class="machine-list">
                  <!--                  @click="$store.dispatch('showMachineListBox', user)"-->
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                        <p class="text-xs text-secondary mb-0">{{ user.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ user.district }}</p>
                    <p class="text-xs text-secondary mb-0">{{ user.state }}</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm"
                          :class="{'bg-gradient-success': isDeviceLive(user), 'bg-gradient-danger': !isDeviceLive(user)}">
                      {{ user.mobile }}
                    </span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">{{ ping[user.mobile] || "No Data Available" }}</span>
                  </td>
                  <td class="align-middle text-center">
                    <button v-if="vpnStatus[user.mobile]" @click="disconnectPLC(user)"
                            class="btn bg-gradient-danger m-0 p-1 btn-sm small">
                      Disconnect
                    </button>
                    <button v-else @click.capture="connectPLC(user)"
                            class="btn bg-gradient-primary m-0 p-1 btn-sm small">
                      Connect
                    </button>
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
export default {
  name: "user",
  data: () => ({
    search: '',
    reloadKey: 1,
  }),
  computed: {
    users() {
      return this.$store.state.users.filter((user) => {
        return user.name.toLowerCase().includes(this.search.toLowerCase()) || user.mobile.includes(this.search);
      });
    },
    ping() {
      return this.$store.state.ping;
    },
    updateKey() {
      return this.$store.state.updateKey;
    },
    rawPing() {
      return this.$store.state.rawPing;
    },
    vpnStatus() {
      return this.$store.state.vpnStatus;
    },
  },
  methods: {
    isDeviceLive(user) {
      if (this.rawPing[user.mobile]) {
        return (new Date(new Date().getTime()) - new Date(this.rawPing[user.mobile])) < 100000;
      }
      return false;
    },
    connectPLC(user) {
      this.$toast.success("Connected").goAway(3000);
      window.connect(user.mobile);
    },
    disconnectPLC(user) {
      this.$toast.success("Disconnected").goAway(3000);
      window.disconnect(user.mobile);
    },
  },
  created() {
    setInterval(() => {
      this.reloadKey += 1;
    }, 3000);
  }
}
</script>

<style scoped>

</style>
