<template>
  <div class="canvas-wrapper">
    <CropperDialog
      v-if="showModal"
      :show="showModal"
      :strings="strings"
      :cropperConfigs="cropperConfigs"
      :selectedImage="imageSrc"
      :fileExtention="fileExtention"
      @close="onReset"
      @save="onSaveCroppedImage"
    />

    <p
      v-if="label"
      class="label"
    >
      {{ label }}
      <span
        v-if="isRequired"
        class="star"
      >*</span>
    </p>

    <slot
      v-if="!croppedImage"
      :croppedImage="croppedImage"
      :onUploadImage="onUploadImage"
      name="emptyPlaceholder"
    >
      <div
        class="empty-image-placeholder"
        @click="onUploadImage"
      >
        {{ strings.clickHere }}
      </div> 
    </slot>

    <slot
      v-else
      name="previewWithActions"
      :croppedImage="croppedImage"
      :onUploadImage="onUploadImage"
      :onEditSelectedImage="onEditSelectedImage"
      :onDeleteSelectedImage="onDeleteSelectedImage"
    >
      <div class="cropped-image-placeholder">
        <img
          :src="croppedImage"
          class="cropped-image"
          alt="cropped-image"
        >

        <div class="actions">
          <img
            src="../assets/edit.png"
            alt="edit"
            @click="onEditSelectedImage"
          >

          <img
            src="../assets/delete.svg"
            alt="delete"
            @click="onDeleteSelectedImage"
          >        
        
          <img
            src="../assets/upload.png"
            alt="upload"
            @click="onUploadImage"
          >
        </div>
      </div>
    </slot>

    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      :style="{ display: 'none' }"
      @change="onSelectImage"
    >
  </div>
</template>

<script>
import CropperDialog from './CropperDialog.vue';

export default {
  name: 'ImageCropper',
  components: {
    CropperDialog
  },
  props: {
    label: {
      type: String,
      default: ''
    },    
    isRequired: {
      type: Boolean,
      default: false
    },
    cropperConfigs: {
      type: Object,
      default: () => ({})
    },    
    localizations: {
      type: Object,
      default: () => ({})
    },
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
    strings() {
      const { localizations } = this;

      return {
        clickHere: 'اضغط هنا',
        modalTitle: 'محرر الصورة',
        modalSaveAction: 'حفظ',
        modalCancelAction: 'إلغاء',
        ...localizations
      };
    },
    croppedImage() {
      const { croppedImage } = this.croppedData;
      
      return croppedImage;
    }
  },
  methods: {
    onSelectImage (e) {
      const files = e.target.files;

      if (files.length) {
        const file = files[0];
        const fileReader = new FileReader();

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
    onEditSelectedImage() {
      this.showModal = true;
    },    
    onDeleteSelectedImage() {
      this.onReset();
      this.croppedData = {};

      this.$emit('cropImage', null);
    },    
    onUploadImage() {
      this.$refs.imageInput.click();
    },
    onReset () {
      this.showModal = false;
      this.selectedFile = null;
      this.fileExtention = null;
    },
    onSaveCroppedImage (data) {
      this.onReset();

      this.croppedData = data;
      this.$emit('cropImage', data);
      // reset the value of the input 
      this.$refs.imageInput.value = '';
    },
  },
}
</script>

<style scoped>
.label {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 15px;
}

.label .star {
  color: red
}

.canvas-wrapper {
  padding: 100px;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
}

.cropped-image-placeholder,
.empty-image-placeholder {
  width: 200px;
  height: 200px;
  border: 1px solid;
  cursor: pointer;
  display: flex;
}

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