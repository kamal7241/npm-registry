import ImageCropper from "./components/ImageCropper.vue";

const UploadComponents = {
	ImageCropper
}

const UploadComponentsPlugin = {
	install(Vue) {
		Object.keys(UploadComponents).forEach((name) => {
			Vue.component(name, UploadComponents[name])
		})
	}
}

export default UploadComponentsPlugin

export {
	ImageCropper
}