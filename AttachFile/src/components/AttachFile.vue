<template>
  <div class="Attachment">
    <button @click="$refs.file.click()" id="upfiles">
      تحميل المرفقات
      <i class="fa fa-upload" aria-hidden="true"></i>
    </button>
    <div class="attachments-box">
      <input
        type="file"
        ref="file"
        multiple
        @change="filesChange($event); fileCount = $event.target.files.length"
        id="files1"
        style="opacity: 0"
      />

      <div class="item" v-for="item in uploadedFiles" :key="item.name">
        <label>{{item.name}}</label>
        <i aria-hidden="true" class="fa fa-window-close remove-item" @click="deleteFile(item)"></i>
      </div>
    </div>

    <p
      v-if="this.allowedEx && !this.maxSize"
      class="info-message"
    >الملفات المسموح بها {{fileExtinstion}} وحجم الملف {{maximumSize}} Mb</p>
    <span
      class="info-message"
      style="color:red;font-weight:bold"
      v-if="this.maxSize && this.allowedEx"
    >
      حجم الملف تجاوز ال {{maximumSize}}
      Mb
    </span>
    <span class="info-message" style="color:red;font-weight:bold" v-if="!this.allowedEx">
      &nbsp;&nbsp;
      <u>{{fileExtinstion}}</u>
      &nbsp;&nbsp; امتداد الملف غير مسموح به
      الملفات المسموح بها
    </span>
  </div>
</template>
<script>
export default {
  name: "AttachFile",
  data() {
    return {
      uploadFieldName: "Files",
      uploadedFiles: [],
      maxSize: false,
      initSize: 0,
      allowedEx: true
    };
  },
  props: ["maximumSize", "fileExtinstion", "UploadSingle", "isSingle"],
  methods: {
    filesChange(fileName) {
      if (!fileName.target.files.length) return;
      if (!this.checkValidatFile(fileName.target.files[0].name)) return;
      var fileData = fileName.target.files[0];
      this.initSize += fileData.size;
      if (this.checkFileSize()) {
        this.initSize -= fileData.size;
        return;
      }
      if (!this.isSingle) {
        this.uploadedFiles.push(fileData);
      } else {
        this.uploadedFiles = [];
        this.uploadedFiles.push(fileData);
        this.singleMsg = false;
      }
      this.$emit("FilesArray", this.uploadedFiles);
    },
    checkFileSize() {
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
      this.checkFileSize();
      this.$emit("FilesArray", this.uploadedFiles);
    },
    checkValidatFile(file) {
      var fileEx = file.split(".").pop();
      if (this.fileExtinstion.includes(fileEx)) {
        this.allowedEx = true;
        return true;
      } else {
        this.allowedEx = false;
        return false;
      }
    }
  }
};
</script>

