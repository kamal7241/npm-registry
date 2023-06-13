import Vue from "vue";
import Vuetify from "./plugins/vuetify";

import * as components from "./components";
import { updatePackageThemingVariables } from "./utils/theming";

Vue.use(Vuetify);

Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== "default") {
    Vue.component(componentName, component);
  }
});

updatePackageThemingVariables();

export { components };

// Export the library as a plugin
export default components;
