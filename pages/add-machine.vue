<template>
  <div class="row justify-content-center">
    <div v-if="showEditMode" class="col-lg-3 col-md-4 col-11 mt-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          <div class="row">
            <h6 class="col mb-0">{{ selectedUser.name }}'s Machines</h6>
            <div @click="showEditMode=false" class="col-auto ml-auto cursor-pointer">❌</div>
          </div>
        </div>
        <div class="card-body pt-4 p-3" style="max-height: 70vh; overflow-y: auto">
          <form @submit.prevent="assignNewUser">
            <input required pattern="192.168.3.[123][\d]" v-model="ipAddress" class="form-control"
                   placeholder="Add New IP" type="text">
            <input v-model="machineName" class="form-control my-3" placeholder="Machine Name" type="text">
            <select v-model="machineType" required class="form-select mt-3" name="cars" id="cars">
              <option disabled value="Select Machine">Select Machine</option>
              <option v-for="machine in machineTypes" :value="machine"> {{ machine }}</option>
            </select>
            <button type="submit" class="btn bg-gradient-dark w-100 my-4">Add New Ip</button>
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
                <div class="row">
                  <div v-for="machine in userMachine(user)"
                       class="bg-warning p-1 rounded text-dark font-weight-bold col-5 m-1 row position-relative">
                    <span v-if="showEditMode" @click="deleteMachine(machine, user)" class="cross-btn">❌</span>
                    <div class="col-6 bg-secondary rounded text-white">Name</div>
                    <div class="col-6">{{ machine.name }}</div>
                    <div class="col-6 bg-secondary rounded text-white my-2">Type</div>
                    <div class="col-6 my-2">{{ machine.type }}</div>
                    <div class="col-6 bg-secondary rounded text-white">Ip</div>
                    <div class="col-6">{{ machine.ip }}</div>
                  </div>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a @click="editMode(user)" class="btn btn-link text-dark px-3 mb-0" href="#">
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
    showEditMode: false,
    ipAddress: '',
    selectedUser: '',
    search: '',
    machineName: '',
    machineType: '',
  }),
  methods: {
    userMachine(user) {
      return this.$store.state.machines.find(x => x.mobile === user.mobile)?.machines ?? [];
    },
    editMode(user) {
      this.showEditMode = true;
      this.selectedUser = user;
      this.ipAddress = "";
      this.machineName = "";
      this.machineType = "";
    },
    deleteMachine(machine, user) {
      const currentUser = JSON.parse(JSON.stringify(this.$store.state.machines.find(x => x.mobile === user.mobile)));
      currentUser.machines = currentUser.machines.filter(x => x.ip !== machine.ip);
      this.updateDB(currentUser);
    },
    assignNewUser(user) {
      const emptyData = {
        machines: [],
        mobile: this.selectedUser.mobile
      }
      const currentUser = JSON.parse(JSON.stringify(this.$store.state.machines.find(x => x.mobile === this.selectedUser.mobile) ?? emptyData));
      currentUser.machines = [...currentUser.machines,
        {
          ip: this.ipAddress,
          type: this.machineType,
          name: this.machineName,
        }];
      this.updateDB(currentUser);
    },
    updateDB(payload) {
      this.$fire.firestore
        .collection('Machines')
        .doc(this.selectedUser.mobile)
        .set(payload).then(() => {
        this.$toast.success('Machine Updated successfully').goAway(2000);
        this.$store.dispatch('updateMachineList');
      })

    }
  },
  computed: {
    users() {
      return this.$store.state.users.filter((user) => {
        return user.name.toLowerCase().includes(this.search.toLowerCase()) || user.mobile.includes(this.search);
      });
    },
    machineTypes() {
      return this.$store.state.machineTypes;
    }
  },
}
</script>

<style scoped>
input:invalid {
  background-color: #fabbaf;
}

.cross-btn {
  position: absolute;
  top: 0;
  right: 10px;
  width: 10px;
  cursor: pointer;
}
</style>
