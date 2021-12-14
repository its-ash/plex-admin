<template>
  <div class="row justify-content-center">
    <div class="col-md-4 col-11">
      <div class="card">
        <div class="card-body">
          <form class="form text-left">
            <div class="mb-3">
              <label for="name">Full Name</label>
              <input id="name" type="text"
                     class="form-control" placeholder="Name" aria-label="Name"
                     pattern="\w+\s\w+" required
                     aria-describedby="email-addon">
            </div>
            <div class="mb-3">
              <label for="email">Email</label>
              <input id="email" type="email" class="form-control" placeholder="Email" aria-label="Email"
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
              <input id="mobile" type="number" class="form-control" placeholder="Mobile" aria-label="Mobile"
                     aria-describedby="password-addon">
            </div>
            <div class="text-center">
              <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">SAVE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-7 col-11 mt-md-0 mt-4">
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
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Oliver Liam</h6>
                <span class="mb-2 text-xs">Company Name: <span
                  class="text-dark font-weight-bold ms-sm-2">Viking Burrito</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">oliver@burrito.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Lucas Harper</h6>
                <span class="mb-2 text-xs">Company Name: <span class="text-dark font-weight-bold ms-sm-2">Stone Tech Zone</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">lucas@stone-tech.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Ethan James</h6>
                <span class="mb-2 text-xs">Company Name: <span
                  class="text-dark font-weight-bold ms-sm-2">Fiber Notion</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">ethan@fiber.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Lucas Harper</h6>
                <span class="mb-2 text-xs">Company Name: <span class="text-dark font-weight-bold ms-sm-2">Stone Tech Zone</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">lucas@stone-tech.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Ethan James</h6>
                <span class="mb-2 text-xs">Company Name: <span
                  class="text-dark font-weight-bold ms-sm-2">Fiber Notion</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">ethan@fiber.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Lucas Harper</h6>
                <span class="mb-2 text-xs">Company Name: <span class="text-dark font-weight-bold ms-sm-2">Stone Tech Zone</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">lucas@stone-tech.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                  class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
              </div>
            </li>
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Ethan James</h6>
                <span class="mb-2 text-xs">Company Name: <span
                  class="text-dark font-weight-bold ms-sm-2">Fiber Notion</span></span>
                <span class="mb-2 text-xs">Email Address: <span class="text-dark ms-sm-2 font-weight-bold">ethan@fiber.com</span></span>
                <span class="text-xs">VAT Number: <span
                  class="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
              </div>
              <div class="ms-auto text-end">
                <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                  class="far fa-trash-alt me-2"></i>Delete</a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
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
import {states, city} from "~/util/cities";

export default {
  name: "add-user",
  data: () => ({
    states,
    cities: [],
    state: 'Select State',
    city: 'Select City',
    password: ''
  }),
  methods: {
    selectState(name, index) {
      this.city = 'Select City';
      this.cities = city[index + 1].split(" | ").map(x => x.trim());
      this.state = name;
    },
    selectCity(name) {
      this.city = name;
    }
  }
}
</script>

<style scoped>

</style>
