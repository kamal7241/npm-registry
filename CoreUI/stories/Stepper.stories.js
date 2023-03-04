import Stepper from "../src/components/Stepper/stepper.vue";
import { argTypesConfigs } from "./argTypes/stepper";

export default {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { Stepper },
  props: Object.keys(argTypes),
  template: `
<Stepper 
  v-bind='$props' 
>
  <template #firstStep="{ actionsProps }">
    <v-btn @click="actionsProps.next">Go to next step</v-btn>
  </template>

  <template #secondStep="{ actionsProps }">
    <v-btn @click="actionsProps.prev">Go to prev step</v-btn>
  </template>
</Stepper>
`,
});

export const Default = Template.bind({});
Default.args = {
  steps: [
    {
      title: "الخطوة الأولى",
      slotName: "firstStep",
      component: "asdsdasdasdasdasd",
    },
    {
      title: "الخطوة الثانية",
      slotName: "secondStep",
      component: "asdsdasdasdasdasd",
    },
  ],
};
