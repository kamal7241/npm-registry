<template>
    <div class="col-12">
        <div class="Border-Box">
            <div class="row" v-if="status=='Add' || status=='Edit'">
                <div class="col-md-4 col-12" v-if="dataType=='list'">
                    <div class="form-group">
                        <label class="Required" for="reason">السبب</label>
                        <SelectTo v-model="selectToModel"
                                  :Data="this.dataSource"
                                  :isMulti="false"
                                  :isSearchable="false"
                                  :tittle="this.tittle"
                                  label="description"
                                  :showPreserve="true"
                                  :selectedoption="this.value"
                                  @SlectedItems="selctedOption"
                                  :isDisabled="false"></SelectTo>
                    </div>
                </div>
                <div class="col-md-8 col-12" v-if="haveDate">
                    <div class="form-group">
                        <label>تاريخ العلم بالسبب</label>
                        <HGDatePicker @selection-changed="input"></HGDatePicker>
                    </div>
                </div>
                <div class="col-md-9 col-12" v-if="dataType=='text'">
                    <div class="form-group">
                        <label class="Required" for="reason">{{dir ? dir.tellReasonLbl : ""}}</label>
                        <textarea class="form-control"
                                  v-model="reason"
                                  :maxlength="maxReasonTextlength"
                                  @focus="error= false"
                                  rows="8"
                                  @oninput="this.isArabic(this.reason)"></textarea>

                        <span v-if="this.isArabic(this.reason)"
                              class="textarea-counter">{{ maxReasonTextlength - reason.length + dir.counterLbl}}</span>
                        <span v-if="error" class="error-message">{{dir ? dir.invalidReasonLbl : ""}} ❗</span>
                        <span v-if="!this.isArabic(this.reason) " class="error-message">{{ ArabicChar}}</span>
                    </div>
                </div>
                <div class="col-md-9 col-12" v-if="showSecondText && dataType=='list'">
                    <div class="form-group">
                        <label class="Required" for="reason">{{dir ? dir.tellReasonLbl : ""}}</label>
                        <textarea class="form-control"
                                  v-model="reason"
                                  :maxlength="maxReasonTextlength"
                                  @focus="error= false"
                                  rows="8"
                                  @oninput="this.isArabic(this.reason)"></textarea>

                        <span v-if="this.isArabic(this.reason)"
                              class="textarea-counter">{{ maxReasonTextlength - reason.length + dir.counterLbl}}</span>
                        <span v-if="error" class="error-message">{{dir ? dir.invalidReasonLbl : ""}} ❗</span>
                        <span v-if="!this.isArabic(this.reason)" class="error-message">{{ ArabicChar}}</span>
                    </div>
                </div>
                <div class="col-md-3 col-12">
                    <div class="form-group">
                        <label>تحميل ملف</label>

                        <ChooseFile :fileAllowedExtensions="fileAllowedExtensions"
                                    :direction="direction"
                                    :maxSize="maxSize"
                                    fileId="outerfile"
                                    id="uploadCaptureInputFile"
                                    ref="componentRef" />

                        <span class="info-message" v-if="allowedEx && !validateExtension">
                            الملفات المسموح بها {{fileAllowedExtensions}}
                            وحجم الملف {{maxSize}} Mb
                        </span>
                    </div>
                </div>
            </div>
            <div class="row" v-if="status=='Add' || status=='Edit'">
                <div class="col-12 text-center Add-Btn my-2">
                    <button class="btn btn-success" @click="addFile">{{dir ? dir.addButtonLbl : ""}}</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mb-2" v-if="status=='Add' || status=='Edit'">
                    <!-- Reson Counter -->

                    <label v-if="this.fileCount <=0">
                        {{dir ? dir.numberOfReasonsLbl : ""}}
                        {{this.countOfFiles}}
                    </label>

                    <label v-if="this.fileCount>0">سبب {{ this.fileCount }} من {{ this.countOfFiles }}</label>
                </div>
                <!-- Start Tabel View -->
                <div class="col-md-12 mb-2" v-if="!ThereReasons">
                    <div class="NoThereReasons">
                        <span>لا يوجد اسباب</span>
                    </div>
                </div>

                <div class="col-md-12 mb-2" v-if="ThereReasons">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="th-bg">
                                    <th>{{dir.number}}</th>
                                    <th>{{dir.reason}}</th>
                                    <th v-if="(status=='Add'&& haveDate) ">تاريخ العلم بالسبب</th>
                                    <th>{{dir.attachments}}</th>
                                    <th v-if="status!='View' && status!='Preview'">{{dir.delete}}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr :key="index" v-for="(data,index) in newDataSource">
                                    <td>{{index+1}}</td>
                                    <td>{{data.reasonTexts}}</td>
                                    <td v-if="(status=='Add'&& haveDate) ">
                                        {{status!='Add' ?data.reasonDates[index] :data.reasonDates}}
                                    </td>

                                    <td>
                                        <div v-if="status=='View' || status=='Preview'">
                                            <button class="choose-file"
                                                    v-if="data.reasonFiles !=null && data.reasonFiles != '' "
                                                    @click="downlaodPdf(data.reasonFiles)">
                                                <p class="p-class">
                                                    {{data.reasonFiles.name}}
                                                    <i class="fa fa-download" style="font-size:16px"></i>
                                                </p>
                                            </button>

                                            <button class="choose-file"
                                                    v-else-if="data.reasonFileId !=null && data.reasonFileId != '' "
                                                    @click="downlaodUrl(data.reasonFileId)">
                                                <p class="p-class">
                                                    <i class="fa fa-download" style="font-size:16px"></i>
                                                </p>
                                            </button>

                                            <p style="text-align: center;" v-else>{{NoData}}</p>
                                        </div>

                                        <div v-if="status!='View' && status!='Preview'">
                                            <button v-if="data.reasonFiles !=null && data.reasonFiles.name !=null"
                                                    @click="showDeleteFileWithIndex(index,dir.confirmDeleteAttachmentLbl,'JustAttach')"
                                                    class="x-button">
                                                <i class="fa fa-window-close x-class" aria-hidden="true"></i>
                                            </button>

                                            <button class="choose-file"
                                                    v-else-if="data.reasonFileId !=null && data.reasonFileId != '' "
                                                    @click="downlaodUrl(data.reasonFileId)">
                                                <p class="p-class">
                                                    {{data.reasonFileName}}
                                                    <i class="fa fa-download" style="font-size:16px"></i>
                                                </p>
                                            </button>

                                            <div class="choose-file">
                                                <input :accept="fileAllowedExtensions"
                                                       :id="'fileInput' +  index"
                                                       class="choose-file-input"
                                                       type="file"
                                                       ref="file"
                                                       @change="selectFile($event,index)" />

                                                <p @click="inputClick(index)" class="p-class">
                                                    {{
 newDataSource[index].error !=""? newDataSource[index].error :
                          ( newDataSource.length > 0 && newDataSource[index].reasonFiles !=null && newDataSource[index].reasonFiles != '' && newDataSource[index].reasonFiles.name !=null)
                          ? newDataSource[index].reasonFiles.name :
                          (newDataSource.length == 0 || newDataSource[index].reasonFiles != '' || newDataSource[index].reasonFiles.name ==null) ? dir.chooseFileLbl :""
                                                    }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="status!='View' && status!='Preview'">
                                        <button @click="showDeleteFileWithIndex(index,dir.confirmDeleteReasonLbl,'AllReson')">
                                            <i style="color:red" class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- End of Tabel View -->
            </div>

            <v-dialog class="dialog-class" v-model="dialog" width="500">
                <v-card>
                    <div class="dialog-header">{{dir ? dir.confirmTitleLbl : ""}}</div>
                    <div class="dialog-body">
                        <div class="row">
                            <div class="col-12">
                                <p>{{dialogTittle}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <div class="row">
                            <div class="col-12 text-left">
                                <div class="btn btn-success mx-2" @click="deleteRow">{{dir ? dir.confirmLbl : ""}}</div>
                                <div class="btn btn-outline-dark mx-2"
                                     @click="this.cancelDelete">{{dir ? dir.backLbl : ""}}</div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-dialog>
            <div class="row" v-if="status!='View' && status!='Preview'">
                <div class="col-md-12">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox"
                               class="custom-control-input"
                               id="customCheckDisabled1"
                               name="commitment"
                               v-model="checked"
                               @change="onChangeCommitment()" />
                        <label class="custom-control-label"
                               for="customCheckDisabled1">{{this.dir ? this.dir.undertakeLbl : ""}}</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <v-alert dense
                         type="warning"
                         :value="alert"
                         transition="scale-transition">{{dir ? dir.maxSizeLbl : ""}}{{maxSize}}</v-alert>
            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap";
    import "bootstrap/dist/css/bootstrap.min.css";

    import { ChooseFile } from "@t2/choose-file";
    import HGDatePicker from "@t2/hijri-meladi-picker";
    import SelectTo from "@t2/selectto";
    import { saveAs } from "file-saver";

    var moment = require("moment-hijri");

    export default {
        name: "ReasonFileUploader",
        components: {
            ChooseFile,
            HGDatePicker,
            SelectTo
        },
        props: {
            maxReasonTextlength: {
                type: Number,
                default: 256
            },
            fileAllowedExtensions: {
                type: String,
                default: "jpg,pdf,png,jpeg,JPEG,PNG"
            },
            dataType: {
                type: String,
                default: "text"
            },
            dataSource: {
                type: Array,
                default: () => []
            },
            countOfFiles: {
                type: Number,
                default: 5
            },
            direction: {
                type: String,
                default: "rtl"
            },
            maxSize: {
                type: Number,
                default: 10
            },
            haveDate: {
                type: Boolean,
                default: false
            },
            Data: {
                type: Object,
                default: null
            },
            status: {
                type: String,
                default: "Add"
            }
        },
        data() {
            return {
                NoData: "لا توجد مرفقات ",
                fileCount: 0,
                selectDate: "",
                allowedEx: true,
                showSecondText: false,
                selectToModel: "",
                tittle: "أختر",
                value: "",
                dialogTittle: "",
                ArabicChar: "يجب إدخال احرف عربيه فقط",
                DeleteAttachmentLbl: "هل أنت متأكد من حذف السبب",
                delStatus: "",
                dir: {
                    tilteLbl: "طلب أستمرار السير في الدعوى",
                    tellReasonLbl: "أذكر السبب",
                    addButtonLbl: "إضافة",
                    selectLbl: "اختيار",
                    numberOfReasonsLbl: "عدد الأسباب المسموح فيها",
                    number: "الرقم",
                    attachments: "المرفقات",
                    delete: "حذف",
                    undertakeLbl:
                        " أتعهد بتدوين جميع البيانات بشكل صحيح و اتحمل كامل المسؤولية اذا ثبت خلاف ذلك",
                    saveAndContinueLbl: "حفظ واستمرار",
                    cancelLbl: "إلغاء",
                    okLbl: "نعم",
                    confirmLbl: "تأكيد",
                    backLbl: "تراجع",
                    confirmDeleteAttachmentLbl: "هل أنت متأكد من حذف هذا المرفق؟",
                    confirmDeleteReasonLbl:
                        "هل أنت متأكد من حذف السبب مع المرفقات التابعة له؟",
                    chooseFileLbl: "اختر الملف",
                    maxSizeLbl: " حجم الملف كبير أكبر حجم بوحدة الميجابايت هو",
                    invalidFileExtensionLbl: "امتداد الملف غير مسموح",
                    invalidReasonLbl: "لا يمكن إضافة سبب فارغ",
                    counterLbl: "حرف متبقي",
                    confirmTitleLbl: "تأكيد الحذف"
                },
                ar: {},
                en: {},
                alert: false,
                dialog: false,
                ThereReasons: false,
                activeIndex: -1,
                file: "",
                reason: "",
                requestReasonId: null,
                checked: false,
                newDataSource: [],
                validateExtension: false,
                error: false,
                IsmaxSize: false,
                initSize: 0,
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
                    "zz"
                ]
            };
        },
        mounted() {
            this.ar = {
                tilteLbl: "طلب استمرار السير في الدعوى",
                tellReasonLbl: "السبب",
                addButtonLbl: "إضافة",
                selectLbl: "اختيار",
                numberOfReasonsLbl: "عدد الاسباب المسموح فيها",
                number: "الرقم",
                reason: "السبب",
                attachments: "المرفقات",
                delete: "حذف",
                undertakeLbl:
                    " أتعهد بتدوين جميع البيانات بشكل صحيح و اتحمل كامل المسؤولية اذا ثبت خلاف ذلك",
                saveAndContinueLbl: "حفظ واستمرار",
                cancelLbl: "إلغاء",
                okLbl: "نعم",
                confirmLbl: "تأكيد",
                backLbl: "تراجع",
                confirmDeleteAttachmentLbl: "هل انت متأكد من حذف هذا المرفق؟",
                confirmDeleteReasonLbl:
                    "هل انت متأكد من حذف السبب مع المرفقات التابعة له؟",
                chooseFileLbl: "اختر الملف",
                maxSizeLbl: " حجم الملف كبير اكبر حجم بوحدة الميجابايت هو",
                invalidFileExtensionLbl: "امتداد الملف غير مسموح",
                invalidReasonLbl: "لا يمكن اضافة سبب فارغ",
                counterLbl: "حرف متبقي",
                confirmTitleLbl: "تأكيد الحذف"
            };

            this.en = {
                tilteLbl: "Request to continue the proceedings",
                tellReasonLbl: "Reason",
                addButtonLbl: "Add",
                selectLbl: "Select",
                numberOfReasonsLbl: "Number of reasons allowed",
                number: "Number",
                reason: "Reason",
                attachments: "Attachments",
                delete: "Delete",
                undertakeLbl:
                    "I undertake to record all data correctly and assume full responsibility if proven otherwise",
                saveAndContinueLbl: "Save and continue",
                cancelLbl: "Cancel",
                okLbl: "Ok",
                confirmLbl: "Confirm",
                backLbl: "Back",
                confirmDeleteAttachmentLbl:
                    "Are you sure you want to delete this attachment?",
                confirmDeleteReasonLbl:
                    "Are you sure to delete this reason with its attachments?",
                chooseFileLbl: "Choose file",
                maxSizeLbl: "Too large file, Max size in MB is",
                invalidFileExtensionLbl: "Invalid file extension",
                invalidReasonLbl: "Can't add empty reason",
                counterLbl: "remaining characters",
                confirmTitleLbl: "confirm delete"
            };

            this.setDir();
            this.setData();
        },
        created() {
            moment.locale("en");
        },
        watch: {
            Data() {
                this.setData();
            },
            dataSource(val) {
                if (
                    !val.find(function (x) {
                        return x.id == -1;
                    })
                ) {
                    val.push({ id: -1, description: "السبب غير موجود" });
                }
            }
        },
        methods: {
            downlaodPdf(downloadedFile) {
                var downloadLink = document.createElement("a");
                downloadLink.target = "_blank";
                downloadLink.download = downloadedFile.name;

                // convert downloaded data to a Blob
                var blob = new Blob([downloadedFile], { type: "application/pdf" });

                // create an object URL from the Blob
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                // set object URL as the anchor's href
                downloadLink.href = downloadUrl;

                // append the anchor to document body
                document.body.appendChild(downloadLink);

                // fire a click event on the anchor
                downloadLink.click();

                // cleanup: remove element and revoke object URL
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(downloadUrl);
            },
            downlaodUrl(fileId) {
                axios.get("/file/" + fileId, { responseType: "blob" }).then(response => {
                    saveAs(response.data, response.headers.filename);
                });
            },
            cancelDelete() {
                this.delStatus = "";
                this.dialog = false;
            },
            checkFileSize(index) {
                if (this.initSize > this.maxSize * 1024 * 1024) {
                    this.newDataSource[index].error =
                        "حجم الملف اكبر من " + this.maxSize + "Mb";
                    return true;
                } else {
                    return false;
                }
            },
            setData() {
                if (this.Data != null && this.status != "Add") {
                    this.ThereReasons = true;
                    this.newDataSource = [];
                    this.fileCount = this.Data.length;
                    for (var i = 0; i < this.Data.length; i++) {
                        var dataSourceObject = {};
                        dataSourceObject.reasonTexts = this.Data[i].reasonTexts;
                        dataSourceObject.reasonDates = this.Data[i].reasonDates;
                        dataSourceObject.reasonFiles = this.Data[i].reasonFiles;
                        dataSourceObject.reasonFileId = this.Data[i].reasonFileId;
                        dataSourceObject.requestReasonId = this.Data[i].requestReasonId;
                        dataSourceObject.reasonFileName = this.Data[i].reasonFileName;
                        dataSourceObject.reasonId = this.Data[i].reasonId;
                        dataSourceObject.error = "";
                        this.newDataSource.push(dataSourceObject);
                    }
                }
            },
            isArabic(text) {
                var pattern = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|[ ])*$/g;
                var result = pattern.test(text);
                if (!result) {
                    this.reason = this.reason.substring(0, this.reason.length - 1);
                }
                return result;
            },
            input(date) {
                this.selectDate = moment(date).format("iYYYY-iMM-iDD");
            },
            selectFile(fileName, index) {
                if (!fileName.target.files.length) return;
                if (!this.checkValidatFile(fileName.target.files[0].name, index)) return;
                var fileData = fileName.target.files[0];
                this.initSize = this.initSize + fileData.size;
                if (this.checkFileSize(index)) {
                    this.initSize -= fileData.size;
                    return;
                }
                this.newDataSource[index].error = "";
                this.newDataSource[index].reasonFiles = fileData;
                this.newDataSource[index].reasonFileId = "";
                this.$emit("UpdateReson", this.newDataSource);
            },
            checkValidatFile(file, index) {
                var fileEx = file.split(".").pop();
                if (
                    this.fileAllowedExtensions.includes(fileEx) &&
                    !this.notAllowedEx.includes(fileEx)
                ) {
                    this.allowedEx = true;
                    return true;
                } else {
                    this.newDataSource[index].error =
                        "امتداد غير مسموح / الملفات المسموحه" + this.fileAllowedExtensions;
                    return false;
                }
            },
            selctedOption(selectOption) {
                this.$emit("selectItems", selectOption);

                if (selectOption.id != -1) {
                    this.showSecondText = false;
                    this.reason = selectOption.description;
                    this.requestReasonId = selectOption.id;
                } else {
                    this.showSecondText = true;
                    this.reason = '';
                    this.requestReasonId = null;
                }
            },
            addFile() {
                this.error = false;
                if (
                    this.newDataSource.length < this.countOfFiles &&
                    this.reason.replace(/\s/g, "").length > 0 &&
                    (this.dataType == "list" && !this.showSecondText
                        ? true
                        : this.isArabic(this.reason))
                ) {
                    var dataSourceObject = {};
                    dataSourceObject.reasonTexts = this.reason;
                    dataSourceObject.reasonDates = this.selectDate;
                    dataSourceObject.id = this.newDataSource.length + 1;
                    dataSourceObject.reasonFiles = "";
                    dataSourceObject.reasonFileId = "";
                    dataSourceObject.reasonId = null;
                    dataSourceObject.requestReasonId = this.requestReasonId;
                    dataSourceObject.error = "";
                    this.ThereReasons = true;
                    if (document.getElementById("outerfile") != null) {
                        dataSourceObject.reasonFiles = document.getElementById(
                            "outerfile"
                        ).files[0];
                        // document.getElementById("outerfile").remove();
                    }
                    this.newDataSource.push(dataSourceObject);
                    this.$emit("UpdateReson", this.newDataSource);
                    this.reason = "";
                    this.fileCount = this.fileCount + 1;
                    this.$refs.componentRef.deleteFile();
                }
            },
            deleteRow() {
                if (this.activeIndex != null && this.activeIndex > -1) {
                    if (this.delStatus == "JustAttach") {
                        if (this.newDataSource[this.activeIndex].reasonFiles != null) {
                            this.initSize = this.clculatSize(
                                this.newDataSource[this.activeIndex].reasonFiles.size
                            );
                        }

                        this.newDataSource[this.activeIndex].reasonFiles = "";
                        this.dialog = false;
                    } else {
                        if (this.newDataSource[this.activeIndex].reasonFiles != null) {
                            this.initSize -= this.newDataSource[
                                this.activeIndex
                            ].reasonFiles.size;
                        }
                        this.newDataSource.splice(this.activeIndex, 1);
                        this.fileCount = this.fileCount - 1;
                        if (this.fileCount == 0) {
                            this.ThereReasons = false;
                        }
                        this.$emit("UpdateReson", this.newDataSource);
                        this.dialog = false;
                    }
                }
            },
            clculatSize(fileSize) {
                if (this.status == "Edit") {
                    var TotalSize = 0;
                    this.newDataSource.map(item => {
                        TotalSize += item.reasonFiles.size;
                    });

                    return (TotalSize -= fileSize);
                }
                return (this.initSize -= fileSize);
            },
            getDataSource() {
                return this.newDataSource;
            },
            inputClick(index) {
                var fileId = "fileInput" + index;
                document.getElementById(fileId).click();
            },
            onChangeCommitment() {
                this.$emit("getCommitmentValue", this.checked);
            },
            showDeleteFileWithIndex(index, tittle, status) {
                if (!this.dialog) {
                    this.dialog = true;
                    this.dialogTittle = tittle;
                    this.activeIndex = index;
                    this.delStatus = status;
                }
            },
            setDir() {
                this.dir = this.direction == "rtl" ? this.ar : this.en;
            }
        }
    };
</script>

<style>
    @import url("../assets/css/shared-style.css");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css");
</style>