<template>
  <div>
    <MachineDetail v-if="showMachineDetailBox"></MachineDetail>
    <MachineList v-if="showMachineListBox"></MachineList>

    <Sidebar></Sidebar>
    <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
      <Navbar></Navbar>
      <keep-alive>
        <nuxt/>
      </keep-alive>
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
    this.$store.dispatch('updateUserList');
    this.$store.dispatch('updateMachineList');
    // this.$store.dispatch('fetchMachine');
    // this.$store.dispatch('fetchAllMachine');
  },
  created() {
    const host = 'https://plex-mqtt.foxapi.live';
    const port = 443;
    const username = "plex";
    const password = "Am434DsCaFQaNgHX";

    const client = mqtt.connect(host, {
      host, port, username, password, reconnectPeriod: 5000, protocol: "wss", clean: true,
    });


    window.connect = (id) => client.publish("Vpn/" + id, "true", {retain: true})
    window.disconnect = (id) => client.publish("Vpn/" + id, "false", {retain: true})

    client.on("connect", () => {
      client.subscribe("Machine/#");
      client.subscribe("Ping/#");
      client.subscribe("Vpn/#");
    });

    try {
      client.stream.on("error", (error) => {
        this.$toast.error("Please contact Support");
      });
    } catch (e) {
      console.log(e)
    }

    client.on("error", (error) => {
      this.$toast.error("Please contact Support");
    });

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      console.log(topic)
      if (topic.includes("Machine")) {
        this.$store.dispatch('updateMachine', data);
      } else if (topic.includes("Ping")) {
        this.$store.dispatch('updatePing', {topic, data});
      } else if (topic.includes("Vpn")) {
        const user = topic.split("/")[1];
        const status = ['true', true].includes(data);
        this.$store.commit('setVpnStatus', {user, status})
      }
    });
  }

}
</script>

<style scoped>

</style>
