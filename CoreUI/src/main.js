import Vue from "vue";
import i18n from "./plugins/i18n";
import App from "./App.vue";
// Plugins
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  components: { App },
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
