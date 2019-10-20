<template>
  <div>
    <div class="choose-file">
      <button @click="deleteFileDialog = true" :disabled="myfile.length == 0" class="x-button" v-if="ThereFile"> 
        <i class="fa fa-window-close x-class" aria-hidden="true"></i>
      </button>
      <v-dialog class="dialog-class" v-model="deleteFileDialog" width="500">
        <v-card>
          <div class="dialog-header">{{dir ? dir.confirmTitleLbl : ""}}</div>
          <div class="dialog-body">
            <div class="row">
              <div class="col-12">
                <p>{{dir ? dir.confirmDeleteAttachmentLbl : ""}}</p>
              </div>
            </div>
          </div>
          <div class="dialog-footer">
            <div class="row">
              <div class="col-12 text-left">
                <button
                  class="btn btn-success mx-2"
                  @click="deleteFile()"
                >{{dir ? dir.confirmLbl : ""}}</button>
                <button
                  class="btn btn-outline-dark mx-2"
                  @click="deleteFileDialog = false"
                >{{dir ? dir.backLbl : ""}}</button>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <input
        :accept="fileAllowedExtensions"
        :id="fileId"
        class="choose-file-input"
        type="file"
        ref="file"
        @change="pickFile($event)"
      />
      <p
        class="p-class"
        @click="$refs.file.click()"
      >{{myfile.length == 0 ?dir.chooseFileLbl :pickedfileName}}</p>
    </div>
    <v-dialog class="dialog-class" v-model="validateFileDialog" width="500">
      <v-card>
        <div class="dialog-header"></div>
        <div class="dialog-body">
          <div class="row">
            <div class="col-12">
              <v-card-text v-if="isValidExtension">{{dir ? dir.invalidFileExtensionLbl : ""}}</v-card-text>
              <v-card-text v-else>{{dir ? dir.maxSizeLbl : ""}} {{maxSize}}</v-card-text>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <div class="row">
            <div class="col-12 text-left">
              <div
                class="btn btn-outline-dark mx-2"
                @click="validateFileDialog = false"
              >{{dir ? dir.cancelLbl : ""}}</div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "ChooseFile",
  props: {
    fileId: {
      type: String,
      default: "myId"
    },
    fileAllowedExtensions: {
      type: String,
      default: ".jpg,.pdf,.png,.jpeg,.JPEG,.PNG"
    },
    maxSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      isValidExtension: false,
      deleteFileDialog: false,
      validateFileDialog: false,
      ThereFile: false,
      dir: {
        cancelLbl: "الغاء",
        okLbl: "نعم",
        confirmLbl: "تأكيد",
        backLbl: "تراجع",
        confirmDeleteAttachmentLbl: "هل انت متأكد من حذف هذا المرفق؟",
        chooseFileLbl: "اختر الملف",
        maxSizeLbl: " حجم الملف كبير اكبر حجم بوحدة الميجابايت هو",
        invalidFileExtensionLbl: "امتداد الملف غير مسموح",
        confirmTitleLbl: "تأكيد الغاء الطلب"
      },
      ar: {},
      en: {},
      myfile: "",
      pickedfileName: ""
    };
  },
  mounted() {
    this.ar = {
      cancelLbl: "الغاء",
      okLbl: "نعم",
      confirmLbl: "تأكيد",
      backLbl: "تراجع",
      confirmDeleteAttachmentLbl: "هل انت متأكد من حذف هذا المرفق؟",
      chooseFileLbl: "اختر الملف",
      maxSizeLbl: " حجم الملف كبير اكبر حجم بوحدة الميجابايت هو",
      invalidFileExtensionLbl: "امتداد الملف غير مسموح",
      confirmTitleLbl: "تأكيد الغاء الطلب"
    };

    this.en = {
      cancelLbl: "Cancel",
      okLbl: "Ok",
      confirmLbl: "Confirm",
      backLbl: "Back",
      confirmDeleteAttachmentLbl:
        "Are you sure you want to delete this attachment?",
      chooseFileLbl: "Choose file",
      maxSizeLbl: "Too large file, Max size in MB is",
      invalidFileExtensionLbl: "Invalid file extension",
      confirmTitleLbl: "confirm order cancellation"
    };
  },
  methods: {
    pickFile(fileName) {
      if (!fileName.target.files.length) return;
      if (!this.checkValidatFile(fileName.target.files[0].name)) return;
      var fileData = fileName.target.files[0];
      if (this.checkFileSize(fileData.size)) return;
      this.myfile = fileData;
      this.pickedfileName = fileData.name;
      this.$emit("selectFile", fileData);
      this.ThereFile = true;
    },
    checkValidatFile(file) {
      var fileEx = file.split(".").pop();
      if (this.fileAllowedExtensions.includes(fileEx)) {
        return true;
      } else {
        this.isValidExtension = true;
        this.validateFileDialog = true;
        return false;
      }
    },

    checkFileSize(fileSize) {
      if (fileSize > this.maxSize * 1024 * 1024) {
        this.isValidExtension = false;
        this.validateFileDialog = true;
        return true;
      } else {
        return false;
      }
    },

    deleteFile() {
      this.deleteFileDialog = false;
      this.myfile = "";
      this.pickedfileName = "";
      this.ThereFile = false;
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/shared-style.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css");
</style>