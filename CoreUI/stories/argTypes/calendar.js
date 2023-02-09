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
  textFieldActionId: {
    ...testAutomationConfigs,
    description: "Id for text field",
  },
  pickerWrapperId: {
    ...testAutomationConfigs,
    description: "Id for the picker wrapper",
  },
  confirmActionId: {
    ...testAutomationConfigs,
    description: "Id for the confirmation button",
  },
  cancelActionId: {
    ...testAutomationConfigs,
    description: "Id for the cancel button",
  },
  resetActionId: {
    ...testAutomationConfigs,
    description: "Id for the reset button",
  },
};

const argTypesConfigs = {
  multiple: {
    description: "Select multiple values if `true` the `value will be array`.",
  },
  range: {
    description: "Select range of values if `true` the `value will be array`.",
  },
  row: {
    description: "Align switcher and the field `horizontaly, verticaly`.",
  },
  hijri: {
    description: "Toggles between hijri and gregorian.",
  },
  dense: {
    description: "Reduces the input height.",
  },
  label: {
    description: "Sets input label",
  },
  hint: {
    description: "Hint text",
  },
  value: {
    description:
      "It should be <b>string or array<string></b> based on <b>multiple or range props</b>",
  },
  rules: {
    description:
      "Accepts a mixed array of types `function`, `boolean` and `string`. Functions pass an input value as an argument and must return either `true` / `false` or a string containing an error message. The input field will enter an error state if a function returns (or any value in the array contains) `false` or is a `string`",
  },
  // ? TestAutomation Ids
  ...testAutomationIds,

  // ? Events
  onClick: {
    description: `<pre>
    Callback is used in when row arrow clicked, <b>it should be used with primaryField</b> <br />
      - <b>args: => row</b>

      <code>
        onClick(row) {
          // Your code here
        }
      </code>
    </pre>`,
    table: {
      category: "Events",
    },
  },

  // ? slots
  default: {
    table: {
      disable: true,
    },
  },

  "{fieldName}": {
    description: `<pre>If you want to customize any <b>column</b> just make a <b>scoped</b> slot with <b>of column.filed (revisit columns section)</b><br />
      - slot props: 
        <code>
          <ul>
            <li> <b>1- currentClass (string)</b>: In case you needed the current styles controlled by the package itself</li>
            <li> <b>2- data (object => { row, columns, currentIteration })</b></li>
              - row: the current row.
              - columns: columns provided from the parent.
              - currentIteration: column iteration.
          </ul>
        </code>

        <code> 
          <template name="YourColumnFieldHere">
            // Any Html here
          </template>
        </code>
    </pre>`,
    table: {
      category: "Slots",
      type: {
        summary: "html",
      },
    },
  },
};

export { argTypesConfigs };
