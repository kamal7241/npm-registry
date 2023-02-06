import DataTable from "../src/components/DataTable/DataTable.vue";
import { argTypesConfigs } from "./argTypes/data-table";

const rows = [
  { id: 1, name: "ناجز أفراد", color: "اللون الأخضر" },
  { id: 2, name: "ناجز أعمال", color: "اللون الأزرق" },
  { id: 3, name: "ناجز حكومة", color: "اللون البني" },
  { id: 4, name: "ناجز محامين", color: "اللون الأصفر" },
];

const columns = [
  { field: "id", title: "الترتيب" },
  { field: "color", title: "اللون" },
  { field: "name", title: "الجهة" },
];

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
  rows,
  columns,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  rows,
  columns,
  isLoading: true,
};

export const primaryField = Template.bind({});
primaryField.args = {
  rows,
  columns,
  primaryField: "id",
};
