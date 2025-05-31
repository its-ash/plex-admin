<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <h6 class="col-6 m-0">Query table</h6>
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
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Time</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" class="machine-list">
                  <td class="">
                    <span class="text-secondary text-xs font-weight-bold">{{ user.mobile }}</span>
                  </td>
                  <td class="">
                    <span class="text-secondary text-xs font-weight-bold">{{ user.name }}</span>
                  </td>
                  <td class="">
                    <span class="text-secondary text-xs font-weight-bold">{{ user.createdAt }}</span>
                  </td>
                  <td class="">
                    <button v-if="user.processed"
                            class="btn bg-gradient-success m-0 p-1 btn-sm small">
                      DONE
                    </button>
                    <button v-else @click="resolveQuery(user.mobile)"
                            class="btn bg-gradient-primary m-0 p-1 btn-sm small">
                      Resolve
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
    users: [],
  }),
  computed: {},
  methods: {
    getData() {
      const data = [];
      this.$fire.firestore
        .collection('NewUser')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
        })
        .then(() => {
          this.users = data;
        })
    },
    resolveQuery(id) {
      this.$fire.firestore
        .collection('NewUser').doc(id).update({
        processed: true,
      }).then(() => {
        this.getData();
      })
    }
  },
  created() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 20000);
  }
}
</script>

<style scoped>

</style>
