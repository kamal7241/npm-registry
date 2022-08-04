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
  themes: {
    light: {
      primary: '#158E8D',
      secondary: '#e0cf97',
    },
  },
}

export default new Vuetify(opts)