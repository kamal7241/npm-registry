import { action } from "@storybook/addon-actions";
import DataTable from "../src/components/DataTable/DataTable.vue";
import { argTypesConfigs } from "./argTypes/data-table";

const rows = [
  { id: "1", name: "ناجز أفراد", color: "اللون الأخضر" },
  { id: "2", name: "ناجز أعمال", color: "اللون الأزرق" },
  { id: "3", name: "ناجز حكومة", color: "اللون البني" },
  { id: "4", name: "ناجز محامين", color: "اللون الأصفر" },
];

const columns = [
  { field: "id", title: "الترتيب" },
  { field: "color", title: "اللون" },
  { field: "name", title: "الجهة" },
];

const slotsNames = columns.map((column) => column.field);

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { DataTable },
  props: Object.keys(argTypes),
  template: `<DataTable v-bind="$props"/>`,
  template: `
  <DataTable v-bind="$props">
    <template v-for="${slotName} in ${slotsNames}" v-if="${
    defaultSlotName in args
  }" v-slot>
      ${args.default}
    </template>
    <template 
      v-if="${headerActionSlotName in args}" 
      #${headerActionSlotName}
    >
      ${args[headerActionSlotName]}
    </template>
  </DataTable>
`,
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

export const ClickEvent = Template.bind({});
ClickEvent.args = {
  rows,
  columns,
  primaryField: "id",
  onClick: action("onRowClicked"),
};

export const WithoutSpacer = Template.bind({});
WithoutSpacer.args = {
  rows,
  columns,
  noSpacer: true,
  primaryField: "id",
  onClick: action("onRowClicked"),
};
