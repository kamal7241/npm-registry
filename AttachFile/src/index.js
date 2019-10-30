import AttachFile from "./components/AttachFile.vue";

const UploadComponents = {
	AttachFile
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
    AttachFile
}