import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import '../components/style.css';
import ar from 'vuetify/lib/locale/ar';


Vue.use(Vuetify)

const opts = {
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
            primary: '#418C8C',
        }
        },
    }
}

export default new Vuetify(opts)