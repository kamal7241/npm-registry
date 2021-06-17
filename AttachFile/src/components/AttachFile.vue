<template>
   <div class="V2">
    <div class="form-group">
        <div v-if="uploadedFiles.length > 0">
            <div v-for="item in uploadedFiles" :key="item.name">
                <i v-if="status == 'Add' || status == 'Edit'" :disabled="isDisabled" aria-hidden="true"
                    class="Form__fieldWrapper icon icon-close" @click="deleteFile(item)">
                </i>
            </div>
        </div>
        <div v-else class="Form__fieldWrapper icon icon-file"></div>
        <label v-if="status == 'Add' || status == 'Edit'"
            :class="{ 'input__upload input__field input__field--big input__field--noTop input__upload--fill': uploadedFiles.length > 0}"
            class="input__upload input__field input__field--big input__field--noTop">
            <div v-if="uploadedFiles.length > 0">
                <div v-for="item in uploadedFiles" :key="item.name">
                    <span>{{ item.name }} </span>
                </div>
            </div>
            <div v-else>
                <span> اختر الملف </span>
            </div>
            <input v-if="(status == 'Add' || status == 'Edit')" :disabled="(isDisabled || uploadedFiles.length > 0)"
                type="file" ref="file" multiple @change="filesChange($event); fileCount = $event.target.files.length;"
                id="files1" style="opacity: 0" :accept="allowedFileExtentions()" />
        </label>
        <div v-if="status == 'Add' || status == 'Edit'">
            <small v-if="this.allowedEx && !this.maxSize && this.maxFileSize > 0" class="small form-text text-muted">
                الملفات المسموح بها{{ fileAllowedExtensions }}وحجم الملف{{
                maxFileSize}}Mb</small>
            <small v-if="this.maxSize && (maxFileSize > 0|| maximumSize > 0)" class="small form-text text-muted">حجم
                الملف تجاوز ال {{ maxFileSize }}
                Mb</small>
            <small v-if="!this.allowedEx" class="small form-text text-muted">{{ fileAllowedExtensions }} امتداد الملف
                غير مسموح به الملفات المسموح بها</small>
        </div>
    </div>

    <div class="card" v-if="status != 'Add' && status != 'Edit'">
        <div class="card-body">
            <div class="card-btns mt-3">
                <h5 class="card-title mb-1 d-flex flex-md-row align-items-center justify-content-between">
                    <strong class="h5 mb-0 font-weight-bold">{{ title }}</strong>
                </h5>
                <div v-for="item in uploadedFiles" :key="item.name">
                    <a @click="downloadFile(item.id)" class="btn btn-sm btn-primary px-2" style="font-size: 16px">تحميل
                        الملف</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import { saveAs } from "file-saver";
    import { prototype } from "events";
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
                var exts = this.fileAllowedExtensions.split(",");
                for (let i = 0; i < exts.length; i++) {
                    if (exts[i][0] !== ".") exts[i] = "." + exts[i];
                }
                return exts.join(",");
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
