<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Machine IP's Table</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">IP</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">User</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                    Status
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Last
                    Ping
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                    Location
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr class="machine-list" @click="$store.dispatch('showMachineDetailBox')">
                  <td>
                    <div class="d-flex px-2">
                      <div>
                        <img src="../assets/img/small-logos/logo-spotify.svg"
                             class="avatar avatar-sm rounded-circle me-2" alt="spotify">
                      </div>
                      <div class="my-auto">
                        <h6 class="mb-0 text-sm">10.8.0.123</h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold mb-0">Ash</p>
                  </td>
                  <td class="text-center">
                    <span class="badge badge-sm bg-gradient-danger">Offline</span>
                  </td>
                  <td class="text-center">
                    <h5 class="text-sm m-0 text-black-50">12:23 12-3-2021</h5>
                  </td>
                  <td class="text-center">
                    <h6 class="m-0 text-black-50">Jaipur</h6>
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
  name: "plc",
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
