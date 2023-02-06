import { configure, addDecorator } from "@storybook/vue";
import "!style-loader!css-loader!sass-loader!./scss-loader.scss";
import "vuetify/dist/vuetify.css";
// import '!style-loader!css-loader!@fortawesome/fontawesome-free/css/all.css';
import "@fortawesome/fontawesome-free/css/all.css";
// import "@/plugins/vuetify";
// import ar from "vuetify/src/locale/ar.ts";
// import en from "vuetify/src/locale/en.ts";

import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

addDecorator(() => ({
  vuetify: new Vuetify({
    rtl: true,
    lang: {
      // locales: { ar, en },
      current: "ar",
    },
  }),
  template:
    '<v-app style="background-color: white"><v-main><story/></v-main></v-app>',
}));

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.js$/), module);