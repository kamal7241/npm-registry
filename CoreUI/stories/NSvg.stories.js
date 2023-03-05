import NSvg from "../src/components/Svgs/nSvg.vue";
import { argTypesConfigs } from "./argTypes/n-svg";

export default {
  title: "Components/NSvg",
  component: NSvg,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { NSvg },
  props: Object.keys(argTypes),
  template: "<NSvg v-bind='$props' />",
});

export const Default = Template.bind({});
Default.args = {
  width: 50,
  height: 50,
  name: "add-users",
};
