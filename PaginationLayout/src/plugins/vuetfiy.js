import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { VApp, VPagination, VSelect } from 'vuetify/lib/components'


Vue.use(Vuetify, {
  components: {
    VApp,
    VPagination,
    VSelect
  }
})

const opts = {
  rtl: true,
  theme: {
    themes: {
      light: {
        primary: '#418c8c',
        secondary: '#e0cf97',
      },
    },
  }
}

export default new Vuetify(opts)