import PaginationLayout from "../src/components/PaginationLayout/paginationLayout.vue";
import { argTypesConfigs } from "./argTypes/pagination-layout";
// import { RulesParams } from "./code/PaginationLayout";

export default {
  title: "Components/PaginationLayout",
  component: PaginationLayout,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => {
  console.log({ argTypes });

  return {
    components: { PaginationLayout },
    props: Object.keys(argTypes),
    template: "<PaginationLayout v-bind='$props' />",
  };
};

export const Default = Template.bind({});
Default.args = {};
