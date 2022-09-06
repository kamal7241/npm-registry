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
            :disabled="readOnlyMode"
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
            {{ getAllowedFileTypesText(accept) }}
          </p>
          <p>{{ getAllowedMaxFileSizeText(maxFilesSizeInMega) }}</p>
        </div>
      </slot>

      <input
        ref="file"
        class=""
        type="file"
        :multiple="isMultiple"
        :accept="accept"
        @change="onSelectFiles"
      >
    </div>

    <slot
      name="list"
      :data="{ listData }"
      :onDeleteFile="onDeleteFile"
    >
      <ul v-if="selectedFiles.length">
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
            <span class="size">{{ getFileSizeInKiloByte(file.size) }}</span>

            <img
              v-if="!readOnlyMode"
              class="img"
              src="../assets/delete.svg"
              @click="onDeleteFile(index)"
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

  },
  data() {
    return {
      selectedFiles: [],
      currentTotalSize: 0,
      error: ''
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
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      this.selectedFiles = await this.value.reduce(async (memo, file, index) => {
        const results = await memo;
        let generatedFile= {};
        const isValidIteration = this.maxAttachments >= index + 1

        if(isValidIteration) {
           generatedFile = await this.base64ToFilesConverter(file);
        }
        return isValidIteration ? [...results, generatedFile] : results;
      }, []);
     
    },
    base64ToFilesConverter(file) {
      return new Promise((resolve) => {
          fetch(file.baseFile)
          .then((res) => res.blob())
          .then((blob) => {
            const createdFileExtention = file.baseFile.split(';')[0].split(':')[1];
            const createdFileName = `${file.name}.${createdFileExtention.split('/')[1]}`;
            const createdFile = new File([blob], file.name, { type: createdFileExtention });

            createdFile.displayName = this.enhanceFileName(createdFileName);

            resolve(createdFile)
          })

      });
    },
    onSelectFiles(e) {
      const files = e.target.files;
      const firstFile = files[0];

      if(this.resetErrorOnSelect && this.error) {
        this.dispatchError();
      }
    
      if(!this.isMultiple && this.isValidFile(firstFile)) {
        firstFile.displayName = this.enhanceFileName(firstFile.name);
        this.selectedFiles = [firstFile];
      }

      if(this.isMultiple) {
        for(let i = 0; i < files.length; i++) {
          const file = files[i];

          if(this.addAttachmentAllowed && this.isValidFile(file)) {
            file.displayName = this.enhanceFileName(file.name);
            this.selectedFiles.push(file);
            // update total size
            this.currentTotalSize += file.size;
          }
        }
      }
      // reset field value
      this.$refs.file.value = "";

      this.$emit("select", this.updatedValue);
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
    getFileSizeInBytes(size) {
      return size * 1024 * 1024;
    },
    isValidFileSize(fileSize, fileName) {
      const isValidSizeLimit = fileSize <= this.getFileSizeInBytes(this.maxFileSizeInMega);

      const isValidCurrentSize = this.validateOnSingleFileSize ? isValidSizeLimit : true;
      const isValidWithTotalSize = (this.currentTotalSize + fileSize) <= this.getFileSizeInBytes(this.maxFilesSizeInMega);

      if(!isValidCurrentSize) {
        this.dispatchError('maxFileSizeExceeded', fileName);
      }      
      
      if(!isValidWithTotalSize) {
        this.dispatchError('maxFilesSizeExceeded');
      }

      return isValidCurrentSize && isValidWithTotalSize;
    },
    isValidFile(file) {
      const enhancedAcceptedExtentions = this.accept.toLowerCase();
      // .ZIP ==> ZIP
      const extention = this.getFileExtention(file.name, true).slice(1);
      const isValidExtention = enhancedAcceptedExtentions.includes(extention);
      const isValidSize = this.isValidFileSize(file.size, file.name);

      if(!isValidExtention) {
        return this.dispatchError('fileExtention', file.name);
      } 

      return isValidExtention && isValidSize;
    },
    getSelectedError(fileName) {
      const { maxFileSizeInMega, maxFilesSizeInMega } = this;

      return {
        fieldIsRequired: 'هذا الحقل مطلوب',
        maxFileSizeExceeded: ` الملف ${fileName} تجاوز الحد المسموح به  وهو ${maxFileSizeInMega} م.ب`,
        maxFilesSizeExceeded: ` تم تجاوز الحد المسموح به لجميع الملفات وهو ${maxFilesSizeInMega} م.ب`,
        fileExtention: `امتداد الملف ${fileName} غير مسموح به`,
      };
    },
    dispatchError(target='', name= '') {
      const error =  this.getSelectedError(name)[target];
      this.error = error;

      this.$emit('error', {
        name: this.name,
        error
      });
    },
    onDeleteFile(index) {
      const file = this.selectedFiles[index];
      this.selectedFiles.splice(index, 1);
      
      if(!this.selectedFiles.length && this.isRequired) {
        this.dispatchError('fieldIsRequired');
      }

      // update total size
      this.currentTotalSize -= file.size;

      // update parent
      this.$emit("select", this.updatedValue);
    },
    
    generateFileDownloadUrl(url, name) {
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
    },

    onDownloadFile(file) {
      const { baseFile, downloadUrl, name } = file;
      if (baseFile) {
        fetch(baseFile)
          .then((res) => res.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            this.generateFileDownloadUrl(url, name);
          });
      } else if (downloadUrl) {
        this.generateFileDownloadUrl(downloadUrl, name);
      } else {
        const url = window.URL.createObjectURL(file);
        this.generateFileDownloadUrl(url, name);
      }
      // console.log('onDownloadFile',file);
    },
    // Placeholder for default values
    getAllowedFileTypesText(allowedExtentions) {
      return `نوع الملف يجب أن يكون ${allowedExtentions}`; 
    },
    getAllowedMaxFileSizeText(maxFilesSizeInMega) {
      return `كحد أقصى ${maxFilesSizeInMega} م.ب`;
    },
    getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = parseFloat(sizeInBytes / 1024).toFixed(2);

      return `${sizeInKiloByte} ك.ب`;
    }
  },
}
</script>

<style scoped>
@import './style.css';
</style>