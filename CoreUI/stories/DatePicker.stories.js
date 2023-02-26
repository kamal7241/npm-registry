import DatePicker from "../src/components/DatePicker/datePicker.vue";
import { argTypesConfigs } from "./argTypes/date-picker";
import {
  FutureModeParams,
  GregorianModeParams,
  HijriValueParams,
  IncludeTodayInFutureModeParams,
  MaxPreviewedYearsParams,
  MinimumGregorianYearParams,
} from "./code/DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { DatePicker },
  props: Object.keys(argTypes),
  template: `
    <div class='storybook-calendar-wrapper'>
      <DatePicker v-bind="$props" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const FutureMode = Template.bind({});
FutureMode.parameters = FutureModeParams;
FutureMode.args = {
  futureOnly: true,
};

export const IncludeTodayInFutureMode = Template.bind({});
IncludeTodayInFutureMode.parameters = IncludeTodayInFutureModeParams;
IncludeTodayInFutureMode.args = {
  futureOnly: true,
  skipTodayInFutureMode: false,
};

export const GregorianMode = Template.bind({});
GregorianMode.parameters = GregorianModeParams;
GregorianMode.args = {
  initialIsHijri: false,
};

export const MinimumGregorianYear = Template.bind({});
MinimumGregorianYear.parameters = MinimumGregorianYearParams;
MinimumGregorianYear.args = {
  minimumGregorianYear: 2015,
};

export const MaxPreviewedYears = Template.bind({});
MaxPreviewedYears.parameters = MaxPreviewedYearsParams;
MaxPreviewedYears.args = {
  maxPreviewedYears: 3,
};

export const HijriValue = Template.bind({});
HijriValue.parameters = HijriValueParams;
HijriValue.args = {
  value: "1443/02/15",
};

export const GregorianValueParams = Template.bind({});
GregorianValueParams.parameters = GregorianValueParams;
GregorianValueParams.args = {
  initialIsHijri: false,
  value: "2010/02/15",
};
