<template>
  <ImageCropper
    label="نص تجريبي"
    name="personalInfo"
    isRequired
    :value="value"
    :cropperConfigs="cropperConfigs"
    :uploadCallback="onUploadData"
    :downloadCallback="onGenerateFileFromSharepointId"
    hint="hint placeholder"
    enableDownload
    enableServerSide
    updateParentWithFileMeta
    @cropImage="onCropImage"
  >
    <!-- <template #image-placeholder="{croppedImage, onEditSelectedImage, onDeleteSelectedImage, onUploadImage}">
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
    </template> -->
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
      },
      value: {
        attachmentTypeId:5,
        contentType:"image/png",
        id:0,
        sharepointId:"bPHSUiXuzJLHf2Q7V0vLtRYITqvi9wYk1LYMB7vCxJVhchPoNp4uqsjk2E+pqql4B8hlPlIsuvkdtKbkr40lpA=="
      }
    };
  },
  methods: {
    onCropImage(data) {
      console.log('onCropImage', data);
      this.value = data.value
    },
    async onUploadData(data) {
      console.log('onUploadData', data);
      return `test${Math.random()}test+pqql4B8hlPlIsuvkdtKbkr40lpA==`
    },
    async onGenerateFileFromSharepointId(data) {
      console.log('onUploadData', data);
      return new Promise((resolve) => {
        setTimeout(() => resolve(new File(["foo"], "foo.txt", {
          type: "image/png",
        })), 10000)
      })
    },
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


