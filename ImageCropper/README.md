## **Description**
Highly customizable pkg for cropping Images

### **Features**
- [x] Localization for all strings
- [x] Customization for **Image Placeholder**
- [x] Customization for **Rendered Cropped Image**

## Example
```vue
<template>
  <ImageCropper
    label="نص تجريبي"
    :cropperConfigs="cropperConfigs"
    @cropImage="onCropImage"
  >
    <template #image-placeholder="{croppedImage, onEditSelectedImage, onDeleteSelectedImage, onUploadImage}">
      <div class="cropped-image-placeholder">
        <img
          :src="croppedImage"
          class="cropped-image"
          alt="cropped-image"
        >

        <div class="actions">
          <img
            src="./assets/edit.png"
            alt="edit"
            @click="onEditSelectedImage"
          >

          <img
            src="./assets/delete.svg"
            alt="delete"
            @click="onDeleteSelectedImage"
          >        
        
          <img
            src="./assets/upload.png"
            alt="upload"
            @click="onUploadImage"
          >
        </div>
      </div>
    </template>
  </ImageCropper>
</template>

<script>
import ImageCropper from "./components/ImageCropper.vue";

export default {
  name: "App",
  components: { 
    ImageCropper 
  },
  data() {
    return {
      cropperConfigs: {
        aspectRatio: 19 / 6
      }
    };
  },
  methods: {
    onCropImage(data) {
      console.log('onCropImage', data);
    }
  }
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **@cropImage** | *function that exposes all the cropped files as the first param* | **Function** | ***@cropImage="onCropImage"*** | **true**
| **cropperConfigs** | *configs for the cropper canvas [options](https://github.com/fengyuanchen/cropperjs#options) * | **Object** | ***{}*** | **false**
| **localizations** | *for checnging all the desired strings* | **Object** | ***{}*** | **false**
| **label** | *Field label* | **String** | ***''*** | **false**
| **isRequired** | *Flag for indicating whether the input is required or not * | **Boolean** | ***false*** | **false**
| **maxDisplayNameLength** | *if the file name is too long it will cut it based on it's value* | **Number** | ***15*** | **false**
| **exportInitialFieldMeta** | *Update Parent with Field info* | **Boolean** | ***false*** | false
| **enableFullnameDisplay** | *if true it will provide the fullName of the file regardless **maxDisplayNameLength** prop* | **Boolean** | ***false*** | **false**
| **activateInternalErrorPreview** | *to show internal error* | **Boolean** | ***false*** | **false**
| **name** | *field name to map results and errors to* | **String** | ***""*** | **true**
| **value** | *file to update the ui* | **Object** | ***{}*** | **false**
| **readOnlyMode** | *Disable The Field* | **Boolean** | ***false*** | **false**
| **enableDownload** | *To Allow Download previously saved image* | **Boolean** | ***true*** | **false**

## Available localizations
| Prop | default |
| --- | --- |
| **clickHere** | ***اضغط هنا*** |
| **modalTitle** | ***محرر الصورة*** |
| **modalSaveAction** | ***حفظ*** |
| **modalCancelAction** | ***إلغاء*** |
| **chooseFile** | ***اختر ملف*** |
## Customizations
*The available customization are*:
1. **Image Placeholder**: in order to customize it you will have to ***scoped slot*** with the name ***image-placeholder*** and it will receive:
  - **croppedImage**: *Image src after cropping process to use it in UI or as a condition to hide/show the empty placeholder if needed*
  - **onUploadImage**: *To trigger the file chooser*
  - **onEditSelectedImage**: *method to open the cropper mode with the current selected file*
  - **onDeleteSelectedImage**: *method to reset all chosed files and `export null for the cropImage` *

2. **Error section**: to render custom error `and it will not be available if activateInternalErrorPreview=false` so in order to customize it you will have to ***scoped slot*** with the name ***errors*** and it will receive the **errors** as an argument `which is a string`.

## Notes: 
- ***@cropImage*** : *function that exposes all the cropped files as the first param as `{ croppedBlob: Blob, croppedImage: Base64 }`*

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
