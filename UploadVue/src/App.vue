<template>
  <div class="section">
    <div class="container">
      <ReasonFileUploader
        :dataType="this.type"
        :fileAllowedExtensions="fileex"
        :dataSource="this.DataSource"
        status="Add"
      />
    </div>
  </div>
</template>

<script>
import ReasonFileUploader from "./components/ReasonFileUploader.vue";

export default {
  name: "app",
  components: {
    ReasonFileUploader
  },
  data() {
    return {
      fileex: ".PNG",
      type: "list",
      ReasonData: [],
      DataSource: ["السبب ١", "أخرى"],
      maxSize: 10,
      fileAllowedExtensions: ".jpg,.pdf,.png,.jpeg,.zip"
    };
  }
};
</script>



<style>
</style>
