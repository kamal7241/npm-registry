import LabelAndValue from "../src/components/LabelAndValue/labelAndValue.vue";

export default {
  title: "Components/LabelAndValue",
  component: LabelAndValue,
};

const Template = (args, { argTypes }) => ({
  components: { LabelAndValue },
  props: Object.keys(argTypes),
  template: `<LabelAndValue v-bind="$props"/>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "ناجز",
  value: "Row Value",
  labelClass: "",
  valueClass: "",
  row: false,
  isLoading: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  label: "Dummy Label",
  value: "Row Value",
  row: false,
  isLoading: true,
};

export const RowState = Template.bind({});
RowState.args = {
  label: "Dummy Label",
  value: "Row Value",
  row: true,
  isLoading: false,
};
