const argTypesConfigs = {
  rows: {
    description:
      "Array of object, <b>mainly it will be the response from the server</b>",
  },
  columns: {
    description: `<pre>
      Array of objects, <b><i>Each object represents a column to be shown and has a schema</i></b>.<br />
      - column Schema: 
      <code>
        <ul>
          <li> <b>1- field [Required]:</b> Represents a key in a row object to map its value.</li>
          <li> <b>2- title:</b> title for the column</li>
          <li> <b>3- formatter(row):</b>In case you needed to modify the field value and <b>it takes the row as an argument</b></li>
        </ul>
      </code>
    </pre>
    `,
  },
  isLoading: {
    description: "Loading mode, replace columns with loading slots.",
  },
  primaryField: {
    description: `<pre>
    <b>Should matchs any field from columns array.</b>
    - It will make the following on the primary field/column.field: 
    <code>
      <ul>
        <li> <b>1- It will sort the column to be the first one rendered</b>.</li>
        <li> <b>2- It will highlight it with a background.</b></li>
      </ul>
    </code>
  </pre>
  `,
  },
  wrapperClass: {},
  // ? Events
  onClick: {
    table: {
      category: "Events",
    },
  },
  // ? Test automation ids
  clickPrimaryFieldAction: {
    description: "Id for clickable action",

    table: {
      category: "Test Automation Ids",
    },
  },
};

export { argTypesConfigs };
