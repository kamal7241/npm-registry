import ImageCropper from "./components/ImageCropper.vue";

const ImageCropperComponents = {
	ImageCropper
}

const ImageCropperComponentsPlugin = {
	install(Vue) {
		Object.keys(ImageCropperComponents).forEach((name) => {
			Vue.component(name, ImageCropperComponents[name])
		})
	}
}

export default ImageCropperComponentsPlugin

export {
	ImageCropper
}