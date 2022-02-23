<template>

  <ImageCropper />
</template>

<script>
import ImageCropper from "./components/ImageCropper.vue";

export default {
  name: "App",
  components: { 
    ImageCropper 
  },
  data() {
    return {
    };
  },
  methods: {
    onSelectFiles(files) {
      console.log('onSelectFiles', files);
    }
  }
};
</script>


