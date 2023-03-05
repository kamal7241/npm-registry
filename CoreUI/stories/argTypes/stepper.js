const slotsConfigs = {
  table: {
    category: "Slots",
    type: {
      summary: "html",
    },
  },
};

const slots = {
  default: {
    table: {
      disable: true,
    },
  },
  header: {
    ...slotsConfigs,
    description:
      "Header Cutomization slot and it takes <b>currentStep</b> as a param",
  },
};

const argTypesConfigs = {
  showContent: {
    table: {
      disable: true,
    },
  },
  showNavigation: {
    table: {
      disable: true,
    },
  },
  showCustomHeader: {
    table: {
      disable: true,
    },
  },
  scrollTopOnNavigation: {
    description: "Scroll to the top after navigation between steps.",
  },
  steps: {
    description: `<pre>
    Array of steps , <b><i>Each object represents a step to be shown and has a schema</i></b>.<br />
    - step Schema: 
    <code>
      <ul>
        <li> <b>1- title :</b> Represents the step header title.</li>
        <li> <b>2- slotName [Required]:</b> any name and it will be used to provide the content for this step</li> <br />
        and each slot will recieve <b>actionsProps</b> object which contans
      </ul>
      <ul>
        <li> <b>2- next():</b> To navigate to next step.</li> 
        <li> <b>1- prev():</b> To navigate to prev step.</li>
        <li> <b>2- goTo(stepNumber):</b> To navigate to <b>any</b> step.</li> 
        <li> <b>2- currentStep:</b> The current step you are in.</li> 
      </ul>
    </code>
  </pre>
  `,
  },
  ...slots,
};

export { argTypesConfigs };
