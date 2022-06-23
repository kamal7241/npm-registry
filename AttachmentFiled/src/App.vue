<template>
  <div
    id="app"
  >
    <AttachmentField 
      label="صورة شخصية "
      name="association"
      placeholder="قم بسحب وإرفاق ملفاتك في هذه المنطقة"
      isRequired
      :localizations="localizations"
      activateInternalErrorPreview
      @select="onSelectFiles"
      @error="onErrorFound"
    >
      <!-- <template #label="{data}">
        <p
          :class="['label', { err: data.err }]"
        >
          أهلاً
          <span
            class="star"
          >*</span>
        </p>
      </template> -->
      <!-- <template #errors="{errors}">
        <div class="error-placeholder">
          <p class="text">
            {{ errors }}
          </p>
        </div>
      </template>         
      
      <template #hints="{data}">
        <div class="hints-placeholder">
          <p class="text">
            {{ getAllowedFileTypesText(data.hintsData) }}
          </p>
          <p>{{ getAllowedMaxFileSizeText(data.hintsData) }}</p>
        </div>
      </template>   
      
      <template #list="{data: { listData }, onDeleteFile}">
        <ul v-if="listData.files.length">
          <li
            v-for="(file, index) in listData.files"
            :key="index"
            class="list-item"
          >
            <div class="icon-name-wrapper">
              <img
                class="img"
                src="./assets/file.png"
              >
              <span class="file-name">{{ file.displayName }}</span>
            </div>

            <div class="size-delete-wrapper">
              <span class="size">{{ getFileSizeInKiloByte(file.size) }}</span>
              <img
                class="img"
                src="./assets/trash-bin.png"
                @click="onDeleteFile(index)"
              >
            </div>
          </li>
        </ul>
      </template> -->
    </AttachmentField>
  </div>
</template>

<script>
import AttachmentField from "./components/AttachmentField.vue";
export default {
  name: "App",
  components: { 
    AttachmentField 
  },
  data() {
    return {
      localizations: {
        placeholder: 'استعراض الملفات'
      }
    }
  },
  methods: {
    onSelectFiles(files) {
      console.log('onSelectFiles', files);
    },    
    onErrorFound(error) {
      console.log('error', error);
    },
    getAllowedFileTypesText(data) {
      return `نوع الملف يجب أن يكون ${data.allowedExtentions}`; 
    },
    getAllowedMaxFileSizeText(data) {
      return `كحد أقصى ${data.maxFilesSizeInMega} م.ب`;
    },
    getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = sizeInBytes / 1000;

      return `${sizeInKiloByte}KB`;
    }
  }
};
</script>

<style scoped>
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

.error-placeholder .text {
  color: red
}

.list-item .icon-name-wrapper,
.list-item .size-delete-wrapper {
  display: flex;
  align-items: center;
}

.list-item .icon-name-wrapper .img,
.list-item .size-delete-wrapper .img {
  width: 18px;
  height: 17px;
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


