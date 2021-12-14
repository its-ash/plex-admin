<template>
  <div class="row justify-content-center">
    <div class="col-lg-3 col-md-4 col-11 mt-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          <div class="row">
            <div class="col-md-6">
              <h6 class="mb-0">Free IPs</h6>
            </div>
          </div>
        </div>
        <div class="card-body pt-4 p-3" style="max-height: 70vh; overflow-y: scroll">
          <ul class="list-group">
            <li v-for="ip in IPs"
                :ref="ip"
                class="list-group-item border-0 d-flex justify-content-between mb-2 border-radius-lg">
              <div class="d-flex align-items-center">
                <button @click="addToIpList(ip)"
                        class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                  +
                </button>
                <div class="d-flex flex-column">
                  <h6 class="mb-1 text-dark text-sm">{{ ip }}</h6>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-11 mt-4">
      <div v-if="selectedUser === ''" class="card h-100">
        <div class="card-header pb-0 px-3">
          <div class="row">
            <div class="col-md-6">
              <h6 class="mb-0">Users</h6>
            </div>
          </div>
        </div>
        <div class="card-body pt-4 p-3" style="max-height: 70vh; overflow-y: scroll">
          <ul class="list-group">
            <li v-for="user in users"
                class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div class="d-flex align-items-center">
                <button
                  @click="selectUser(user)"
                  class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                </button>
                <div class="d-flex flex-column">
                  <h6 class="mb-1 text-dark text-sm">{{ user }}</h6>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <div class="card-header pb-0 px-3">
            <div class="row">
              <div class="col-md-6">
                <h6 class="mb-0 text-nowrap">Users :
                  <span class="bg-info text-white p-1 rounded">{{ selectedUser }}</span></h6>
              </div>
            </div>
          </div>
          <div class="card-body pt-4 p-3">
            <ul class="list-group">
              <li v-for="(ip, index) in selectedIP"
                  class="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                <div class="d-flex align-items-center">
                  <div class="d-flex flex-column">
                    <h6 class="m-0 text-dark text-sm">{{ index + 1 }}.
                      <span class="bg-warning p-1 rounded">{{ ip }}</span></h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex pt-3">
          <button @click="assign" class="btn btn-behance w-75 p-2 mx-4">Assign</button>
          <button @click="preventAssign" class="btn btn-behance w-75 p-2 mx-4 bg-danger">Cancel</button>
        </div>
      </div>
    </div>
    <div class="col-lg-5 mt-md-0 mt-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          <div class="row p-3">
            <div class="col-6">
              <h6 class="mb-0">User Information</h6>
            </div>
            <div class="col-6 m-0">
              <input class="form-control" placeholder="Search here" type="text">
            </div>
          </div>
        </div>
        <div class="card-body p-3" style="max-height: 70vh; overflow-y: scroll">
          <ul class="list-group">
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex m-1 p-2 mb-2 bg-gray-100 border-radius-lg row">
              <div class="col-8 d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <div class="d-flex flex-wrap">
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.122.122.12</span>
                  <span class="bg-warning p-1 m-1 rounded text-dark font-weight-bold">12.112.112.12</span>
                </div>
              </div>
              <div class="col ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href=""><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
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
    selectedIP: [],
    selectedUser: '',
    IPs: ['185.206.108.54',
      '8.111.161.137',
      '190.105.90.84',
      '17.102.84.173',
      '116.225.145.65',
      '60.70.20.182',
      '201.112.162.33',
      '26.170.208.34',
      '246.247.122.231',
      '203.145.11.252'],
    users: ['Nikhil Shepard',
      'Ivo Valentine',
      'Meredith Arellano',
      'Sara Ingram',
      'Fleur Vega',
      'Nala Burris',
      'Elis Swift',
      'Tiya Acevedo',
      'Glenn Frazier',
      'Jerry Bowen']

  }),
  methods: {
    addToIpList(ip) {
      this.$refs[ip][0].classList.toggle('bg-light');
      if (this.selectedIP.includes(ip)) {
        this.selectedIP = this.selectedIP.filter(item => item !== ip);
      } else {
        this.selectedIP.push(ip)
      }
    },
    selectUser(user) {
      this.selectedUser = user;
    },
    preventAssign() {
      this.selectedUser = '';
    },
    assign() {
      confirm("Are You Sure");
    }
  }
}
</script>

<style scoped>

</style>
