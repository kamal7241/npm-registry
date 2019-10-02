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
      type: "text",
      ReasonData: [],
      DataSource: ["السبب ١", "السبب غير موجود"],
      maxSize: 10,
      fileAllowedExtensions: ".jpg,.pdf,.png,.jpeg,.zip"
    };
  }
};
</script>



<style>
</style>
