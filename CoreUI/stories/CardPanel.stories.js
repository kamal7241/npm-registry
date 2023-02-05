import CardPanel from "../src/components/CardPanel/cardPanel.vue";

const defaultSlotName = "default";
const headerActionSlotName = "header-action";

export default {
  title: "Components/CardPanel",
  component: CardPanel,
  argTypes: {
    default: {
      description: "The default Vue slot",
      control: {
        type: "text",
      },
      table: {
        category: "Slots",
        type: {
          summary: "html",
        },
      },
    },
    "header-action": {
      description: "The default Vue slot",
      control: {
        type: "text",
      },
      table: {
        category: "Slots",
        type: {
          summary: "html",
        },
      },
    },
  },
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
          ${args["header-action"]}
        </template>
      </CardPanel>
    `,
    computed: {
      propsWithoutSlots() {
        const filteredProps = this.$props;

        delete filteredProps[defaultSlotName];
        delete filteredProps[headerActionSlotName];

        return filteredProps;
      },
    },
  };
};

export const Base = Template.bind({});
Base.args = {
  title: "",
  isLoading: false,
  [defaultSlotName]: "",
  [headerActionSlotName]: "",
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: "Card panel",
  isLoading: false,
  [defaultSlotName]: "",
  [headerActionSlotName]: "",
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  title: "Card panel",
  isLoading: true,
  [defaultSlotName]: "",
  [headerActionSlotName]: "",
};

export const defaultSlot = Template.bind({});
defaultSlot.args = {
  title: "Card panel",
  isLoading: false,
  [defaultSlotName]: `<strong>This is the default slot</strong>`,
  [headerActionSlotName]: "",
};

export const HeaderActionSlot = Template.bind({});
HeaderActionSlot.args = {
  title: "Card panel",
  isLoading: false,
  [defaultSlotName]: "",
  [headerActionSlotName]: `<v-btn color='primary'>Click Me</v-btn>`,
};
