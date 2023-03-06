const testAutomationConfigs = {
  table: {
    category: "Test Automation Ids",
  },
};

const testAutomationIds = {
  switchActionId: {
    ...testAutomationConfigs,
    description: "Id for hijri/gregorian switcher",
  },
  daysDropdownId: {
    ...testAutomationConfigs,
    description: "Days dropdown Id",
  },
  monthsDropdownId: {
    ...testAutomationConfigs,
    description: "Months dropdown Id",
  },
  yearsDropdownId: {
    ...testAutomationConfigs,
    description: "Years dropdown Id",
  },
};

const argTypesConfigs = {
  label: {
    description: "Sets input label",
  },
  dense: {
    description: "Reduces the input height.",
  },
  futureOnly: {
    description: "Allows only future dates.",
  },
  disabled: {
    description: "Disable the input.",
  },
  initialIsHijri: {
    description: "Toggles between hijri and gregorian dates.",
  },
  exportAsHijri: {
    description:
      "Toggles between hijri and gregorian value in <b>@change</b> event.",
  },
  format: {
    description: "The exported value format.",
  },
  minimumGregorianYear: {
    description: "Minimum gregorian year in dropdown.",
  },
  skipTodayInFutureMode: {
    description: "Includes / decludes the current day in the futures days.",
  },
  maxPreviewedYears: {
    description: `<pre>
      The count of years in dropdown menu and it's calculated as the following:
      <code>
        1- If the value is <b>negative</b>: it will be converted to positive via <b>Math.abs(number).</b> <br />
        2- If the value is <b>zero</b>: it will be the result of <b>currentYear - minimumGregorianYear.</b> 
      </code>
    </pre>`,
  },
  value: {
    description: `It should be <b>hijri</b> date in <b>iYYYY/iMM/iDD format<string></b> or <b>Gregorian</b> date in <b>YYYY/MM/DD format<string></b>
      in case of <b>initialIsHijri = false</b>
      `,
  },
  rules: {
    description:
      "Accepts a mixed array of types `function`, `boolean` and `string`. Functions pass an input value as an argument and must return either `true` / `false` or a string containing an error message. The input field will enter an error state if a function returns (or any value in the array contains) `false` or is a `string`",
  },
  // ? TestAutomation Ids
  ...testAutomationIds,

  // ? Events
  change: {
    description:
      "Fires <b>`When the value is changed`</b>, and exports `string`, <br /> `@change=date => console.log(date)` ",
    table: {
      category: "Events",
    },
  },
};

export { argTypesConfigs };
