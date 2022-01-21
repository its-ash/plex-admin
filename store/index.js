export const state = () => ({
  showMachineDetailBox: false,
  showMachineListBox: false,
  users: [],
  machines: [],
  MQTT_MACHINES: {},
  allMachines: [],
  selectedUser: '',
  ping: {},
  updateKey: '',
  rawPing: {},
})

export const mutations = {
  machineDetailBoxState(state, value) {
    state.showMachineDetailBox = value;
  },
  machineListBoxState(state, value) {
    state.showMachineListBox = value;
  },
  users(state, value) {
    state.users = value;
  },
  machines(state, value) {
    state.machines = value;
  },
  allMachines(state, value) {
    state.allMachines = value;
  },
  selectUser(state, value) {
    state.selectedUser = value;
  },
  setPing(state, {key, value, raw}) {
    state.ping[key] = value;
    state.updateKey = value;
    state.rawPing[key] = raw;
  },
  setMqttMachines(state, {key, value}) {
    state.MQTT_MACHINES[key] = value;
  },
}

export const actions = ({
  showMachineDetailBox(context) {
    context.commit('machineDetailBoxState', true);
  },
  hideMachineDetailBox(context) {
    context.commit('machineDetailBoxState', false);
  },
  showMachineListBox(context, user) {
    context.commit('selectUser', user);
    context.commit('machineListBoxState', true);
  },
  hideMachineListBox(context) {
    context.commit('machineListBoxState', false);
  },
  fetchUser(context) {
    this.$axios.$get('/user/').then((res) => {
      context.commit('users', res);
    });
  },
  fetchMachine(context) {
    this.$axios.$get('/machine-list').then((res) => {
      context.commit('machines', res['machine_list']);
    });
  },
  fetchAllMachine(context) {
    this.$axios.$get('/machine/?format=json').then((res) => {
      context.commit('allMachines', res);
    });
  },
  updateMachine(context, data) {
    const key = data.topic.split("/")[1];
    const value = data.data;
    context.commit('setMqttMachines', {key, value});
  },
  updatePing(context, data) {
    console.log("Setting Ping");
    const key = data.topic.split("/")[1];
    const value = (new Date(data.data)).toString().substring(0, 24)
    context.commit('setPing', {key, value, 'raw': data.data});
  },
})
