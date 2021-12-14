<template>
  <div>
    <MachineDetail v-if="showMachineDetailBox"></MachineDetail>
    <MachineList v-if="showMachineListBox"></MachineList>

    <Sidebar></Sidebar>
    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
      <Navbar></Navbar>
      <nuxt/>
    </main>
  </div>
</template>

<script>

import Sidebar from "~/components/Sidebar";
import Navbar from "~/components/Navbar";
import MachineDetail from "~/components/MachineDetail";
import {mapState} from 'vuex';
import MachineList from "~/components/MachineList";

export default {
  name: "default",
  components: {Sidebar, Navbar, MachineDetail, MachineList},
  computed: {
    ...mapState(['showMachineDetailBox', 'showMachineListBox'])
  },
  head() {
    return {
      bodyAttrs: {
        class: 'g-sidenav-show  bg-gray-100'
      }
    }
  }

}
</script>

<style scoped>

</style>
