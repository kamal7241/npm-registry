import FormWizard from "./components/FormWizard.vue"
import TabContent from "./components/TabContent.vue"
const VueFormWizard = {
    install(Vue) {
        Vue.component('FormWizard', FormWizard)
        Vue.component('TabContent', TabContent)
    }
}
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueFormWizard)
}

export default VueFormWizard
export {
    FormWizard,
    TabContent,
}