// noinspection ES6CheckImport

import Vue from 'vue';
import {Line, Doughnut, Bar} from 'vue-chartjs';

Vue.component('chart-line', {
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})


Vue.component('chart-doughnut', {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})


Vue.component('chart-bar', {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
