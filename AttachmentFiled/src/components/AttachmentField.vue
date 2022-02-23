<template>
  <div class="attachment-wrapper">
    <div class="label-and-input-wrapper">
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

      <label class="file-input-wrapper icon icon-file">
        <span> {{ placeholder }}</span>

        <input
          ref="file"
          class=""
          type="file"
          :multiple="isMultiple"
          :accept="accept"
          @change="onSelectFiles"
        >
      </label>

      <slot
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
              class="img"
              src="../assets/delete.svg"
              @click="onDeleteFile(index)"
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
    resetErrorOnSelect: {
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
    label: {
      type: String,
      default: "",
    },      
    name: {
      type: String,
      default: "",
    },        
    placeholder: {
      type: String,
      default: "",
    },    
    accept: {
      type: String,
      default: "jpg,pdf,png,jpeg",
    },
    excludedExtentions: {
      type: Array,
      default: () => ([
        "zip",
        "exe",
        'png',
        "ZIP",
        "EXE",
        "ZAP",
        "Z01",
        "Z02",
        "Z03",
        "iso",
        "rar",
        "zz",
      ])
    }
  },
  data() {
    return {
      selectedFiles: [],
      currentTotalSize: 0,
      error: ''
    }
  },
  computed: {
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
        [this.name]: this.selectedFiles,
        isValid: this.isRequired ?  !!this.selectedFiles.length : true
      }
    }
  },
  methods: {
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

          if(this.isValidFile(file)) {
            file.displayName = this.enhanceFileName(file.name);
            this.selectedFiles.push(file);
            // update total size
            this.currentTotalSize += file.size;
          }
        }
        // reset field value
        this.$refs.file.value = "";
      }

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
      const enhancedExcludedExtentions = this.excludedExtentions.map(ext => ext.toLowerCase());
      // .ZIP ==> ZIP
      const extention = this.getFileExtention(file.name, true).slice(1);
      const isValidExtention = enhancedExcludedExtentions.includes(extention) === false;
      const isValidSize = this.isValidFileSize(file.size, file.name);

      if(!isValidExtention) {
        this.dispatchError('fileExtention', file.name);
      }

      return isValidExtention && isValidSize;
    },
    getSelectingError(fileName) {
      const { maxFileSizeInMega, maxFilesSizeInMega } = this;

      return {
        maxFileSizeExceeded: ` الملف ${fileName} تجاوز الحد المسموح به  وهو ${maxFileSizeInMega} م.ب`,
        maxFilesSizeExceeded: ` تم تجاوز الحد المسموح به لجميع الملفات وهو ${maxFilesSizeInMega} م.ب`,
        fileExtention: `امتداد الملف ${fileName} غير مسموح به`,
        // maxFileSizeExceeded: ` الملف ${fileName} تجاوز الحد المسموح به  وهو بببببب م.ب`,
      };
    },
    dispatchError(target='', name= '') {
      const error =  this.getSelectingError(name)[target];
      this.error = error;

      this.$emit('error', {
        [this.name]: error
      });
    },
    onDeleteFile(index) {
      this.selectedFiles.splice(index, 1);
      
      // update parent
      this.$emit("select", this.updatedValue);
    },
    // Placeholder for default values
    getAllowedFileTypesText(allowedExtentions) {
      return `نوع الملف يجب أن يكون ${allowedExtentions}`; 
    },
    getAllowedMaxFileSizeText(maxFilesSizeInMega) {
      return `كحد أقصى ${maxFilesSizeInMega} م.ب`;
    },
    getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = sizeInBytes / 1000;

      return `${sizeInKiloByte}KB`;
    }
  },
}
</script>

<style scoped>
.attachment-wrapper {
  /* margin: 50px auto; */
}

.label-and-input-wrapper {
  /* margin: 50px auto; */
}

.label-and-input-wrapper .label {
  color: #02363D;
  font-size: 14px;
  font-family: Almarai, Regular;
  margin-bottom: 10px;
}

.label-and-input-wrapper .label .star {
  margin: 0 2px;
  color: red
}

.label-and-input-wrapper .file-input-wrapper {
  cursor: pointer;
  color: #DBDBDB;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #DBDBDB;
  font-size: 15px;
  padding: 16px;
}

.label-and-input-wrapper .file-input-wrapper input {
  display: none;
}

.label-and-input-wrapper .file-input-wrapper.icon-file::before {
  font-family: icomoon;
  content: "\E946";
  color: #158e8d;
  font-size: 20px;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  top: 25px;
  left: 16px;
  right: unset;
}
/* For UI Place holders */
.hints-placeholder {
  margin-top: 9px;
  margin-bottom: 22px;
  color: #A8A8A8;
  font-size: 12px;
}

.text {
  margin-bottom: 10px;
}

.list-item {
  /* height: 33px; */
  border: 1px solid #DBDBDB;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 11px;
  margin-bottom: 14px;
}

.list-item .icon-name-wrapper,
.list-item .size-delete-wrapper {
  display: flex;
  align-items: center;
}

.list-item .icon-name-wrapper .img,
.list-item .size-delete-wrapper .img {
  width: 18px;
  height: 18px;
}

.list-item .size-delete-wrapper .img {
  cursor: pointer;
}

.list-item .icon-name-wrapper .file-name {
  color: #02363D;
  font-size: 12px;
  margin-right: 23px;
}

.list-item .size-delete-wrapper .size {
  color: #067377;
  font-size: 9px;
  margin-left: 10px;
}

</style>