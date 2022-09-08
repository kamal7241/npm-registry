<template>
  <div class="attachment-wrapper">
    <div class="label-and-input-wrapper">
      <slot
        name="label"
        :data="{err: error}"
      >
        <p
          v-if="label"
          class="label"
          :class="{err: error}"
        >
          {{ label }}
          <span
            v-if="isRequired"
            class="star"
          >*</span>
        </p>
      </slot>

      <div
        v-if="enableFancyPreview && addAttachmentAllowed && !readOnlyMode"
        class="file-input-wrapper"
      >
        <img
          src="../assets/folder.svg"
          alt="icon"
          width="25"
          height="25"
        >

        <span
          v-if="strings.placeholder"
          class="placeholder-wrapper"
        > 
          {{ strings.placeholder }}
        </span>

        <button
          class="file-chooser-action"
          @click="$refs.file.click()"
        >
          {{ strings.actionName }}
        </button>
      </div>

      <div
        v-if="!enableFancyPreview && addAttachmentAllowed && !readOnlyMode"
      >
        <div class="input-wrapper">
          <button
            :disabled="readOnlyMode || isServerLoading"
            class="indicator pointer"
            @click="$refs.file.click()"
          >
            {{ strings.clickHere }}
          </button>

          <div class="name-placeholder">
            {{ strings.chooseFile }}
          </div>
        </div>
      </div>

      <slot
        v-if="isErrorSlotAvailable"
        name="errors"
        :errors="error"
      >
        <div class="error-placeholder">
          <p class="text">
            {{ error }}
          </p>
        </div>
      </slot>

      <slot
        v-if="addAttachmentAllowed && !readOnlyMode"
        name="hints"
        :data="{ hintsData }"
      >
        <div class="hints-placeholder">
          <p class="text">
            {{ utils.getAllowedFileTypesText(accept) }}
          </p>
          <p>{{ utils.getAllowedMaxFileSizeText(maxFilesSizeInMega) }}</p>
        </div>
      </slot>

      <input
        ref="file"
        class=""
        type="file"
        :multiple="isFieldMultiple"
        :accept="accept"
        @change="onSelectFiles"
      >
    </div>

    <slot
      name="list"
      :data="{ listData }"
      :onDeleteFile="utils.onDeleteFile"
    >
      <ul
        v-if="selectedFiles.length"
        class="files-list"
      >
        <li
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="list-item"
        >
          <div class="icon-name-wrapper">
            <img
              class="img"
              src="../assets/file.svg"
            >
            <span class="file-name">{{ file.displayName }}</span>
          </div>

          <div class="size-delete-wrapper">
            <span class="size">{{ utils.getFileSizeInKiloByte(file.size) }}</span>

            <img
              v-if="!readOnlyMode"
              class="img"
              src="../assets/delete.svg"
              @click="utils.onDeleteFile(index)"
            >            
            <img
              v-else
              class="img"
              src="../assets/download.png"
              @click="onDownloadFile(file)"
            >
          </div>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
import { generateUtils } from './utils';

export default {
  name: 'AttachmentField',
  props: {
    maxFileSizeInMega: {          
      type: Number,
      default: 2,
    },
    maxFilesSizeInMega: {          
      type: Number,
      default: 5,
    },
    maxDisplayNameLength: {
      type: Number,
      default: 15,
    },
    maxAttachments: {
      type: Number,
      default: 5,
    },
    isMultiple: {
      type: Boolean,
      default: false
    },        
    enableFancyPreview: {
      type: Boolean,
      default: false
    },       
    resetErrorOnSelect: {
      type: Boolean,
      default: true
    },       
    activateInternalErrorPreview: {
      type: Boolean,
      default: true
    },       
    isRequired: {
      type: Boolean,
      default: false
    },  
    enableFullnameDisplay: {
      type: Boolean,
      default: false
    },    
    validateOnSingleFileSize: {
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
    label: {
      type: String,
      default: "",
    },      
    name: {
      type: String,
      default: "",
    },         
    accept: {
      type: String,
      default: "jpg,pdf,png,jpeg",
    },
    value: {
      type: Array,
      default: () => []
    }, 
    localizations: {
      type: Object,
      default: () => ({})
    },
    enableServerSide: {
      type: Boolean,
      default: false
    },
    serverSideProps: {
      type: Object,
      required: false,
      default: () => ({})
    },
  },
  data() {
    return {
      selectedFiles: [],
      currentTotalSize: 0,
      error: '',
      isServerLoading: false
    }
  },
  computed: {
    isErrorSlotAvailable() {
      return !this.readOnlyMode && this.error && this.activateInternalErrorPreview;
    },
    addAttachmentAllowed() {
      return this.selectedFiles.length < this.maxAttachments;
    },
    hintsData() {
      return {
        maxFileSizeInMega: this.maxFileSizeInMega,
        maxFilesSizeInMega: this.maxFilesSizeInMega,
        allowedExtentions: this.accept
      }
    },    
    listData() {
      return {
        files: this.selectedFiles,
      }
    },
    totalFilesSize() {
      return this.maxFilesSizeInMega * 1024 * 1024;
    },
    updatedValue() {
      return {
        name: this.name,
        value: this.selectedFiles,
        isValid: this.isRequired ?  !!this.selectedFiles.length : true
      }
    },
    strings() {
      const { localizations } = this;

      return {
        placeholder: '',
        clickHere: 'اضغط هنا',
        chooseFile: 'اختر ملف',
        actionName: "استعراض الملفات",
        ...localizations
      };
    },
    isFieldMultiple() {
      const { isMultiple, enableServerSide } = this;

      return enableServerSide ? false : isMultiple; 
    },
    utils() {
      return generateUtils(this)
    }
  },
  watch: {
    value() {
      if(this.value.length) {
        this.loadData();
      } else {
        this.selectedFiles = [];
      }
    }
  },
  mounted() {
    // initial notification to the parent
    if(this.exportInitialFieldMeta) {
      this.$emit("select", this.updatedValue);
    }

    if(this.value.length) {

      const {enableServerSide} = this;

      if (enableServerSide) {
        this.loadServerSideData();
      } else {
        this.loadData();
      }
    }
  },
  methods: {
    async loadData() {
      this.selectedFiles = await this.value.reduce(async (memo, file, index) => {
        const results = await memo;
        let generatedFile= {};
        // Don't load more than max attachments if fullfilled
        const isValidIteration = this.maxAttachments >= index + 1

        if(isValidIteration) {
           generatedFile = await this.utils.base64ToFilesConverter(file);
        }
        return isValidIteration ? [...results, generatedFile] : results;
      }, []);
    },
    async loadServerSideData() {
      this.isServerLoading = true;
      // Todo: Load from server and block upload button untill done
      this.isServerLoading = false
    },
    async onSelectFiles(e) {
      if(this.enableServerSide) {
        this.isServerLoading = true;

        const files = e.target.files;
        const selectedFile = files[0];
        
        if(this.resetErrorOnSelect && this.error) {
          this.dispatchError();
        }

        if(this.utils.isValidFile(selectedFile)) {
          const constructedAttachment = {
            id: 0,

          };
          selectedFile.displayName = this.utils.enhanceFileName(selectedFile.name);
          const base64Meta = await this.convertFileToBase64(selectedFile);
          
          if('base64' in base64Meta) {
            const { appName, uploadCallback, systemCode } = this.serverSideProps;
            const sharepointId = await uploadCallback(base64Meta);

            this.selectedFiles = this.isMultiple ? 
          }

          // check if the converted based64 inside the response (To continue uploading)

          // contentType: application/pdf,
          // sharepointId: T4EXn0DS622UlhCxRKeOuYDFIFDDjRxPiGc8nq85CSU4H4GeLwEJHs+Zq54045raW5vvvvaYpyw=,

          // this.selectedFiles = [selectedFile];
        }

        // this.isServerLoading = false;
      } else {
        this.utils.onClientSideSelect(e)
      }
    },
    convertFileToBase64(file) {

      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const source = reader.result;
            const base64 = source.split(',')[1];
            const contentType = source.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]

            resolve({
              source,
              base64,
              contentType
            })
          };
          reader.onerror = error => reject(error);
      })
    }
  },
}
</script>

<style scoped>
@import './style.css';
</style>