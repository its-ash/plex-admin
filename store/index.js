export const state = () => ({
  showMachineDetailBox: false,
  showMachineListBox: false
})

export const mutations = {
  machineDetailBoxState(state, value) {
    state.showMachineDetailBox = value;
  },
  machineListBoxState(state, value) {
    state.showMachineListBox = value;
  }
}

export const actions = ({
  showMachineDetailBox(context) {
    context.commit('machineDetailBoxState', true);
  },
  hideMachineDetailBox(context) {
    context.commit('machineDetailBoxState', false);
  },
  showMachineListBox(context) {
    context.commit('machineListBoxState', true);
  },
  hideMachineListBox(context) {
    context.commit('machineListBoxState', false);
  }
})
