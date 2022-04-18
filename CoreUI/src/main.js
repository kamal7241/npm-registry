import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import "../node_modules/vuetify/dist/vuetify.min.css";
import './assets/css/index.css'
// vuetify/dist/
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
