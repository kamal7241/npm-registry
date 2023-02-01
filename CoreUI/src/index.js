import Vue from "vue";
import Vuetify from "vuetify/lib";

import AttachmentField from "./components/AttachmentField/attachmentField.vue";
import Calendar from "./components/Calendar/calendar.vue";

Vue.use(Vuetify);

const Components = {
  Calendar,
  AttachmentField,
};

Vue.component("Calendar", Calendar);
Vue.component("AttachmentField", AttachmentField);

export { Calendar, AttachmentField };

// Export the library as a plugin
export default Components;
