import ReasonFileUploader from './components/ReasonFileUploader.vue'

const UploadComponents = {
    ReasonFileUploader
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
    ReasonFileUploader
}