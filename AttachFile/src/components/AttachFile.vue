<template>
    <div>
        <div class="Attachment">
            <div class="attachments-box">
                <input v-if="status=='Add' || status=='Edit'"
                       :disabled="isDisabled"
                       type="file"
                       ref="file"
                       multiple
                       @change="filesChange($event); fileCount = $event.target.files.length"
                       id="files1"
                       style="opacity: 0"
                       :accept="allowedFileExtentions()" />
                <div class="item" v-for="item in uploadedFiles" :key="item.name">
                    <label class="fileLabel">{{item.name}}</label>
                    <i v-if="status=='Add' || status=='Edit'"
                       :disabled="isDisabled"
                       aria-hidden="true"
                       class="close-icon"
                       @click="deleteFile(item)"></i>
                    <div v-if="status!='Add'">
                        <i @click="downloadFile(item.id)" class="fa fa-download" style="font-size:16px"></i>
                    </div>
                </div>
            </div>
            <button v-if="status=='Add' || status=='Edit'"
                    :disabled="isDisabled"
                    @click="$refs.file.click()"
                    id="upfiles"
                    title="تحميل المرفقات">
                <i class="fa fa-upload" aria-hidden="true"></i>
            </button>
        </div>
        <div class="AttachmentNote" v-if="status=='Add' || status=='Edit'">
            <p v-if="this.allowedEx && !this.maxSize"
               class="info-message">الملفات المسموح بها{{fileAllowedExtensions}}وحجم الملف{{maximumSize}}Mb</p>
            <span class="info-message"
                  style="color:red;font-weight:bold"
                  v-if="this.maxSize && this.allowedEx">
                حجم الملف تجاوز ال {{maximumSize}}
                Mb
            </span>
            <span class="info-message" style="color:red;font-weight:bold" v-if="!this.allowedEx">
                &nbsp;&nbsp;
                <u>{{fileAllowedExtensions}}</u>
                &nbsp;&nbsp; امتداد الملف غير مسموح به
                الملفات المسموح بها
            </span>
        </div>
    </div>
</template>
<script>
    import { saveAs } from "file-saver";
    import { prototype } from "events";

    export default {
        name: "AttachFile",
        props: {
            attachmentsNumber: {
                type: Number,
                default: 1
            },
            maximumSize: {
                type: Number,
                default: 10
            },
            fileAllowedExtensions: {
                type: String,
                default: "jpg,pdf,png,jpeg"
            },
            isSingle: {
                type: Boolean,
                default: false
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            status: {
                type: String,
                default: "Add"
            },
            dataSource: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                uploadFieldName: "Files",
                uploadedFiles: [],
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
                    "zz"
                ]
            };
        },
        watch: {
            dataSource() {
                this.setData();
            }
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
                        this.initSize += fileData.size;
                        if (this.checkFileSize()) {
                            this.initSize -= fileData.size;
                            return;
                        }
                    }

                    for (var i = 0; i < numberOfFilesToPush; i++) {
                        this.uploadedFiles.push(fileName.target.files[i]);
                    }
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
                document.getElementById("files1").value = "";
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
                if (this.dataSource != null && this.status != "Add") {
                    this.isSingle = false;
                    this.uploadedFiles = [];
                    for (var i = 0; i < this.dataSource.length; i++) {
                        var dataSourceObject = {};
                        dataSourceObject.id = this.dataSource[i].id;
                        dataSourceObject.name = this.dataSource[i].name;
                        dataSourceObject.size = this.dataSource[i].size;
                        this.initSize += this.dataSource[i].size;
                        this.uploadedFiles.push(dataSourceObject);
                    }
                }
            },
            downloadFile(fileId) {
                axios.get("/file/" + fileId, { responseType: "blob" }).then(response => {
                    saveAs(response.data, response.headers.filename);
                });
            },
            allowedFileExtentions() {
                var exts = this.fileAllowedExtensions.split(",");
                for (let i = 0; i < exts.length; i++) {
                    if (exts[i][0] !== ".") exts[i] = "." + exts[i];
                }
                return exts.join(",");
            }
        }
    };
</script>
<style scoped>
    .item {
        float: right;
        border: 1px solid #cdcaca;
        color: #5e5e5e;
        border-radius: 10px;
        text-align: center;
        padding: 6px 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 25px;
        width: 158px;
        margin: 0px;
        overflow: visible;
        position: relative;
        margin-left: 10px;
        margin-right: 18px;
    }

    .attachments-box {
        display: inline-block;
        width: 100%;
        margin: 0 5px;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        min-height: 35px;
    }

    .close-icon {
        position: absolute;
        color: white;
        top: -10px;
        left: -10px;
        float: right;
        display: block;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        border-width: 3px;
        border-style: solid;
        border-color: red;
        border-radius: 100%;
        background: -webkit-linear-gradient( -45deg, transparent 0%, transparent 46%, white 46%, white 56%, transparent 56%, transparent 100% ), -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, white 46%, white 56%, transparent 56%, transparent 100%);
        background-color: red;
        transition: all 0.3s ease;
    }

    .img {
        height: 20px;
        float: left;
        width: 20px;
    }

    .fileLabel {
        float: right;
        width: 125px;
        line-height: 1;
        font-size: 14px;
        clear: both;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
