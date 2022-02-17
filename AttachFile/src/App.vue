<template>
  <div id="app">
    <AttachFile
      :maximumSize="10"
      :isSingle="true"

      @FilesArray="AllFiles"
    />
  </div>
</template>

<script>
import AttachFile from "./components/AttachFile.vue";
export default {
  name: "App",
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


