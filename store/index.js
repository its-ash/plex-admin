export const state = () => ({
  showMachineDetailBox: false,
  showMachineListBox: false,
  users: [],
  machines: [],
  selectedUser: '',
  ping: {},
  rawPing: {},
  currentMachineID: "",
  currentMachine: {},
  currentUser: {},
  vpnStatus: {},
  machineTypes: [
    "ALPHA-14",
    "ALPHA-21",
    "PILOT",
    "JUMBO",
    "RAPID PLUS 09",
    "RAPID PLUS 12",
    "RAPID PLUS 16",
    "SJ-14",
    "SJ-14 PLUS",
    "SJ-21",
  ],
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
  setCurrentMachine(state, value) {
    state.currentMachine = value;
  },
  setCurrentMachineID(state, value) {
    state.currentMachineID = value;
  },
  setCurrentUser(state, value) {
    state.currentUser = value;
  },
  setVpnStatus(state, {user, status}) {
    state.vpnStatus[user] = status;
  }
}

export const actions = ({
  updateUserList(context) {
    this.$fire.firestore
      .collection('User').get().then((res) => {
      const users = [];
      res.forEach(doc => {
        users.push(doc.data());
      })
      context.commit('users', users);
    });
  },
  updateMachineList(context) {
    this.$fire.firestore
      .collection('Machines').get().then((res) => {
      const machines = [];
      res.forEach(doc => {
        machines.push(doc.data());
      })
      context.commit('machines', machines);
    });
  },
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
    const key = data['DeviceID'] + data['ClientID'];
    context.commit('setMqttMachines', {key, value: data});
  },
  updatePing(context, data) {
    const key = data.topic.split("/")[1];
    const value = (new Date(data.data)).toString().substring(0, 24)
    context.commit('setPing', {key, value, 'raw': data.data});
  },
})
