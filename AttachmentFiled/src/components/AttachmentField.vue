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
            :class="['indicator pointer', {selecting: isServerLoading}]"
            @click="$refs.file.click()"
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
            {{ strings.clickHere }}
          </button>

          <div class="name-placeholder">
            {{ isServerLoading ? strings.serverLoadingText : strings.chooseFile }}
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
          v-for="(selectedFile, index) in selectedFiles"
          :key="index"
          class="list-item"
        >
          <div class="icon-name-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.122"
              height="20.622"
            >
              <path
                data-name="Path 5611"
                d="M15.56 20.372h-14A1.314 1.314 0 01.25 19.06V1.56A1.314 1.314 0 011.562.25h9.624a.437.437 0 01.309.128l5.249 5.249a.438.438 0 01.128.31V19.06a1.314 1.314 0 01-1.312 1.312zm-14-19.247a.438.438 0 00-.437.438v17.5a.438.438 0 00.437.438h14a.438.438 0 00.437-.437V6.122l-4.993-4.993z"
                fill="var(--package-primary-color)"
                stroke="var(--package-primary-color)"
                stroke-width=".5"
              />
            </svg>
            <span class="file-name">{{ enableServerSide ? selectedFile.file.displayName : selectedFile.displayName }}</span>
          </div>

          <div class="size-delete-wrapper">
            <span class="size">{{ utils.getFileSizeInKiloByte(enableServerSide ? selectedFile.file.size : selectedFile.size) }}</span>

            <img
              v-if="!readOnlyMode"
              class="img"
              src="../assets/delete.svg"
              @click="utils.onDeleteFile(index)"
            > 

            <svg
              v-if="isDownloadAvailable"
              class="img"
              @click="utils.onDownloadFile(enableServerSide ? selectedFile.file : selectedFile)"
            >
              <path
                fill="var(--package-primary-color)"
                d="M4.03 12.03C3.34 12.71 3 13.53 3 14.5S3.34 16.29 4.03 17C4.71 17.66 5.53 18 6.5 18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H6.5C5 20 3.69 19.5 2.61 18.43C1.54 17.38 1 16.09 1 14.58C1 13.28 1.39 12.12 2.17 11.1S4 9.43 5.25 9.15C5.67 7.62 6.5 6.38 7.75 5.43S10.42 4 12 4C13.95 4 15.6 4.68 16.96 6.04C18.32 7.4 19 9.05 19 11C20.15 11.13 21.1 11.63 21.86 12.5C22.37 13.07 22.7 13.71 22.86 14.42C21.82 13.54 20.5 13 19 13C18.89 13 18.79 13 18.68 13C18.62 13 18.56 13 18.5 13H17V11C17 9.62 16.5 8.44 15.54 7.46C14.56 6.5 13.38 6 12 6S9.44 6.5 8.46 7.46C7.5 8.44 7 9.62 7 11H6.5C5.53 11 4.71 11.34 4.03 12.03M20 16H18V20H16L19 23L22 20H20V16Z"
              />
            </svg>
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
    isDownloadAvailable() {
      const { readOnlyMode, enableServerSide } = this;
      
      return readOnlyMode || enableServerSide
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
        value: this.parentUpdatedData,
        isValid: this.isRequired ?  !!this.selectedFiles.length : true
      }
    },
    parentUpdatedData() {
      const { selectedFiles, enableServerSide, updateParentWithFileMeta } = this;

      if (!enableServerSide || (enableServerSide && updateParentWithFileMeta)) {
        return selectedFiles;
      }
      // Deep clone
      const mutatedSelectedFiles = JSON.parse(JSON.stringify(selectedFiles));
      
      return mutatedSelectedFiles.map(enhancedFile => {
        delete enhancedFile.file;

        return enhancedFile;
      })
    },
    strings() {
      const { localizations } = this;

      return {
        placeholder: '',
        clickHere: 'اضغط هنا',
        chooseFile: 'اختر ملف',
        actionName: "استعراض الملفات",
        serverLoadingText: 'جاري تحميل البيانات ...',
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
    value(newVal, oldVal) {
      if(this.value.length && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.loadData();
      } else if (!this.value.length) {
        this.selectedFiles = [];
        this.currentTotalSize = 0;
      }
    }
  },
  mounted() {
    this.utils.updatePackageVariables();
    // initial notification to the parent
    if(this.exportInitialFieldMeta) {
      this.$emit("select", this.updatedValue);
    }

    if(this.value.length) {
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
    async loadClientSideData() {
      this.selectedFiles = await this.value.reduce(async (memo, file, index) => {
        const results = await memo;
        let generatedFile= {};
        // Don't load more than max attachments if fullfilled
        const isValidIteration = this.maxAttachments >= index + 1

        if(isValidIteration) {
          const convertedFile = await this.utils.base64ToFilesConverter(file);

          // check if file matches ( size, totalFilesSize)
          if(this.utils.isValidFile(convertedFile)) {
            generatedFile = convertedFile;
            this.currentTotalSize += convertedFile.size;
          }
        }

        return isValidIteration ? [...results, generatedFile] : results;
      }, []);
    },
    async loadServerSideData() {
      const { selectedFiles, value } = this;
      this.isServerLoading = true;
      // Todo: Load from server and block upload button untill done
      const filesNotLoadedYet = selectedFiles.length ? value.filter(providedValue =>  selectedFiles.every(file => file.sharepointId !== providedValue.sharepointId)) : value; 

      if(filesNotLoadedYet.length) {
        const enhancedExtraFiles = await filesNotLoadedYet.reduce(async (memo, file, index) => {
        const results = await memo;

        // downloadCallback
        let generatedFile= {};
          // Don't load more than max attachments if fullfilled
          const isValidIteration = this.maxAttachments >= index + 1;

          if(isValidIteration) {
            const fileFromSharepointId = await this.downloadCallback({
              contentType: file.contentType,
              sharepointId: file.sharepointId,
              encodedSharepointId: btoa(file.sharepointId),
              fileGenerator: response => new File([response.data], response.headers.filename, { type: response.headers['content-type'] })
            });
            
            fileFromSharepointId.displayName = this.utils.enhanceFileName(fileFromSharepointId); 

            // check if file matches ( size, totalFilesSize)
            if(this.utils.isValidFile(fileFromSharepointId)) {
              generatedFile = {
                ...file,
                file: fileFromSharepointId
              };
              this.currentTotalSize += fileFromSharepointId.size;
            }
          }

          return isValidIteration ? [...results, generatedFile] : results;
        }, [])
        this.selectedFiles = this.selectedFiles.concat(enhancedExtraFiles);
      }
      this.isServerLoading = false;
    },
    async onSelectFiles(e) {
      if(this.enableServerSide) {
        this.utils.onServerSideSelect(e)
      } else {
        this.utils.onClientSideSelect(e)
      }
    },
  },
}
</script>

<style scoped>
@import './style.css';
</style>