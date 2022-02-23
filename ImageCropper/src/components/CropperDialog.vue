<template>
  <vue-final-modal
    v-model="show"
    classes="modal-container"
    content-class="modal-content"
  >
    <span class="modal__title">
      <slot name="title">Saber Demo </slot>
    </span>
    <div class="modal__content">
      <div
        v-show="selectedImage"
        class="image-wrapper"
      >
        <img
          ref="img"
          class="image-canvas"
          :src="selectedImage"
        >
      </div>
    </div>
    <div class="modal__action">
      <button @click="onCropImage">
        حفظ
      </button>
      <button
        button
        @click="onCancel"
      >
        إلغاء
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'CropperDialog',
  components: {
    VueFinalModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    selectedImage: {
      type: String,
      default: ''
    },
    fileExtention: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cropper: null,
    }
  },
  mounted () {
    this.cropper = new Cropper(this.$refs.img, {
      aspectRatio: 4 / 6,
      // minCropBoxWidth: 256,
      // minCropBoxHeight: 256,
      viewMode: 3,
      dragMode: 'move',
      background: true,
      cropBoxResizable: false,
      // responsive
      // cropBoxMovable: false,
      // cropBoxResizable: false,
    });


    // setInterval(() => this.cropper.scale(2), 2000)
  },
  destroyed () {
    console.log('destroyed');
    this.cropper.destroy();
  },
  methods: {
    onCropImage () {
      const croppedImage = this.cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: 'high', // low - medium - high 
      }).toDataURL(this.fileExtention);

      this.cropper
        .getCroppedCanvas({
          // width: ,
          // height: ,
          imageSmoothingQuality: 'high', // low - medium - high 
        })
        .toBlob((croppedBlob) => {
          // update parent
          this.$emit('save', {
            croppedBlob,
            croppedImage
          });
        }, this.fileExtention)
    },
    onCancel () {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.image-wrapper {
  /* width: 300px; */
  height: 300px;
}

.image-canvas {
  display: block;

  max-width: 100%;
}

.image-wrapper .cropper-container {
  width: 100%;
}

.image-wrapper .cropper-container .cropper-crop-box,
.cropper-face {
  border-radius: 50% !important;
}
/* Dialog styles */
::v-deep .modal-container {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

::v-deep .modal-content {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 99%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

::v-deep .modal__content {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

@media (min-width: 576px) {
  ::v-deep .modal-container {
    max-width: 500px;
    margin: 1.75rem auto;
  }
}
</style>
