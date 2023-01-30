import Vue from "vue";
import Vuetify from "vuetify/lib";

import Calendar from "./components/Calendar/Calendar.vue";

Vue.use(Vuetify);

const Components = {
  Calendar,
};

Vue.component("Calendar", Calendar);

export { Calendar };

// Export the library as a plugin
export default Components;
