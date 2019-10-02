import DataTable from './components/DataTable.vue';

const components = {
  install(Vue) {
    Vue.component('DataTable', DataTable);
  },
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(components);
}

export default components;
export {
  DataTable,
};
