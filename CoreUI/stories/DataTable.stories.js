import DataTable from "../src/components/DataTable/DataTable.vue";
import { argTypesConfigs } from "./argTypes/data-table";

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { DataTable },
  props: Object.keys(argTypes),
  template: `<DataTable v-bind="$props"/>`,
});

export const Default = Template.bind({});
Default.args = {
  rows: [{ id: 1 }],
  columns: [],
  isLoading: false,
  noSpacer: false,
  primaryField: "",
  wrapperClass: "",
  // Todo: to be categorized as [test automation Ids]
  clickPrimaryFieldAction: "",
  // Todo: Actions category
  onClick: () => {},
};
