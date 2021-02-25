import Vue from 'vue';
import router from '../router';
import VueAppInsights from 'vue-application-insights';
import AxiosService from './../Services/AxiosService';
export default async function initializeApplication(): Promise<number> {
    const axios = new AxiosService();
    const result = await axios.axiosInstance.get('config.json');
    Vue.use(VueAppInsights, {
            id: result.data.ApplicationInsights.InstrumentationKey,
            router,
            trackInitialPageView: true,
        });
    const p = Promise.resolve(1);
    return p;
}
