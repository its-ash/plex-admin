<template>
  <div class="row justify-content-center mt-5">
    <div v-if="addNewUser" class="col-md-4 col-11">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="apiAddNewUser" class="form text-left">
            <div class="mb-3">
              <label for="name">Full Name</label>
              <input id="name" type="text" v-model="name"
                     class="form-control" placeholder="Name" aria-label="Name"
                     pattern="\w+\s\w+" required>
            </div>
            <div class="mb-3">
              <label for="email">Email</label>
              <input required id="email" v-model="email" type="email" class="form-control" placeholder="Email"
                     aria-label="Email"
                     aria-describedby="email-addon">
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <a class="btn btn-dark dropdown-toggle" href="#" role="button"
                     data-bs-toggle="dropdown" aria-expanded="false">
                    {{ state }}
                  </a>
                  <ul class="dropdown-menu shadow mt-2"
                      aria-labelledby="dropdownMenuLink"
                      style="max-height: 300px !important; overflow-y: scroll">
                    <li v-for="(item, index) in states" :key="item">
                      <a class="dropdown-item" href="#" @click="selectState(item, index)">{{ item }}</a>
                    </li>
                  </ul>
                </div>
                <div class="col-6">
                  <a class="btn btn-dark dropdown-toggle" href="#" role="button"
                     data-bs-toggle="dropdown" aria-expanded="false">
                    {{ city }}
                  </a>
                  <ul class="dropdown-menu shadow mt-2"
                      aria-labelledby="dropdownMenuLink"
                      style="max-height: 300px !important; overflow-y: scroll">
                    <li v-for="(item, index) in cities" :key="item">
                      <a class="dropdown-item" href="#" @click="selectCity(item)">{{ item }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="mobile">Mobile</label>
              <input v-model="mobile" required id="mobile" type="number" class="form-control" placeholder="Mobile"
                     aria-label="Mobile">
            </div>
            <div class="text-center">
              <div class="row">
                <div class="col-6">
                  <button type="submit" class="btn btn-success w-100">{{ addText }}</button>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-danger w-100" @click="addNewUser = false">Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col mx-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          <div class="row p-3">
            <div class="col-6">
              <h6 class="mb-0">Machine Information</h6>
            </div>
          </div>
        </div>
        <div class="card-body p-3" style="max-height: 60vh; overflow-y: scroll">
          <ul class="list-group">
            <li v-for="machine in machines"
                class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-12 d-flex flex-column">
                <h6 class="mb-3 text-sm">{{ machine }}</h6>
              </div>
              <div class="col-12 row">
                <div v-for="part in machineParts[machine]"
                     class="col-auto row bg-warning rounded mx-2 my-1 py-1 align-content-center px-1">
                  <div style="background-color: #ffeaab" class="col-auto rounded font-weight-bold">{{ part }}</div>
                  <div class="col-auto cursor-pointer px-2" @click="deletePart(machine, part)">❌</div>
                </div>
                <div class="col-auto row bg-warning rounded mx-2 align-content-center px-0">
                  <div class="col-auto px-2 py-0">
                    <input v-model="newPartName[machine]" style="background-color: rgba(213,255,208,0.74)" placeholder="Add New Part"
                           class="my-1 px-2 border-0 rounded"/>
                  </div>
                  <div
                    @click="addNewPart(machine)"
                    v-if="newPartName[machine]" class="col-auto cursor-pointer py-1 bg-success rounded text-white">
                    Add New
                  </div>
                </div>
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
  name: "add-user",
  data: () => ({
    addNewUser: false,
    email: '',
    cities: [],
    state: 'Select State',
    city: 'Select City',
    mobile: '',
    search: '',
    addText: 'Add User',
    refreshKey: 0,
    machineParts: {},
    newPartName: {},
  }),
  methods: {
    getAllParts() {
      this.$fire.firestore
        .collection('Parts')
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.$set(this.machineParts, doc.id, doc.data()?.parts ?? {});
        });
      });
    },
    addNewPart(machine) {
      const payload = {
        "parts": [...(this.machineParts[machine] ?? []), this.newPartName[machine]],
        "type": machine,
      };
      this.$fire.firestore
        .collection('Parts')
        .doc(machine)
        .set(payload).then(() => {
        this.$set(this.newPartName, machine, '');
        this.$toast.success('Parts Updated successfully').goAway(2000);
        this.getAllParts();
      })
    },
    deletePart(machine, part) {
      const value = confirm("Are Want to Delete Part " + part + " from " + machine);
      if (value) {
        const payload = {
          "parts": (this.machineParts[machine] ?? []).filter(x => x !== part),
          "type": machine,
        };
        this.$fire.firestore
          .collection('Parts')
          .doc(machine)
          .set(payload).then(() => {
          this.$toast.success('Parts Deleted successfully').goAway(2000);
          this.getAllParts();
        })
      }
    },

  },
  computed: {
    machines() {
      return this.$store.state.machineTypes;
    }
  },
  mounted() {
    this.getAllParts();
    setInterval(() => {
      this.refreshKey += 1;
    }, 2000)
  }
}
</script>

<style scoped>

</style>
