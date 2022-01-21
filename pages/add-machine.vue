<template>
  <div class="row justify-content-center">
    <div v-if="showAddIp" class="col-lg-3 col-md-4 col-11 mt-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          <div class="row">
            <div class="col-md-6">
              <h6 class="mb-0">User Name</h6>
            </div>
          </div>
        </div>
        <div class="card-body pt-4 p-3" style="max-height: 70vh; overflow-y: auto">
          <ul class="list-group">
            <li v-for="ip in IPs" :ref="ip"
                class="list-group-item border-0 d-flex justify-content-between mb-2 border-radius-lg">
              <div class="d-flex justify-content-between align-content-between w-100">
                <h6 class="mb-1 text-dark text-sm">{{ ip.ip }} <strong>{{ ip.name }}</strong></h6>
                <button @click="deleteMachine(ip.id)" class="btn btn-danger m-0 p-1 btn-sm small">
                  <small>remove</small>
                </button>
              </div>
            </li>
          </ul>
          <form @submit.prevent="assign">
            <input required pattern="192.168.3.[123][\d]" v-model="ipAddress" class="form-control"
                   placeholder="Add New IP" type="text">
            <select v-model="machineName" required class="form-select mt-3" name="cars" id="cars">
              <option disabled value="Select Machine">Select Machine</option>
              <option v-for="machine in machineList" :value="machine"> {{ machine }}</option>
            </select>
            <button type="submit" class="btn bg-gradient-dark w-75 my-4">Add New Ip</button>
            <button @click="showAddIp=false" class="btn bg-gradient-danger w-15 my-4 ps-3">✖</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col mt-md-0 mt-4 mx-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          <div class="row p-3">
            <div class="col-6">
              <h6 class="mb-0">User Information</h6>
            </div>
            <div class="col-6 m-0">
              <form>
                <input v-model="search" class="form-control" placeholder="Search here" type="text">
              </form>
            </div>
          </div>
        </div>
        <div class="card-body p-3" style="max-height: 70vh; overflow-y: scroll">
          <ul class="list-group">
            <li v-for="user in users"
                class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">{{ user.name }}</h6>
                <div class="d-flex flex-wrap">
                  <span v-for="ip in user.machines"
                        class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">
                    <span class="bg-secondary rounded px-1 text-white">{{ ip.name }}</span>
                    {{ ip.ip }}</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a @click="addIp(user)" class="btn btn-link text-dark px-3 mb-0" href="#">
                  <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-machine",
  data: () => ({
    showAddIp: false,
    ipAddress: '',
    selectedIP: [],
    selectedUser: '',
    search: '',
    IPs: [],
    machineName: 'Select Machine',
  }),
  methods: {
    addIp(user) {
      this.selectedUser = user;
      this.IPs = user.machines;
      this.showAddIp = true;
    },
    deleteMachine(id) {
      this.$axios.delete('/del-machine/' + id,).then(() => {
        this.$toast.success('Machine Deleted Successfully').goAway(3000);
        this.showAddIp = false;
        this.ipAddress = '';
        this.IPs = [];
        this.selectedUser = '';
        this.$store.dispatch('fetchUser');
      });
    },
    assign() {
      this.$axios.post(`/machine/`, {
        name: this.machineName,
        user: this.selectedUser.mobile,
        ip: this.ipAddress,
      }).then(() => {
        this.$toast.success('Machine Added Successfully').goAway(3000);
        this.showAddIp = false;
        this.ipAddress = '';
        this.IPs = [];
        this.selectedUser = '';
        this.$store.dispatch('fetchUser');
      });
    }
  },
  computed: {
    users() {
      return this.$store.state.users.filter((user) => {
        return user.name.toLowerCase().includes(this.search.toLowerCase()) || user.mobile.includes(this.search);
      });
    },
    machineList() {
      return this.$store.state.machines;
    }
  },
}
</script>

<style scoped>
input:invalid {
  background-color: #fabbaf;
}
</style>


<!--<div class="col-lg-3 col-md-4 col-11 mt-4">-->
<!--<div v-if="selectedUser === ''" class="card h-100">-->
<!--  <div class="card-header pb-0 px-3">-->
<!--    <div class="row">-->
<!--      <div class="col-md-6">-->
<!--        <h6 class="mb-0">Users</h6>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="card-body pt-4 p-3" style="max-height: 70vh; overflow-y: scroll">-->
<!--    <ul class="list-group">-->
<!--      <li v-for="user in users"-->
<!--          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">-->
<!--        <div class="d-flex align-items-center">-->
<!--          <button-->
<!--            @click="selectUser(user)"-->
<!--            class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">-->
<!--          </button>-->
<!--          <div class="d-flex flex-column">-->
<!--            <h6 class="mb-1 text-dark text-sm">{{ user }}</h6>-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
<!--</div>-->
<!--<div v-else>-->
<!--  <div class="card">-->
<!--    <div class="card-header pb-0 px-3">-->
<!--      <div class="row">-->
<!--        <div class="col-md-6">-->
<!--          <h6 class="mb-0 text-nowrap">Users :-->
<!--            <span class="bg-info text-white p-1 rounded">{{ selectedUser }}</span></h6>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="card-body pt-4 p-3">-->
<!--      <ul class="list-group">-->
<!--        <li v-for="(ip, index) in selectedIP"-->
<!--            class="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">-->
<!--          <div class="d-flex align-items-center">-->
<!--            <div class="d-flex flex-column">-->
<!--              <h6 class="m-0 text-dark text-sm">{{ index + 1 }}.-->
<!--                <span class="bg-warning p-1 rounded">{{ ip }}</span></h6>-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="d-flex pt-3">-->
<!--    <button @click="assign" class="btn btn-behance w-75 p-2 mx-4">Assign</button>-->
<!--    <button @click="preventAssign" class="btn btn-behance w-75 p-2 mx-4 bg-danger">Cancel</button>-->
<!--  </div>-->
<!--</div>-->
<!--</div>-->
