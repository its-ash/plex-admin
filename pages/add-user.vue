<template>
  <div class="row justify-content-center">
    <div class="col-12 m-3">
      <div class="row">
        <div class="col-3">
          <div class="text-center">
            <button @click="addUser" class="btn bg-gradient-dark w-100 my-4 mb-2">Add New User</button>
          </div>
        </div>
      </div>
    </div>
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
              <h6 class="mb-0">User Information</h6>
            </div>
            <div class="col-6 m-0">
              <input v-model="search" class="form-control" placeholder="Search here" type="text">
            </div>
          </div>
        </div>
        <div class="card-body p-3" style="max-height: 60vh; overflow-y: scroll">
          <ul class="list-group">
            <li v-for="user in users" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">{{ user.name }}</h6>
                <span class="mb-2 text-xs">Company Name: <span
                  class="text-dark font-weight-bold ms-sm-2">{{ user.name }}</span></span>
                <span class="mb-2 text-xs">Email Address: <span
                  class="text-dark ms-sm-2 font-weight-bold">{{ user.email }}</span></span>
                <span class="text-xs">Mobile Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">{{ user.mobile }}</span></span>
              </div>
              <div class="ms-auto text-end">
                <a @click="apiDeleteUser(user)" class="btn btn-link text-danger text-gradient px-3 mb-0" href="#"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a @click="editUser(user)" class="btn btn-link text-dark px-3 mb-0" href="#"><i
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
import {city, states} from "~/util/cities";

export default {
  name: "add-user",
  data: () => ({
    addNewUser: false,
    email: '',
    states,
    cities: [],
    state: 'Select State',
    city: 'Select City',
    mobile: '',
    search: '',
    addText: 'Add User',
  }),
  methods: {
    addUser() {
      this.addText = "Add User";
      this.addNewUser = true;
    },
    selectState(name, index) {
      this.city = 'Select City';
      this.cities = city[index + 1].split(" | ").map(x => x.trim());
      this.state = name;
    },
    selectCity(name) {
      this.city = name;
    },
    apiAddNewUser() {
      if (this.addText === "Update") {
        this.apiUpdateUser();
        return;
      }
      this.$axios.post('/user/', {
        "mobile": this.mobile,
        "name": this.name,
        "state": this.state,
        "district": this.city,
        "email": this.email,
      }).then((res) => {
        if (res.status === 201) {
          this.$toast.success('User added successfully').goAway(2000);
          this.addNewUser = false;
        }
      });
    },
    apiUpdateUser() {
      this.$axios.put(`/user/${this.mobile}/`, {
        "mobile": this.mobile,
        "name": this.name,
        "state": this.state,
        "district": this.city,
        "email": this.email,
      }).then((res) => {
        if (res.status === 200) {
          this.$toast.success('User Updated successfully').goAway(2000);
          this.addNewUser = false;
        }
      });
      this.$store.dispatch('fetchUser');
    },
    apiDeleteUser(user) {
      const value = confirm("Are Want to Delete User " + user.name);
      if (value) {
        this.$axios.delete(`/user/${user.mobile}/`,).then((res) => {
          if (res.status === 204) {
            this.$toast.success('User Deleted successfully').goAway(2000);
          }
        });
        this.$store.dispatch('fetchUser');
      }

    },
    editUser(user) {
      this.addText = "Update";
      this.addNewUser = true;
      this.name = user.name;
      this.email = user.email;
      this.mobile = user.mobile;
      this.state = user.state;
      this.city = user.district;
      // this.$toast.success('User edited successfully');
    },
  },
  computed: {
    users() {
      return this.$store.state.users.filter((user) => {
        return user.name.toLowerCase().includes(this.search.toLowerCase()) || user.mobile.includes(this.search);
      });
    }
  },
  mounted() {
    this.$store.dispatch('fetchUser');
  }
}
</script>

<style scoped>

</style>
