<template>
  <div>
    <ChooseFile
      ref="foo"
      :fileAllowedExtensions="fileAllowedExtensions"
      :maxSize="maxSize"
      fileId="myId"
    />
  </div>
</template>

<script>
import ChooseFile from "./components/ChooseFile.vue";

export default {
  name: "App",
  components: { ChooseFile },
  data() {
    return {
      fileAllowedExtensions: ".jpg,.pdf,.png,.jpeg,.JPEG,.PNG",
      maxSize: 3,
      clearData: false
    };
  }
};
</script>
