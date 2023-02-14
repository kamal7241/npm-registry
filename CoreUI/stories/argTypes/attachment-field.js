const testAutomationConfigs = {
  table: {
    category: "Test Automation Ids",
  },
};

const slotsConfigs = {
  table: {
    category: "Slots",
    type: {
      summary: "html",
    },
  },
};

const testAutomationIds = {
  fileInputId: {
    ...testAutomationConfigs,
    description: "Id for the <b>hidden input file</b>",
  },
  chooseFileActionId: {
    ...testAutomationConfigs,
    description: "Id for <b>Clickable button</b>",
  },
  deleteActionId: {
    ...testAutomationConfigs,
    description: "Id for the <b>Delete</b> button",
  },
  downloadActionId: {
    ...testAutomationConfigs,
    description: "Id for the <b>Download</b> button",
  },
};

const slots = {
  labelContent: {
    ...slotsConfigs,
    description: "Label Cutomization slot",
  },
  errors: {
    ...slotsConfigs,
    description:
      "Errors Cutomization slot and it will receive the **errors** as an argument which is a string.",
  },
  hints: {
    ...slotsConfigs,
    description: `<pre>
    Hints vue slot. and it will receive the ***data object*** as an argument. <br />
    <pre>
    ***data object*** contains of:
      - **allowedExtentions**: provided by ***accept*** prop.
      - **maxFilesSizeInMega**: provided by ***maxFilesSizeInMega*** prop.
      - **maxFileSizeInMega**: provided by ***maxFileSizeInMega*** prop.

      <pre>
        <code>
          < template #hints="{data}">Your hints here</template>
        </code>  
      </pre>
    </pre>
    `,
  },
  list: {
    ...slotsConfigs,
    description: `<pre>
    List vue slot. and it will receive the ***data object*** and ***onDeleteFile*** as an arguments. <br />
    <pre>
    ***data object*** contains of: **listData** which includes:
      - **files**: selected files to loop through them.
    - **onDeleteFile**: method to handle delete file

      <pre>
        <code>
          < template #list="{data, onDeleteFile}">
            <br />
            < ul v-if="data.listData.files.length"> // your list here</ul>
            <br />
          </template>
        </code>  
      </pre>
    </pre>
    `,
  },
};

const argTypesConfigs = {
  rules: {
    description:
      "Accepts a mixed array of types `function`, `boolean` and `string`. Functions pass an input value as an argument and must return either `true` / `false` or a string containing an error message. The input field will enter an error state if a function returns (or any value in the array contains) `false` or is a `string`",
  },
  localizations: {
    description: `Localization for available strings, available strings are<br />
    <ol>
      <li>**placeholder**: *Placeholder for input field in ( Fancy Mode )* and default is ***''***</li>
      <li>**actionName**: *Button Label ( Fancy Mode )* and default is ***استعراض الملفات***</li>
      <li>**clickHere**: *Button Label ( Normal Mode )* and default is ***اضغط هنا***</li>
      <li>**chooseFile**: *Placeholder for input field in ( Normal Mode )* and default is ***اختر ملف***</li>
      <li>**serverLoadingText**: *placeholder for input field in ( serverSideMode Mode )* and default is ***'جاري تحميل البيانات ...***</li>
    </ol>
      `,
  },
  // ! to be enhanced
  value: {
    description: `files to update the ui in the **and it differs from clientside and serverside`,
  },
  maxFileSizeInMega: {
    description: "**max `single` file size**",
  },
  maxFilesSizeInMega: {
    description: "**total size for the `selected files`**",
  },
  maxDisplayNameLength: {
    description:
      "If the file name is too long it will **cut it based on it's value**",
  },
  maxAttachments: {
    description: "max selected attachments number**",
  },
  isMultiple: {
    description: "to make the input multiselect**",
  },
  enableFancyPreview: {
    description: "Switch between **Normal/fancy look**",
  },
  resetErrorOnSelect: {
    description: "to clear the error when choosing a new file",
  },
  activateInternalErrorPreview: {
    description: "to show internal error",
  },
  isRequired: {
    description: "Adds ***** with the label",
  },
  enableFullnameDisplay: {
    description:
      "If **true** it will provide the fullName of the file regardless **maxDisplayNameLength** prop",
  },
  validateOnSingleFileSize: {
    description:
      "If **true** the selection will validate based on ***maxFileSizeInMega***",
  },
  readOnlyMode: {
    description: "Disables The Field",
  },
  exportInitialFieldMeta: {
    description: "Update Parent with Field info",
  },
  label: {
    description: "Label for input field",
  },
  name: {
    description: "field name to map results and errors to",
  },
  accept: {
    description: `the file types the file input should accept. [Accept Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)`,
  },
  enableServerSide: {
    description: "To enable Serverside auto upload",
  },
  updateParentWithFileMeta: {
    description:
      "To send the **original file** with the value recieved via **@select** event",
  },
  attachmentTypeId: {
    description: "To Identify the type sent to the server",
  },
  uploadCallback: {
    description:
      "callback that is reponsible for return **sharepointId** and it **receives(base64Meta) which is { source, base64, contentType }**",
  },
  downloadCallback: {
    description:
      "callback that is reponsible for return the **originalFile** from setver and it **receives(sharepointMeta) which is { sharepointId -> original, encodedSharepointId -> base64, contentType -> optional, fileGenerator } **",
  },
  // ? TestAutomation Ids
  ...testAutomationIds,
  // ? Events
  search: {
    description:
      "function that exposes an **object ( { data, totalCount } )** as the first param ",
    table: {
      category: "Events",
    },
  },
  // ? Slots
  ...slots,
};

export { argTypesConfigs };
