import CardPanel from "../src/components/CardPanel/cardPanel.vue";
import { argTypesConfigs } from "./argTypes/card-panel";

const defaultSlotName = "default";
const headerActionSlotName = "headerAction";

export default {
  title: "Components/CardPanel",
  component: CardPanel,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => {
  console.log({ args, argTypes });
  return {
    components: { CardPanel },
    props: Object.keys(argTypes),
    template: `
      <CardPanel v-bind="propsWithoutSlots">
        <template v-if="${defaultSlotName in args}" v-slot>
          ${args.default}
        </template>
        <template 
          v-if="${headerActionSlotName in args}" 
          #${headerActionSlotName}
        >
          ${args[headerActionSlotName]}
        </template>
      </CardPanel>
    `,
    computed: {
      propsWithoutSlots() {
        const filteredProps = this.$props;

        delete filteredProps[defaultSlotName];
        delete filteredProps[headerActionSlotName];
        console.log({ filteredProps });
        return filteredProps;
      },
    },
  };
};

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
defaultSlot.args = {
  title: "Card panel",
  isLoading: false,
  // ! slots
  [defaultSlotName]: `<strong>This is the default slot</strong>`,
};

export const HeaderActionSlot = Template.bind({});
HeaderActionSlot.args = {
  title: "Card panel",
  isLoading: false,
  // ! slots
  [headerActionSlotName]: `<v-btn color='primary'>Click Me</v-btn>`,
};
