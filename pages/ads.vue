<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Ads Table</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class=" p-0">
              <div class="row justify-content-around">
                <div class="col-3 position-relative" v-for="(image, index) in images" :key="index">
                  <img class="w-100 rounded" :src="image" alt="">
                  <button @click="deleteFile(image)" class="bg-white delete-btn btn px-2 py-1">❌</button>
                </div>
              </div>
              <div class="row px-5 mx-5 pt-5 justify-content-around" :key="refreshKey">
                <input @change="uploadFile" ref="file" class="col-5 btn btn-secondary" type="file"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Ads",
  computed: {},
  data: () => ({
    images: [],
    refreshKey: 1,
  }),
  methods: {
    deleteFile(fileUrl) {
      const fileName = decodeURIComponent(fileUrl).split("ads/").pop().split("?")[0];
      if (fileName) {
        const storageRef = this.$fire.storage.ref("ads/" + fileName);
        storageRef.delete().then(() => {
          this.loadAds();
        });
      } else {
        this.$toast.error("Something went wrong!");
      }
    },
    pushFile() {
      const file = this.$refs.file.files[0];
      const storageRef = this.$fire.storage.ref("ads/" + file.name);
      storageRef.put(file).then((snapshot) => {
        this.loadAds();
      });
    },
    uploadFile() {
      if (this.$refs?.file?.files?.[0]) {
        if (this.$refs?.file?.files?.[0].type.includes("png") || this.$refs?.file?.files?.[0].type.includes("jpeg")) {
          this.pushFile();
          this.refreshKey = Math.random();
        }
      }
    },
    loadAds() {
      this.images = [];
      this.$fire.storage.ref("ads/").listAll().then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            this.images.push(url);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.loadAds();
  }
}
</script>

<style lang="scss">
.machine-list {
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
