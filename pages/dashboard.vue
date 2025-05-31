<template>
  <div class="container-fluid py-4">

    <div :key="refreshKey" class="row mt-4">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-capitalize font-weight-bold">Total User</p>
                  <h4 class="font-weight-bolder mb-0">
                    {{ users.length }}
                  </h4>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                  <i class="ni ni-user-run text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-capitalize font-weight-bold">Active Machine</p>
                  <h4 class="font-weight-bolder mb-0">
                    {{ machines.map(x => x.machines.length).reduce((a, b) => a + b, 0) }}
                  </h4>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                  <i class="ni ni-active-40 text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">-->
      <!--        <div class="card">-->
      <!--          <div class="card-body p-3">-->
      <!--            <div class="row">-->
      <!--              <div class="col-8">-->
      <!--                <div class="numbers">-->
      <!--                  <p class="text-sm mb-0 text-capitalize font-weight-bold">New Machine</p>-->
      <!--                  <h4 class="font-weight-bolder mb-0">-->
      <!--                    10-->
      <!--                  </h4>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="col-4 text-end">-->
      <!--                <div class="icon icon-shape bg-gradient-warning shadow text-center border-radius-md">-->
      <!--                  <i class="ni ni-notification-70 text-lg opacity-10" aria-hidden="true"></i>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">-->
      <!--        <div class="card">-->
      <!--          <div class="card-body p-3">-->
      <!--            <div class="row">-->
      <!--              <div class="col-8">-->
      <!--                <div class="numbers">-->
      <!--                  <p class="text-sm mb-0 text-capitalize font-weight-bold">Offline Router</p>-->
      <!--                  <h4 class="font-weight-bolder mb-0">-->
      <!--                    40-->
      <!--                  </h4>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="col-4 text-end">-->
      <!--                <div class="icon icon-shape bg-gradient-danger shadow text-center border-radius-md">-->
      <!--                  <i class="ni ni-books text-lg opacity-10" aria-hidden="true"></i>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-2 mt-3">-->
      <!--        <div class="card">-->
      <!--          <div class="card-body p-3">-->
      <!--            <div class="row">-->
      <!--              <div class="col-8">-->
      <!--                <div class="numbers">-->
      <!--                  <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Users</p>-->
      <!--                  <h4 class="font-weight-bolder mb-0">-->
      <!--                    400-->
      <!--                  </h4>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="col-4 text-end">-->
      <!--                <div class="icon icon-shape bg-gradient-warning shadow text-center border-radius-md">-->
      <!--                  <i class="ni ni-active-40 text-lg opacity-10" aria-hidden="true"></i>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-2 mt-3">-->
      <!--        <div class="card">-->
      <!--          <div class="card-body p-3">-->
      <!--            <div class="row">-->
      <!--              <div class="col-8">-->
      <!--                <div class="numbers">-->
      <!--                  <p class="text-sm mb-0 text-capitalize font-weight-bold">New Queries</p>-->
      <!--                  <h4 class="font-weight-bolder mb-0">-->
      <!--                    40-->
      <!--                  </h4>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="col-4 text-end">-->
      <!--                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">-->
      <!--                  <i class="ni ni-square-pin text-lg opacity-10" aria-hidden="true"></i>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <div class="row mt-2 align-content-center">
      <div class="col-3 mb-4">
        <select v-model="user" class="form-select mt-3">
          <option disabled value="Select User" class="text-dark">Select User</option>
          <option v-for="user in users" :value="user.mobile"> {{ user.name }} : {{ user.mobile }}</option>
        </select>
      </div>
      <div class="col-3">
        <select v-model="machine" class="form-select mt-3">
          <option disabled value="Select Machine" class="text-dark">Select Machine</option>
          <template v-if="user !== 'Select User'">
            <option v-for="machine in userMachines" :value="machine.ip">
              {{ machine.ip }} : {{ machine.name }} : {{ machine.type }}
            </option>
          </template>
        </select>
      </div>
      <div class="col-3 pt-3">
        <date-picker class="w-100" v-model="startDate" valueType="format"></date-picker>
      </div>
      <div class="col-3 pt-3">
        <date-picker class="w-100" v-model="endDate" valueType="format"></date-picker>
      </div>
      <div class="col-12 row pr-0 mr-0" v-if="user !== 'Select User' && machine !== 'Select Machine'">
        <div class="col-6 row align-content-center">
          <div class="col-4">
            <button class="btn btn-primary" @click="generateChart">Generate Chart</button>
          </div>
          <div class="col-6" v-if="showChart">
            <select v-model="selectedKey" class="form-select">
              <option v-for="field in chartKeys" :value="field">
                {{ field }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-auto" style="margin-left: auto">
          <button class="btn btn-secondary" @click="downloadData">Download Data</button>
        </div>


      </div>
      <div class="col-12" v-if="generatingData">
        <Skeleton :count="2"></Skeleton>
      </div>
      <div class="col-12" :key="chartKey" v-if="showChart">
        <chart-line :key="selectedKey" :style="{width: chartDatasets.datasets.length * 50 + 'px', minWidth: '1000px'}"
                    v-if="!generatingChart"
                    :data="chartDatasets"
                    :options="chartOption"/>
        <Skeleton v-else :count="10"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import {Skeleton} from 'vue-loading-skeleton';

import DoughnutChart from "~/components/DoughnutChart";
import BarChart from "~/components/BarChart";
import LineChart from "~/components/LineChart";
import 'vue2-datepicker/index.css';
import DatePicker from 'vue2-datepicker';
import moment from "moment";

export default {
  name: "index",
  components: {DoughnutChart, BarChart, LineChart, DatePicker, Skeleton},
  data: () => ({
    showChart: false,
    chartKey: 1,
    refreshKey: 1,
    user: "Select User",
    machine: "Select Machine",
    startDate: "",
    endDate: "",
    chartOption: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90
          }
        }]
      },
    },
    generatingChart: false,
    generatingData: false,
    result: [],
    chartKeys: ['MainMotorCurrent', 'Depth', "BridgeSpeed", "TotalCurrent","CTSpeed", "TotalProduction", "ConveyorSpeed"],
    selectedKey: "Depth",
  }),
  computed: {
    chartDatasets() {
      const datasets = [];
      let labels = [];
      const colorMap = {
        MainMotorCurrent: 'rgb(75, 192, 192)',
        Depth: 'rgb(255, 99, 132)',
      };

      if (this.selectedKey) {
        let lastValue = -1;
        const chartData = {};
        this.result.map(row => {
          if (lastValue !== row[this.selectedKey]) {
            lastValue = row[this.selectedKey];
            chartData[row.Time] = lastValue;
          }
        });

        labels = Object.keys(chartData);
        datasets.push({
          label: this.selectedKey,
          backgroundColor: 'transparent',
          borderColor: colorMap[this.selectedKey],
          data: Object.values(chartData),
        })
      }
      return {datasets, labels};
    },
    users() {
      return this.$store.state.users;
    },
    machines() {
      return this.$store.state.machines;
    },
    userMachines() {
      return this.$store.state.machines.find(x => x.mobile === this.user)?.machines ?? [];
    }
  },
  mounted() {
    this.startDate = moment().format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    setInterval(() => {
      this.refreshKey += 1;
    }, 3000);
  },
  methods: {
    getData() {
      const payload = {
        "start": this.startDate + " 00:00:00",
        "end": this.endDate + " 00:00:00",
        "mobile": this.user,
        "ip": this.machine
      }
      return this.$axios.post('/exportData/', payload).then(data => {
        return data.data?.result ?? [];
      })
    },
    generateChart() {
      this.showChart = true;
      this.generatingChart = true;
      this.getData().then((data) => {
        if (data.length > 0) {
          this.result = data;
          this.chartKey = Math.random();
        } else {
          alert("No Data Found");
        }
        this.generatingChart = false;
      });
    },
    downloadData() {
      this.generatingData = true;
      this.showChart = false;
      this.getData().then((data) => {
        if (data.length > 0) {
          const array = [Object.keys(data[0])].concat(data)
          const hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' +
            encodeURI(
              array.map(it => {
                return Object.values(it).toString()
              }).join('\n'));
          hiddenElement.target = '_blank';
          hiddenElement.download = 'output.csv';
          hiddenElement.click();
          hiddenElement.remove();
        } else {
          alert("No Data Found");
        }
        this.generatingData = false;
      });


    },
  },
  watch: {
    user() {
      this.machine = "Select Machine";
    }
  }
}


</script>

<style lang="scss">
.mx-input-wrapper {
  input {
    height: 39px;
    border-radius: 9px;
    cursor: pointer;
  }
}
</style>

