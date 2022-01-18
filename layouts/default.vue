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
import * as mqtt from "mqtt";
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
  },
  mounted() {
    this.$store.dispatch('fetchUser');
    this.$store.dispatch('fetchMachine');
  },
  created() {
    const host = 'ws://plex-mqtt.foxapi.live';
    const port = 9001;
    const username = "plex";
    const password = "Am434DsCaFQaNgHX";

    const client = mqtt.connect(host, {
      host, port, username, password, reconnectPeriod: 1000
    });

    client.publish("Vpm", "he");

    window.connect = (id) => client.publish("Vpn/" + id, "true");
    window.disconnect = (id) => client.publish("Vpn/" + id, "false")

    client.on("connect", () => {
      client.subscribe("Machine/#");
      client.subscribe("Ping/#");
    });

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      if (topic.includes("Machine")) {
        this.$store.dispatch('updateMachine', data);
      } else if (topic.includes("Ping")) {
        this.$store.dispatch('updatePing', data);
      }
    });
  }

}
</script>

<style scoped>

</style>
