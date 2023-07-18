<template>
  <v-input :rules="rules" :value="value">
    <div class="pkg-base-attachment-wrapper">
      <div class="label-and-input-wrapper">
        <slot name="labelContent" :data="{ err: error }">
          <label
            v-if="label"
            class="field-label d-block label mb-2"
            :class="{ err: error }"
          >
            {{ label }}
            <span v-if="isRequired" class="mx-1 star">*</span>
          </label>
        </slot>

        <div
          v-if="enableFancyPreview && !disabled"
          class="file-input-wrapper d-flex justify-center align-items-center flex-column"
        >
          <n-svg name="folder" width="25" height="25" />

          <span v-if="strings.placeholder" class="placeholder-wrapper mt-3">
            {{ strings.placeholder }}
          </span>

          <button
            class="file-chooser-action mt-5 px-2 py-1"
            :disabled="disabled || !addAttachmentAllowed || isServerLoading"
            @click="$refs.file.click()"
          >
            {{ strings.actionName }}
          </button>
        </div>

        <div v-if="!enableFancyPreview && !disabled">
          <div class="input-wrapper d-flex align-items-center">
            <button
              :id="chooseFileActionId"
              :disabled="disabled || !addAttachmentAllowed || isServerLoading"
              :class="[
                'indicator pointer white--text py-4 px-3',
                { selecting: isServerLoading },
              ]"
              @click.prevent="$refs.file.click()"
            >
              <div
                v-if="isServerLoading"
                class="loader-placeholder d-flex align-items-center justify-center"
              >
                <n-svg name="spinner-loader" width="30" height="30" />
              </div>
              {{ strings.clickHere }}
            </button>

            <div class="name-placeholder py-4 px-3">
              {{
                isServerLoading ? strings.serverLoadingText : strings.chooseFile
              }}
            </div>
          </div>
        </div>
      </div>

      <slot v-if="isErrorSlotAvailable" name="errors" :errors="error">
        <div class="error-placeholder mt-2">
          <p class="text">
            {{ error }}
          </p>
        </div>
      </slot>

      <slot
        v-if="addAttachmentAllowed && !disabled"
        name="hints"
        :data="{ hintsData }"
      >
        <div class="hints-placeholder mt-2">
          <p class="mb-0">
            {{ utils.getAllowedFileTypesText(accept) }}
          </p>
          <p class="mb-0">
            {{ utils.getAllowedMaxFileSizeText(maxFilesSizeInMega) }}
          </p>
        </div>
      </slot>

      <input
        :id="fileInputId"
        ref="file"
        class="d-none"
        type="file"
        :disabled="disabled || !addAttachmentAllowed"
        :multiple="isFieldMultiple"
        :accept="accept"
        @change="onSelectFiles"
      />

      <slot name="list" :data="{ listData }" :onDeleteFile="utils.onDeleteFile">
        <ul v-if="selectedFiles.length" class="pa-0 mt-2">
          <li
            v-for="(selectedFile, index) in selectedFiles"
            :key="index"
            class="align-items-center d-flex justify-space-between list-item px-3 py-2"
          >
            <div class="icon-name-wrapper d-flex align-items-center">
              <n-svg class="img" name="file" width="25" height="25" />
              <span class="file-name ms-3">
                {{
                  enableServerSide
                    ? selectedFile.file.displayName
                    : selectedFile.displayName
                }}
              </span>
            </div>

            <div class="size-delete-wrapper d-flex align-items-center">
              <span class="size me-3">
                {{
                  utils.getFileSizeInKiloByte(
                    enableServerSide
                      ? selectedFile.file.size
                      : selectedFile.size
                  )
                }}
              </span>

              <button
                class="align-center d-inline-flex justify-center"
                @click="utils.onDeleteFile(index)"
              >
                <n-svg
                  v-if="!disabled"
                  :id="`${deleteActionId}_${index + 1}`"
                  class="img"
                  width="30"
                  height="30"
                  name="cancel"
                />
              </button>

              <button
                class="align-center d-inline-flex justify-center"
                @click="
                  utils.onDownloadFile(
                    enableServerSide ? selectedFile.file : selectedFile
                  )
                "
              >
                <n-svg
                  v-if="isDownloadAvailable"
                  :id="`${downloadActionId}_${index + 1}`"
                  class="img"
                  width="20"
                  height="20"
                  name="download"
                />
              </button>
            </div>
          </li>
        </ul>
      </slot>
    </div>
  </v-input>
</template>

<script>
import NSvg from "../Svgs/nSvg.vue";
import generateUtils from "./utils";

export default {
  name: "AttachmentField",
  components: {
    NSvg,
  },
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
    fileInputId: {
      type: String,
      default: "file-input",
    },
    chooseFileActionId: {
      type: String,
      default: "",
    },
    deleteActionId: {
      type: String,
      default: "",
    },
    downloadActionId: {
      type: String,
      default: "",
    },
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
      default: false,
    },
    enableFancyPreview: {
      type: Boolean,
      default: false,
    },
    resetErrorOnSelect: {
      type: Boolean,
      default: true,
    },
    activateInternalErrorPreview: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    enableDownload: {
      type: Boolean,
      default: false,
    },
    enableFullnameDisplay: {
      type: Boolean,
      default: false,
    },
    validateOnSingleFileSize: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    exportInitialFieldMeta: {
      type: Boolean,
      default: false,
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
      default: ".jpg,.pdf,.png,.jpeg",
    },
    value: {
      type: Array,
      default: () => [],
    },
    localizations: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Represents a uploadCallbackArgs object.
     * @typedef {Object} uploadCallbackArgs
     * @property {File} source - File src.
     * @property {string} base64 - base64.
     * @property {string} contentType - encodedSharepointId.
     *
     * Represents a downloadCallbackArgs object.
     *
     * @typedef {Object} downloadCallbackArgs
     * @property {string} contentType - File content type.
     * @property {string} sharepointId - SharepointId.
     * @property {string} encodedSharepointId - encodedSharepointId.
     * @property {Function} fileGenerator - Helper to download the file if needed.
     *
     * Represents a serverSideConfigs object.
     *
     * @typedef {Object} ServerSideConfigs
     * @property {string} appName  - The appName.
     * @property {string} systemCode - The systemCode.
     * @property {string} [uploadUrl]  - default will be /file/upload.
     * @property {(string|function(sharepointId, encodedSharepointId): downloadUrl)} [downloadUrl] - It can be either a string and the default is /file or a function that takes sharepointId and encodedSharepointId.
     * @property {string} [downloadUrl]  - The year the car was made.
     *
     * @property {function(downloadCallbackArgs): File} downloadCallback - To override the sharepoint download functionality.
     *
     * @property {function(uploadCallbackArgs): string} uploadCallback - To override the sharepoint upload functionality.
     * @returns {}
     *
     */
    serverSideConfigs: {
      type: Object,
      default: () => ({}),
    },
    enableServerSide: {
      type: Boolean,
      default: false,
    },
    updateParentWithFileMeta: {
      type: Boolean,
      required: false,
      default: false,
    },
    attachmentTypeId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectedFiles: [],
      currentTotalSize: 0,
      error: "",
      isServerLoading: false,
    };
  },
  computed: {
    isErrorSlotAvailable() {
      return !this.disabled && this.error && this.activateInternalErrorPreview;
    },
    addAttachmentAllowed() {
      return this.selectedFiles.length < this.maxAttachments;
    },
    isDownloadAvailable() {
      const { disabled, enableServerSide, enableDownload } = this;

      return enableDownload || disabled || enableServerSide;
    },
    hintsData() {
      return {
        maxFileSizeInMega: this.maxFileSizeInMega,
        maxFilesSizeInMega: this.maxFilesSizeInMega,
        allowedExtentions: this.accept,
      };
    },
    listData() {
      return {
        files: this.selectedFiles,
      };
    },
    totalFilesSize() {
      return this.maxFilesSizeInMega * 1024 * 1024;
    },
    updatedValue() {
      return {
        name: this.name,
        value: this.parentUpdatedData,
        isValid: this.isRequired ? !!this.selectedFiles.length : true,
      };
    },
    parentUpdatedData() {
      const {
        selectedFiles,
        enableServerSide,
        updateParentWithFileMeta,
      } = this;

      if (!enableServerSide || (enableServerSide && updateParentWithFileMeta)) {
        return selectedFiles;
      }
      // Deep clone
      const mutatedSelectedFiles = JSON.parse(JSON.stringify(selectedFiles));

      return mutatedSelectedFiles.map((enhancedFile) => {
        const enhancedFileClone = enhancedFile;
        delete enhancedFileClone.file;

        return enhancedFileClone;
      });
    },
    strings() {
      const { localizations } = this;

      return {
        placeholder: "",
        clickHere: "اضغط هنا",
        chooseFile: "اختر ملف",
        actionName: "استعراض الملفات",
        serverLoadingText: "جاري تحميل البيانات ...",
        ...localizations,
      };
    },
    isFieldMultiple() {
      const { isMultiple, enableServerSide } = this;

      return enableServerSide ? false : isMultiple;
    },
    utils() {
      return generateUtils(this);
    },
    enhancedServerSideConfigs() {
      return {
        appName: window.$config?.sharepoint?.appName || "",
        systemCode: window.$config?.sharepoint?.systemCode || "",
        downloadUrl: window.$config?.sharepoint?.downloadUrl || "/file",
        uploadUrl: window.$config?.sharepoint?.uploadUrl || "/file/upload",
        ...this.serverSideConfigs,
      };
    },
  },
  watch: {
    value(newVal, oldVal) {
      const isEqualValues = JSON.stringify(newVal) === JSON.stringify(oldVal);

      if (this.value.length && !isEqualValues) {
        this.loadData();
      } else if (!this.value.length && !isEqualValues) {
        this.selectedFiles = [];
        this.currentTotalSize = 0;
      }
    },
  },
  mounted() {
    // initial notification to the parent
    if (this.exportInitialFieldMeta) {
      this.$emit("select", this.updatedValue);
    }

    if (this.value.length) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      const { enableServerSide } = this;

      if (enableServerSide) {
        this.loadServerSideData();
      } else {
        this.loadClientSideData();
      }
    },
    async loadClientSideData() {
      this.selectedFiles = await this.value.reduce(
        async (memo, file, index) => {
          const results = await memo;
          let generatedFile = {};
          // Don't load more than max attachments if fullfilled
          const isValidIteration = this.maxAttachments >= index + 1;

          if (isValidIteration) {
            const convertedFile = await this.utils.base64ToFilesConverter(file);

            // check if file matches (size, totalFilesSize)
            if (this.utils.isValidFile(convertedFile)) {
              generatedFile = convertedFile;
              this.currentTotalSize += convertedFile.size;
            }
          }

          return isValidIteration ? [...results, generatedFile] : results;
        },
        []
      );
    },
    async loadServerSideData() {
      const { selectedFiles, value } = this;
      this.isServerLoading = true;
      // Todo: Load from server and block upload button untill done
      const filesNotLoadedYet = selectedFiles.length
        ? value.filter((providedValue) =>
            selectedFiles.every(
              (file) => file.sharepointId !== providedValue.sharepointId
            )
          )
        : value;

      if (filesNotLoadedYet.length) {
        const enhancedExtraFiles = await filesNotLoadedYet.reduce(
          async (memo, file, index) => {
            const results = await memo;

            let generatedFile = {};
            // Don't load more than max attachments if fullfilled
            const isValidIteration = this.maxAttachments >= index + 1;

            if (isValidIteration) {
              const { downloadCallback } = this.enhancedServerSideConfigs;
              let fileFromSharepointId;
              const args = {
                contentType: file.contentType,
                sharepointId: file.sharepointId,
                encodedSharepointId: btoa(file.sharepointId),
                fileGenerator: (response) =>
                  new File([response.data], response.fileName, {
                    type: response.fileType,
                  }),
              };

              if (downloadCallback && typeof downloadCallback === "function") {
                fileFromSharepointId = await downloadCallback(args);
              } else {
                fileFromSharepointId = await this.utils.downloadFile(args);
              }

              fileFromSharepointId.displayName = this.utils.enhanceFileName(
                fileFromSharepointId
              );

              // check if file matches (size, totalFilesSize)
              if (this.utils.isValidFile(fileFromSharepointId)) {
                generatedFile = {
                  ...file,
                  file: fileFromSharepointId,
                };
                this.currentTotalSize += fileFromSharepointId.size;
              }
            }

            return isValidIteration ? [...results, generatedFile] : results;
          },
          []
        );
        this.selectedFiles = this.selectedFiles.concat(enhancedExtraFiles);
      }
      this.isServerLoading = false;
    },
    async onSelectFiles(e) {
      if (this.enableServerSide) {
        this.utils.onServerSideSelect(e);
      } else {
        this.utils.onClientSideSelect(e);
      }
    },
  },
};
</script>

<style scoped>
@import url("./attachment-field.css");
</style>
