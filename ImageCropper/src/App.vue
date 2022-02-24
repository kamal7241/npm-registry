<template>
  <ImageCropper
    label="نص تجريبي"
    :cropperConfigs="cropperConfigs"
    @cropImage="onCropImage"
  >
    <template #emptyPlaceholder="{croppedImage, onUploadImage}">
      <div
        class="empty-image-placeholder"
        @click="onUploadImage"
      >
        choose
      </div> 
    </template> 
    
    <template #previewWithActions="{croppedImage, onEditSelectedImage, onDeleteSelectedImage, onUploadImage}">
      <div class="cropped-image-placeholder">
        <img
          :src="croppedImage"
          class="cropped-image"
          alt="cropped-image"
        >

        <div class="actions">
          <img
            src="./assets/edit.png"
            alt="edit"
            @click="onEditSelectedImage"
          >

          <img
            src="./assets/delete.svg"
            alt="delete"
            @click="onDeleteSelectedImage"
          >        
        
          <img
            src="./assets/upload.png"
            alt="upload"
            @click="onUploadImage"
          >
        </div>
      </div>
    </template>
  </ImageCropper>
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
      cropperConfigs: {
        aspectRatio: 4/6
      }
    };
  },
  methods: {
    onCropImage(data) {
      console.log('onCropImage', data);
    }
  }
};
</script>

<style scoped>
.empty-image-placeholder {
  align-items: center;
  justify-content: center;
}

.cropped-image-placeholder {
  position: relative;
  /* flex-direction: ; */
}

.cropped-image-placeholder .cropped-image {
  width: 100%;
  height: 100%;
}
.cropped-image-placeholder .actions {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 5px;
  background: rgba(255, 255, 255, .5);
}

.cropped-image-placeholder .actions img{
  width: 20px;
  height: 20px;
  margin: 0 5px;
}
</style>


