import Vue from 'vue'
import vuetify from './plugins/vuetfiy'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#pagination-layout')