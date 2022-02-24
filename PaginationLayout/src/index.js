import PaginationLayout from "./components/PaginationLayout.vue";

const UploadComponents = {
	PaginationLayout
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
	PaginationLayout
}