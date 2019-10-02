<template>
  <div id="app">
    <AttachFile
      :maximumSize="10"
      :fileExtinstion="fileExtinstion"
      :isSingle="false"
      @FilesArray="AllFiles"
    ></AttachFile>
  </div>
</template>

<script>
import AttachFile from "./components/AttachFile.vue";
export default {
  name: "app",
  components: { AttachFile },
  data() {
    return {
      fileExtinstion: ".png,.pdf,.jpg,.jpeg,.zip"
    };
  },
  methods: {
    AllFiles(data) {
      console.log(data);
    }
  }
};
</script>


