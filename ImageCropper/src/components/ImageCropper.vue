<template>
  <div class='canvas-wrapper'>

    <CropperDialog
      v-if='showModal'
      :show='showModal'
      :selectedImage='imageSrc'
      :fileExtention='fileExtention'
      @close='onCloseModal'
      @save='onSaveCroppedImage'
    />

    <div class="flex justify-center content-end mt-2">
      <button
        class="btn btn-blue w-32 mx-2"
        @click="$refs.imageInput.click()"
      >
        New Image
      </button>

      <input
        type="file"
        ref="imageInput"
        accept="image/*"
        @change="onSelectImage"
        :style="{ display: 'none' }"
      />
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
      fileExtention: null
    }
  },
  methods: {
    onSelectImage (e) {
      const files = e.target.files || e.dataTransfer.files;

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
      console.log({ data })
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
</style>