import Vue from 'vue'
import './plugins/vuetfiy';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#pagination-layout')
