import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
// Locals
import ar from "vuetify/src/locale/ar.ts";
import en from "vuetify/src/locale/en.ts";
// utils
import getThemeColor from "../utils/theming";

Vue.use(Vuetify);

const theme = {
  themes: {
    light: {
      primary: getThemeColor("primary") || "#158E8D",
      secondary: getThemeColor("secondary") || "#e0cf97",
    },
  },
};

export default new Vuetify({
  rtl: true,
  icons: {
    iconfont: "mdi",
  },
  lang: {
    locales: { ar, en },
    current: "ar",
  },
  theme,
});
