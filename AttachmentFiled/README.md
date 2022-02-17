## **Description**
Highly customizable pkg for managing selecting files

### **Features**
- [x] Select single file
- [x] Select multiple files
- [x] Customization for all strings
- [x] Customization for hints section
- [x] Customization for list rendering

## Example
```vue
<template>
  <div
    id="app"
  >
    <!-- Component -->
    <AttachmentField 
      label="صورة شخصية "
      placeholder="استعراض الملفات"
      isMultiple
      @select="onSelectFiles"
    >
      <!-- For Customizing hints below the input field -->
      <template #hints="{data}">
        <div class="hints-placeholder">
          <p class="text">
            {{ getAllowedFileTypesText(data.hintsData) }}
          </p>
          <p>{{ getAllowedMaxFileSizeText(data.hintsData) }}</p>
        </div>
      </template>   
      <!-- For Customizing the list of attachments -->
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
      </template>
    </AttachmentField>
  </div>
</template>

<script>
import AttachFile from "attachment-field";

export default {
  name: "App",
  components: { 
    AttachmentField 
  },
  data() {
    return {
    };
  },
  methods: {
    onSelectFiles(files) {
      console.log('onSelectFiles', files);
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
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **@change** | *function that exposes all the selected files as the first param* | **event** | ***@change="onSelectFiles"*** | **true**
| **maxFileSizeInMega** | *max single file size* | **Number** | ***2 MB*** | false
| **maxFilesSizeInMega** | *total size for the selected files* | **Number** | ***5 MB*** | false
| **maxAttachments** | *max selected attachments number* | **Number** | ***5*** | false
| **maxDisplayNameLength** | *if the file name is too long it will cut it based on it's value* | **Number** | ***15*** | false
| **isMultiple** | *to make the input multiselect* | **Boolean** | ***false*** | false
| **enableFullnameDisplay** | *if true it will provide the fullName of the file regardless **maxDisplayNameLength** prop* | **Boolean** | ***false*** | false
| **validateOnSingleFileSize** | *if true the selection will validate based on ***maxFileSizeInMega*** | **Boolean** | ***false*** | false
| **label** | *label for input field* | **String** | ***""*** | false
| **placeholder** | *placeholder for input field* | **String** | ***""*** | false
| **accept** | *the file types the file input should accept. [Accept Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)* | **String** | ***"jpg, pdf, png, jpeg"*** | false
| **excludedExtentions** | *files with extention in this list will be ignored* | **Array** | ***["zip", "exe", "ZIP", "EXE", "ZAP", "Z01", "Z02", "Z03", "iso", "rar", "zz"]*** | false

## Customizations
*The available customization are*:
1. **Hints section**: in order to customize it you will have to ***scoped slot*** with the name ***hints*** and it will receive the ***data*** as an argument.
***data object*** contains of: **hintsData** which includes:
  - **allowedExtentions**: provided by ***accept*** prop
  - **maxFilesSizeInMega**: provided by ***maxFilesSizeInMega*** prop
  - **maxFileSizeInMega**: provided by ***maxFileSizeInMega*** prop

2. **List section**: to render custom list so in order to customize it you will have to ***scoped slot*** with the name ***list*** and it will receive the **data** as an argument and ***onDeleteFile***.
***data object*** contains of: **listData** which includes:
  - **files**: selected files to loop through them
  - And
  - **onDeleteFile**: method to handle delete file

## Notes: 
- ***@change*** : *function that exposes all the selected files as the first param*
- ***Each file*** : has the same props as in [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files) in addition to **displayName** prop
- ***displayName*** : we will count on it for **displaying the name** always **not the name prop**

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
