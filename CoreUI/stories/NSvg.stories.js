import NSvg from "../src/components/Svgs/nSvg.vue";
import { argTypesConfigs } from "./argTypes/label-and-value";

export default {
  title: "Components/NSvg",
  component: NSvg,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { NSvg },
  props: Object.keys(argTypes),
  template: `
  <div>
  <NSvg v-bind='$props' />
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "ناجز",
  value: "Value",
};
