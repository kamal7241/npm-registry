import ChooseFile from './components/ChooseFile.vue'

const Components = {
    ChooseFile
}

const ComponentsPlugin = {
    install(Vue) {
        Object.keys(Components).forEach((name) => {
            Vue.component(name, Components[name])
        })
    }
}

export default ComponentsPlugin

export {
    ChooseFile
}