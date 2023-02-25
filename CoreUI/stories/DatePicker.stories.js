import DatePicker from "../src/components/DatePicker/datePicker.vue";
import { argTypesConfigs } from "./argTypes/date-picker";
import { defaultSlotParams, headerActionSlotParams } from "./code/DatePicker";

const defaultSlotName = "default";
const headerActionSlotName = "headerAction";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { DatePicker },
  props: Object.keys(argTypes),
  template: `
    <DatePicker v-bind="propsWithoutSlots">
      <template v-if="${defaultSlotName in args}" v-slot>
        ${args.default}
      </template>
      <template 
        v-if="${headerActionSlotName in args}" 
        #${headerActionSlotName}
      >
        ${args[headerActionSlotName]}
      </template>
    </DatePicker>
  `,
  computed: {
    propsWithoutSlots() {
      const filteredProps = this.$props;

      delete filteredProps[defaultSlotName];
      delete filteredProps[headerActionSlotName];

      return filteredProps;
    },
  },
});

export const Base = Template.bind({});
Base.args = {
  title: "",
  isLoading: false,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: "Card panel",
  isLoading: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  title: "Card panel",
  isLoading: true,
};

export const defaultSlot = Template.bind({});
defaultSlot.parameters = defaultSlotParams;
defaultSlot.args = {
  title: "Card panel",
  isLoading: false,
  // ! slots
  [defaultSlotName]: `<strong>This is the default slot</strong>`,
};

export const HeaderActionSlot = Template.bind({});
HeaderActionSlot.parameters = headerActionSlotParams;
HeaderActionSlot.args = {
  title: "Card panel",
  isLoading: false,
  // ! slots
  [headerActionSlotName]: `<v-btn color='primary'>Click Me</v-btn>`,
};
