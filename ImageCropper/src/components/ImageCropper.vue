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
      :class="labelClassName"
    >
      {{ label }}
      <span
        v-if="isRequired"
        class="star"
      >*</span>
    </p>

    <slot
      :croppedImage="croppedImage"
      :onUploadImage="onUploadImage"
      :onEditSelectedImage="onEditSelectedImage"
      :onDeleteSelectedImage="onDeleteSelectedImage"
      name="image-placeholder"
    >
      <div class="input-wrapper">
        <button
          :disabled="readOnlyMode"
          class="indicator pointer"
          @click="onUploadImage"
        >
          {{ strings.chooseFile }}
        </button>

        <div class="name-placeholder">
          {{ selectedFile ? selectedFile.displayName : strings.clickHere }}
        </div>

        <div class="actions">
          <img
            v-if="selectedFile && !readOnlyMode"
            src="../assets/cancel.svg"
            class="action"
            width="30"
            height="30"
            alt="delete"
            @click="onDeleteSelectedImage"
          >
        </div>
      </div>
    </slot>

    <slot
      v-if="error && activateInternalErrorPreview"
      name="errors"
      :errors="error"
    >
      <div class="error-placeholder">
        <p class="text">
          {{ strings.errorText || error }}
        </p>
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
    name: {
      type: String,
      default: ''
    },        
    
    labelClassName: {
      type: String,
      default: ''
    },    
    isRequired: {
      type: Boolean,
      default: false
    },    
    activateInternalErrorPreview: {
      type: Boolean,
      default: false
    },
    enableFullnameDisplay: {
      type: Boolean,
      default: false
    },
    readOnlyMode: {
      type: Boolean,
      default: false
    },
    maxDisplayNameLength: {
      type: Number,
      default: 15,
    },    
    cropperConfigs: {
      type: Object,
      default: () => ({})
    },    
    localizations: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showModal: false,
      // imageInput: null,
      selectedFile: null,
      imageSrc: null,
      fileExtention: null,
      error: this.isRequired ? 'هذا الحقل مطلوب' : '',
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
        chooseFile: 'اختر ملف',
        errorText: '',
        ...localizations
      };
    },
    croppedImage() {
      const { croppedImage } = this.croppedData;
      
      return croppedImage;
    },
    isValidValue() {
      const { name, file } = this.value || {};

      if(name && file) {
        return true
      }

      return false;
    }
  },
  watch: {
    value() {
      if(this.readOnlyMode && this.isValidValue) {
        this.loadData();
      }
    }
  },
  mounted() {
    // initial notification to the parent
    this.$emit('cropImage', {
      name: this.name,
      fileName: '',
      croppedBlob: null,
      croppedImage: null,
      isValid: !this.isRequired
    });

    if(this.readOnlyMode && this.isValidValue) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      const { name: displayName, croppedImage } = this.value;

      this.selectedFile = {
        displayName,
        croppedImage
      }
    },
    onSelectImage (e) {
      const files = e.target.files;
      const file = files[0];
      const isImageSelected = file && file.type.includes('image');

      if (isImageSelected) {
        const fileReader = new FileReader();
        file.displayName = this.enhanceFileName(file.name);
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
    enhanceFileName(fileName) {
      // animals.sd.png ===> .png
      const extention = this.getFileExtention(fileName);
      const name = fileName.split(extention)[0];
      const displayedName = this.enableFullnameDisplay ? name : name.slice(0, this.maxDisplayNameLength)
      
      return `${displayedName}${extention.toLowerCase()}`;
    },
    getFileExtention(fileName, enableLowerCase = false) {
      const extention = fileName.substring(fileName.lastIndexOf('.'));

      return enableLowerCase ? extention.toLowerCase() : extention;
    },
    onEditSelectedImage() {
      this.showModal = true;
    },    
    onDeleteSelectedImage() {
      this.onReset();
      this.croppedData = {};

      this.error = 'الرجاء التحقق من هذا الحقل',
      this.$emit('cropImage', {
        name: this.name,
        fileName: '',
        croppedBlob: null,
        croppedImage: null,
        isValid: !this.isRequired
      });
    },    
    onUploadImage() {
      this.$refs.imageInput.click();
    },
    onReset (allowResetSelectedFile = true) {
      this.showModal = false;
      this.fileExtention = null;
      this.error = '';
      if(allowResetSelectedFile) {
        this.selectedFile = null;
      }
    },
    onSaveCroppedImage (data) {
      this.onReset(false);

      this.croppedData = data;
      this.$emit('cropImage', {
        name: this.name,
        fileName: this.selectedFile.name,
        croppedBlob: data.croppedBlob,
        croppedImage: data.croppedImage,
        isValid: this.isRequired ? !!Object.keys(data).length : true
      });
      // reset the value of the input 
      this.$refs.imageInput.value = '';
    },
  },
}
</script>

<style scoped>
@import './styles.css';
</style>