<template>
  <div class="canvas-wrapper">
    <CropperDialog
      v-if="showModal"
      :show="showModal"
      :selectedImage="imageSrc"
      :fileExtention="fileExtention"
      @close="onCloseModal"
      @save="onSaveCroppedImage"
    />

    <div class="flex justify-center content-end mt-2">
      <div
        v-if="!croppedImage"
        class="cropped-image-placeholder"
      >
        اضغط هنا 
      </div>      
      <div
        v-else
        class="cropped-image-placeholder"
        :style="`background-image: url(${croppedImage})`"
      />

      <button
        class="btn btn-blue w-32 mx-2"
        @click="$refs.imageInput.click()"
      >
        New Image
      </button>

      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        :style="{ display: 'none' }"
        @change="onSelectImage"
      >
    </div>
  </div>
</template>

<script>
import CropperDialog from './CropperDialog.vue';

export default {
  name: 'ImageCropper',
  components: {
    CropperDialog
  },
  data () {
    return {
      showModal: false,
      // imageInput: null,
      selectedFile: null,
      imageSrc: null,
      fileExtention: null,
      croppedData: {}
    }
  },
  computed: {
    croppedImage() {
      const { croppedImage } = this.croppedData;
      
      return croppedImage;
    }
  },
  methods: {
    onSelectImage (e) {
      const files = e.target.files || e.dataTransfer.files;
  console.log('e.target.files',e.target.files)
      if (files.length) {
        const file = files[0];
        const fileReader = new FileReader();
        console.log(file);
        // update selected file
        this.selectedFile = file;
        this.fileExtention = file.type;

        fileReader.readAsDataURL(file);

        fileReader.onload = (event) => {
          this.imageSrc = event.target.result;
          // open the modal
          this.showModal = true;
        };
      }
    },
    onCloseModal () {
      this.showModal = false;
      this.selectedFile = null;
      this.fileExtention = null;
    },
    onSaveCroppedImage (data) {
      this.onCloseModal();
      console.log({ data });
      this.croppedData = data;
      this.$emit('cropImage', data);
    },
  },
}
</script>

<style scoped>
.canvas-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cropped-image-placeholder {
  width: 100px;
  height: 100px;
  border: 1px solid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>