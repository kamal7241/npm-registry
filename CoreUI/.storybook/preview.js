import { configure, addDecorator } from "@storybook/vue";
import "!style-loader!css-loader!sass-loader!./scss-loader.scss";
import "vuetify/dist/vuetify.css";
import "@mdi/font/css/materialdesignicons.css";

import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

addDecorator(() => ({
  vuetify: new Vuetify({
    rtl: true,
    icons: {
      iconfont: "mdi",
    },
    // lang: {
    //   current: "ar",
    // },
  }),
  template:
    '<v-app style="background-color: white"><v-main><story/></v-main></v-app>',
}));

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.js$/), module);