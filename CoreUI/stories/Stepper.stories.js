import Stepper from "../src/components/Stepper/stepper.vue";
import { argTypesConfigs } from "./argTypes/stepper";
import {
  defaultParams,
  headerSlotParams,
  stepsContentParams,
  stepsNavigationParams,
} from "./code/Stepper";
import { defaultArgs } from "./utils/stepper";

export default {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { Stepper },
  props: Object.keys(argTypes),
  template: `<Stepper v-bind='$props'>

  <template v-if="showCustomHeader" #header="{currentStep}">
    <header class="headers-placeholders">
      <v-container class="pb-0 ma-0">
        <h3 class="page-title">عنوان الصفحة</h3>

        <v-stepper-header class="custom-stepper-header">
          <v-stepper-step
            v-for="(step, index) in steps"
            color="secondary"
            :key="index"
            :complete="currentStep > index+1"
            :step="index+1"
          >
            {{ step.title }}
          </v-stepper-step>
        </v-stepper-header>
      </v-container>
    </header>
  </template>

  <template v-if="showContent" #firstStep="{ actionsProps }">
    <div>
      <p>This is the content of first step (step 1)</p>

      <v-btn 
        color="primary" 
        v-if="showNavigation" 
        @click="actionsProps.next"
      >
        الخطوة التالية
      </v-btn>
    </div>
  </template>

  <template v-if="showContent" #secondStep="{ actionsProps }">
    <div>
      <p>This is the content of second step (step 2)</p>

      <v-btn
        color="primary"
        v-if="showNavigation" 
        @click="actionsProps.prev"
      >
        الخطوة السابقة
      </v-btn>
    </div>
  </template>
</Stepper>
`,
});

export const Default = Template.bind({});
Default.parameters = defaultParams;
Default.args = {
  ...defaultArgs,
};

export const StepsContent = Template.bind({});
StepsContent.parameters = stepsContentParams;
StepsContent.args = {
  ...defaultArgs,
  showContent: true,
};

export const StepsNavigation = Template.bind({});
StepsNavigation.parameters = stepsNavigationParams;
StepsNavigation.args = {
  ...defaultArgs,
  showContent: true,
  showNavigation: true,
  scrollTopOnNavigation: false,
};

export const HeaderCustomization = Template.bind({});
HeaderCustomization.parameters = headerSlotParams;
HeaderCustomization.args = {
  ...defaultArgs,
  showContent: true,
  showNavigation: true,
  showCustomHeader: true,
  scrollTopOnNavigation: false,
};
