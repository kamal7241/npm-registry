<template>
  <div class="V2">
    <div class="form-group">
      <div v-if="uploadedFiles.length > 0">
        <div
          v-for="item in uploadedFiles"
          :key="item.name"
        >
          <i
            v-if="status == 'Add' || status == 'Edit'"
            :disabled="isDisabled"
            aria-hidden="true"
            class="Form__fieldWrapper icon icon-close"
            @click="deleteFile(item)"
          />
        </div>
      </div>

      <div
        v-if="uploadedFiles.length == 0 && (status == 'Add' || status == 'Edit')"
        class="Form__fieldWrapper icon icon-file"
      />

      <label
        v-if="status == 'Add' || status == 'Edit'"
        :class="{ 'input__upload input__field input__field--big input__field--noTop input__upload--fill': uploadedFiles.length > 0}"
        class="input__upload input__field input__field--big input__field--noTop"
      >
        <div v-if="uploadedFiles.length > 0">
          <div
            v-for="item in uploadedFiles"
            :key="item.name"
          >
            <span>{{ item.name }} </span>
          </div>
        </div>
        <div v-else>
          <span> اختر الملف </span>
        </div>
        <input
          v-if="(status == 'Add' || status == 'Edit')"
          id="files1"
          ref="file"
          :disabled="(isDisabled || uploadedFiles.length > 0)"
          type="file"
          :multiple="isSingle"
          style="opacity: 0"
          :accept="allowedFileExtentions()"
          @change="filesChange($event); fileCount = $event.target.files.length;"
        >
      </label>

      <div v-if="status == 'Add' || status == 'Edit'">
        <small
          v-if="this.allowedEx && !this.maxSize && this.maxFileSize > 0"
          class="small form-text text-muted"
        >
          الملفات المسموح بها{{ fileAllowedExtensions }}وحجم الملف{{
            maxFileSize }}Mb</small>
        <small
          v-if="this.maxSize && (maxFileSize > 0|| maximumSize > 0)"
          class="small form-text text-muted"
        >حجم
          الملف تجاوز ال {{ maxFileSize }}
          Mb</small>
        <small
          v-if="!this.allowedEx"
          class="small form-text text-muted"
        >{{ fileAllowedExtensions }} امتداد الملف
          غير مسموح به الملفات المسموح بها</small>
      </div>
    </div>

    <div
      v-if="status != 'Add' && status != 'Edit' && uploadedFiles.length > 0"
      class="card mb-2"
    >
      <div class="card-body">
        <h5 class="card-title mb-1 d-flex flex-md-row align-items-center justify-content-between">
          <strong class="h5 mb-0 font-weight-bold">{{ title }}</strong>
        </h5>
        <div class="card-btns mt-3">
          <div
            v-for="item in uploadedFiles"
            :key="item.name"
          >
            <a
              class="btn btn-sm btn-primary px-2"
              style="font-size: 16px"
              @click="downloadFile(item.id)"
            >تحميل
              الملف</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { saveAs } from "file-saver";
  import axios from "axios";

  export default {
    name: "AttachFile",
    props: {
      maxFileSize: {
          type: Number,
          default: 0,
      },
      attachmentsNumber: {
          type: Number,
          default: 1,
      },
      maximumSize: {
          type: Number,
          default: 0,
      },
      fileAllowedExtensions: {
          type: String,
          default: "jpg,pdf,png,jpeg",
      },
      isSingle: {
          type: Boolean,
          default: false,
      },
      isDisabled: {
          type: Boolean,
          default: false,
      },
      status: {
          type: String,
          default: "Add",
      },
      dataSource: {
          type: Array,
          default: () => [],
      },
      axiosInstance:{
          type: axios,
          default: null
      },
      title: {
          type: String,
          default: "",
      },
    },
    data() {
      return {
        uploadFieldName: "Files",
        uploadedFiles: [{}, {}, {}],
        maxSize: false,
        initSize: 0,
        allowedEx: true,
        notAllowedEx: [
            "zip",
            "exe",
            "ZIP",
            "EXE",
            "ZAP",
            "Z01",
            "Z02",
            "Z03",
            "iso",
            "rar",
            "zz",
        ],
      };
    },
    watch: {
        dataSource() {
            this.setData();
        },
    },
    mounted() {
      this.setData();
    },
    methods: {
      filesChange(fileName) {
          if (!fileName.target.files.length) return;
          var numberOfFilesToPush = Math.min(
              this.attachmentsNumber,
              fileName.target.files.length
          );

          if (this.uploadedFiles.length < this.attachmentsNumber) {
              for (var i = 0; i < numberOfFilesToPush; i++) {
                  if (!this.checkValidatFile(fileName.target.files[i].name)) return;
                  var fileData = fileName.target.files[i];
                  if (this.maxFileSize > 0) {
                      if (this.checkFileSize(fileData.size)) {
                          return;
                      }
                  }

                  if (this.maximumSize > 0) {
                      this.initSize += fileData.size;
                      if (this.checkTotalFilesSize()) {
                          this.initSize -= fileData.size;
                          return;
                      }
                  }
              }

              for (var i = 0; i < numberOfFilesToPush; i++) {
                  this.uploadedFiles.push(fileName.target.files[i]);
              }
          }
          this.$emit("FilesArray", this.uploadedFiles);
      },
      checkFileSize(filesize) {
          if (filesize > this.maxFileSize * 1024 * 1024) {
              this.maxSize = true;
              return true;
          } else {
              this.maxSize = false;
              return false;
          }
      },
      checkTotalFilesSize() {
          if (this.initSize > this.maximumSize * 1024 * 1024) {
              this.maxSize = true;
              return true;
          } else {
              this.maxSize = false;
              return false;
          }
      },
      deleteFile(item) {
          let index = this.uploadedFiles.indexOf(item);
          if (index > -1) {
              this.uploadedFiles.splice(index, 1);
              this.initSize = this.initSize - item.size;
          }
          if (this.maximumSize > 0) {
              this.checkTotalFilesSize();
          }
          this.$refs.file.value = "";
          this.$emit("FilesArray", this.uploadedFiles);
      },
      checkValidatFile(file) {
          var fileEx = file.split(".").pop();
          if (
              this.fileAllowedExtensions.includes(fileEx.toLowerCase()) &&
              !this.notAllowedEx.includes(fileEx)
          ) {
              this.allowedEx = true;
              return true;
          } else {
              this.allowedEx = false;
              return false;
          }
      },
      setData() {
        const files = this.dataSource;
        console.log('setData', files);
        if (files && this.status != "Add") {
          this.isSingle = false;
          this.uploadedFiles = [];

          for (let i = 0; i < files.length; i++) {
            const { id, name, size } = files[i];
            
            this.initSize += files[i].size;
            // push a file
            this.uploadedFiles.push({ id, name, size });
          }
        }
      },
      downloadFile(fileId) {
          const baseUrl = '';
          this.axiosInstance
              .get(baseUrl.concat("file/", fileId), {
                  responseType: "blob",
              })
              .then((response) => {
                  saveAs(response.data, response.headers.filename);
              });
      },
      allowedFileExtentions() {
        // All it does is to convert 
        // "jpg,pdf,png,jpeg" to .jpg,.pdf,.png,.jpeg
        var extentions = this.fileAllowedExtensions.split(",");

        for (let i = 0; i < extentions.length; i++) {
          const isFirstCharIsDot = extentions[i][0] === ".";

          if (!isFirstCharIsDot) {
            extentions[i] = "." + extentions[i];
          }
        }

        return extentions.join(",");
      },
      showUplodeFile() {
        if(this.uploadedFiles && this.attachmentsNumber === this.uploadedFiles.length) {
            return false;
        }else if(this.isSingle && this.uploadedFiles &&  this.uploadedFiles.length === 1 ){
            return false;
        }else{
            return true;
        }
      }
    },
  };
</script>
