## **Description**
Highly customizable pkg for cropping Images

### **Features**
- [x] Localization for all strings
- [x] Customization for **Empty Placeholder**
- [x] Customization for **Rendered Cropped Image**

## Example
```vue
<template>
  <ImageCropper
    label="نص تجريبي"
    :cropperConfigs="cropperConfigs"
    @cropImage="onCropImage"
  >
    <template #emptyPlaceholder="{croppedImage, onUploadImage}">
      <div
        class="empty-image-placeholder"
        @click="onUploadImage"
      >
        choose
      </div> 
    </template> 
    
    <template #previewWithActions="{croppedImage, onEditSelectedImage, onDeleteSelectedImage, onUploadImage}">
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
| **localization** | *for checnging all the desired strings* | **Object** | ***{}*** | **false**
| **label** | *Field label* | **String** | ***''*** | **false**
| **isRequired** | *Flag for indicating whether the input is required or not * | **Boolean** | ***false*** | **false**


## Available localizations
| Prop | default |
| --- | --- |
| **clickHere** | ***اضغط هنا*** |
| **modalTitle** | ***محرر الصورة*** |
| **modalSaveAction** | ***حفظ*** |
| **modalCancelAction** | ***إلغاء*** |
## Customizations
*The available customization are*:
1. **Empty Placeholder**: in order to customize it you will have to ***scoped slot*** with the name ***emptyPlaceholder*** and it will receive:
  - **croppedImage**: *Image src after cropping process to use it in UI or as a condition to hide/show the empty placeholder if needed*
  - **onUploadImage**: *To trigger the file chooser*

2. **Preview And Actions**: To render preview and actions so in order to customize it you will have to ***scoped slot*** with the name ***previewWithActions*** and it will receive : 
  - **croppedImage**: *Image src after cropping process*
  - **onUploadImage**: *method to open the file dialog*
  - **onEditSelectedImage**: *method to open the cropper mode with the current selected file*
  - **onDeleteSelectedImage**: *method to reset all chosed files and `export null for the cropImage` *
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
