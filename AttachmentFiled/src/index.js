import AttachmentField from "./components/AttachmentField.vue";

const UploadComponents = {
	AttachmentField
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
	AttachmentField
}