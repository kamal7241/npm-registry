import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import vuetify from './plugins/vuetify';


Vue.use(VModal)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
