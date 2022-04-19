import CoreUI from './components/index.vue';

const UploadComponents = {
	CoreUI
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
	CoreUI
}