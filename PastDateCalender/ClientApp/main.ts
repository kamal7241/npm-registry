import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import i18n from '@/plugins/i18n';
import App from './components/App/App';
import router from './router';
import './registerServiceWorker';
import { VueDiContainer } from 'vue-di-container';
import AxiosService from './Services/AxiosService';
import LoaderService from './Services/LoaderService';
import initializeApplication from './plugins/application-initialization';

Vue.config.productionTip = false;
Vue.use(VueDiContainer);

declare module 'vue/types/vue' {
  interface Vue {
    $appInsights: any;
  }
}

declare global {
  interface Window {
    ShowLoader(): void;
    HideLoader(): void;
  }
}

initializeApplication().then((initialize) => {
  new Vue({
    i18n,
    router,
    diProvide: [
      AxiosService,
      LoaderService,
    ],
    render: (h) => h(App),
  }).$mount('#app');
},
);
