import Vue from 'vue';
import ar from 'vuetify/lib/locale/ar';

import Vuetify, { VDataTable, VApp, VBtn } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: { VDataTable, VApp, VBtn }
})


export default new Vuetify({
  rtl: true,
  lang: {
    locales: { ar },
    current: 'ar'
  },
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
      }
    },
  }
});
