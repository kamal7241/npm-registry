import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
// Locals
import ar from "vuetify/src/locale/ar.ts";
import en from "vuetify/src/locale/en.ts";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  icons: {
    iconfont: "mdi",
  },
  lang: {
    locales: { ar, en },
    current: "ar",
  },
  theme: {
    themes: {
      light: {
        primary: "#158E8D",
        secondary: "#e0cf97",
      },
    },
  },
});
