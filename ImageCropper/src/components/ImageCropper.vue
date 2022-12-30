<template>
  <div class="canvas-wrapper">
    <CropperDialog
      v-if="showModal"
      :show="showModal"
      :strings="strings"
      :cropperConfigs="cropperConfigs"
      :selectedImage="imageSrc"
      :fileExtention="fileExtention"
      @close="utils.onReset()"
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
      :onUploadImage="utils.onUploadImage"
      :onEditSelectedImage="utils.onEditSelectedImage"
      :onDeleteSelectedImage="utils.onDeleteSelectedImage"
      name="image-placeholder"
    >
      <div class="input-wrapper">
        <button
          v-if="!previewedSelectedFile"
          :disabled="readOnlyMode"
          :class="['indicator pointer', {selecting: isServerLoading}]"
          @click="utils.onUploadImage"
        >
          <div
            v-if="isServerLoading"
            class="loader-placeholder"
          >
            <img
              src="../assets/loader.svg"
              alt="icon"
              width="30"
              height="30"
            >
          </div>

          {{ strings.chooseFile }}
        </button>

        <svg
          v-else
          class="image-button-placeholder"

          xmlns="http://www.w3.org/2000/svg"
          width="17.122"
          height="20.622"
        >
          <path
            data-name="Path 5611"
            d="M15.56 20.372h-14A1.314 1.314 0 01.25 19.06V1.56A1.314 1.314 0 011.562.25h9.624a.437.437 0 01.309.128l5.249 5.249a.438.438 0 01.128.31V19.06a1.314 1.314 0 01-1.312 1.312zm-14-19.247a.438.438 0 00-.437.438v17.5a.438.438 0 00.437.438h14a.438.438 0 00.437-.437V6.122l-4.993-4.993z"
            fill="var(--layout-primary-color)"
            stroke="var(--layout-primary-color)"
            stroke-width=".5"
          />
        </svg>

        <div class="name-placeholder">
          {{ namePlaceholderText }}
        </div>

        <div
          v-if="previewedSelectedFile"
          class="actions"
        >
          <img
            v-if="!readOnlyMode"
            src="../assets/cancel.svg"
            class="action"
            width="30"
            height="30"
            alt="delete"
            @click="utils.onDeleteSelectedImage()"
          >
          <svg
            v-if="isDownloadAvailable"
            width="25"
            height="25"

            class="action"
            @click="utils.onDownloadSelectedImage"
          >
            <path
              fill="var(--layout-primary-color)"
              d="M4.03 12.03C3.34 12.71 3 13.53 3 14.5S3.34 16.29 4.03 17C4.71 17.66 5.53 18 6.5 18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H6.5C5 20 3.69 19.5 2.61 18.43C1.54 17.38 1 16.09 1 14.58C1 13.28 1.39 12.12 2.17 11.1S4 9.43 5.25 9.15C5.67 7.62 6.5 6.38 7.75 5.43S10.42 4 12 4C13.95 4 15.6 4.68 16.96 6.04C18.32 7.4 19 9.05 19 11C20.15 11.13 21.1 11.63 21.86 12.5C22.37 13.07 22.7 13.71 22.86 14.42C21.82 13.54 20.5 13 19 13C18.89 13 18.79 13 18.68 13C18.62 13 18.56 13 18.5 13H17V11C17 9.62 16.5 8.44 15.54 7.46C14.56 6.5 13.38 6 12 6S9.44 6.5 8.46 7.46C7.5 8.44 7 9.62 7 11H6.5C5.53 11 4.71 11.34 4.03 12.03M20 16H18V20H16L19 23L22 20H20V16Z"
            />
          </svg>
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

    <slot
      v-if="hint"
      name="hints"
    >
      <div class="hints-placeholder">
        {{ hint }}
      </div>
    </slot>

    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      :style="{ display: 'none' }"
      @change="e => utils.onSelectImage(e)"
    >
  </div>
</template>

<script>
import CropperDialog from './CropperDialog.vue';
import { generateUtils } from './utils';

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
    hint: {
      type: String,
      default: ''
    },    
    isRequired: {
      type: Boolean,
      default: false
    },      
    enableDownload: {
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
    exportInitialFieldMeta: {
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
    },
    enableServerSide: {
      type: Boolean,
      default: false
    },
    updateParentWithFileMeta: {
      type: Boolean,
      required: false,
      default: false
    },    
    attachmentTypeId: {
      type: Number,
      default: 0
    },
    uploadCallback: {
      type: Function,
      required: false,
      default: () => {}
    },    
    downloadCallback: {
      type: Function,
      required: false,
      default: () => {}
    },
  },
  data () {
    return {
      showModal: false,
      // imageInput: null,
      selectedFile: null,
      imageSrc: null,
      fileExtention: null,
      error: this.isRequired ? 'هذا الحقل مطلوب' : '',
      croppedData: {},
      isServerLoading: false
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
        serverLoadingText: 'جاري تحميل البيانات ...',
        ...localizations
      };
    },
    croppedImage() {
      const { croppedImage } = this.croppedData;
      
      return croppedImage;
    },
    isValidValue() {
      const { enableServerSide, value } = this;

      if(enableServerSide) {
        return Boolean(value.sharepointId) || false;
      }
      // client side 
      const { name, file } = this.value || {};

      if(name && file) {
        return true
      }

      return false;
    },
    isDownloadAvailable() {
      const { selectedFile, enableDownload, enableServerSide } = this;
      // To minimize compilation process
      if (enableServerSide) {
        return true
      }

      // To be Enhanced: Should not use downloadUrl ----> the fileSource is enough
      const isValidClientSideVerification = (selectedFile && selectedFile.downloadUrl) && enableDownload;

      return isValidClientSideVerification; 
    },
    updatedValue() {
      const { croppedData } = this;

      return {
        name: this.name,
        value: this.parentUpdatedData,
        isValid: this.isRequired ? !!Object.keys(croppedData).length : true
      }
    },
    parentUpdatedData() {
      const { selectedFile, croppedData, enableServerSide, updateParentWithFileMeta } = this;
      /**
       * SelectedFile in: 
       *  - clientSideMode is: instance of File() constructor
       *  - serverSideMode is: { id, attachmentTypeId, contentType, sharepointId, file }
       */
 
      let mutatedSelectedFile = {};

      if(enableServerSide) {
        mutatedSelectedFile = selectedFile ? JSON.parse(JSON.stringify(selectedFile)) : {};
      } else {
        mutatedSelectedFile = {
          fileName: selectedFile ? selectedFile.name : '',
          croppedBlob: croppedData.croppedBlob || null,
          croppedImage: croppedData.croppedImage || null,
        }
      }

      if (selectedFile) {
        if (updateParentWithFileMeta) {
          mutatedSelectedFile.file = enableServerSide ? selectedFile.file : selectedFile;
        } else {
          delete mutatedSelectedFile.file;
        }
      }

      return mutatedSelectedFile
    },
    previewedSelectedFile() {
      const { enableServerSide, selectedFile } = this;
      const serverSideSelectedFile = selectedFile && selectedFile.sharepointId ? selectedFile.file : null;

      return enableServerSide ? serverSideSelectedFile : selectedFile;
    },
    namePlaceholderText() {
      const { previewedSelectedFile, strings, isServerLoading } = this;

      if(isServerLoading) {
        return strings.serverLoadingText;
      }

      return previewedSelectedFile ? previewedSelectedFile.displayName : strings.clickHere;
    },
    utils() {
      return generateUtils(this);
    }
  },
  watch: {
    value() {
      if(this.isValidValue) {
        this.loadData();
      }
    }
  },
  mounted() {
    this.utils.updatePackageVariables();
    // initial notification to the parent
    if(this.exportInitialFieldMeta) {
      this.$emit('cropImage', this.updatedValue);
    }

    if(this.isValidValue) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      const {enableServerSide} = this;

      if (enableServerSide) {
        this.loadServerSideData();
      } else {
        this.loadClientSideData();
      }
    },
    loadClientSideData() {
      const { name: displayName, file: downloadUrl } = this.value;

      this.selectedFile = {
        displayName,
        downloadUrl
      }
    },
    async loadServerSideData() {
      const { selectedFile, value } = this;
      this.isServerLoading = true;  

      const filesNotLoadedYet = selectedFile ? [value].filter(providedValue => [selectedFile].every(file => file.sharepointId !== providedValue.sharepointId)) : [value];
      // because we are using single attachment only 
      const fileToUpload = filesNotLoadedYet[0];
      if(fileToUpload) {
        const fileFromSharepointId = await this.downloadCallback({
          contentType: fileToUpload.contentType,
          sharepointId: fileToUpload.sharepointId,
          encodedSharepointId: btoa(fileToUpload.sharepointId),
          fileGenerator: response => new File([response.data], response.headers.filename, { type: response.headers['content-type'] })
        })

        fileFromSharepointId.displayName = this.utils.enhanceFileName(fileFromSharepointId)

        this.selectedFile = {
          ...fileToUpload,
          file: fileFromSharepointId
        };
      }

      this.isServerLoading = false;
    },
    onSaveCroppedImage(data) {
      const {enableServerSide} = this;

      if (enableServerSide) {
        this.utils.onSaveServerModeCroppedImage(data);
      } else {
        this.utils.onSaveClientModeCroppedImage(data);
      }
    }
  },
}
</script>

<style scoped>
@import './styles.css';
</style>