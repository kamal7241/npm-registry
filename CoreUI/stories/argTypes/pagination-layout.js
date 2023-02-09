const testAutomationConfigs = {
  table: {
    category: "Test Automation Ids",
  },
};

const testAutomationIds = {
  changePageSizeActionId: {
    ...testAutomationConfigs,
    description: "Id for page size dropdown",
  },
  lastPageActionId: {
    ...testAutomationConfigs,
    description: "Id for last page button",
  },
  nextPageActionId: {
    ...testAutomationConfigs,
    description: "Id for next page button",
  },
  prevPageActionId: {
    ...testAutomationConfigs,
    description: "Id for previous page button",
  },
  firstPageActionId: {
    ...testAutomationConfigs,
    description: "Id for first page button",
  },
  pagniateActionId: {
    ...testAutomationConfigs,
    description: "Id for pagination actions wrapper",
  },
};

const argTypesConfigs = {
  endpoint: {
    description: `Required function that is needed to **call the API**. <br />
      <pre>
         - parameters:
           1 - serverSideParam(string | object): 
             **Default **As string (**By default**): **serverSideLink  =>  fetch('YourApiHere/{serverSideLink})**
            **If exportPayloadAsObject: true =>  As object**  **serverSideParams  =>  axios.post(api, serverSideParams)**
             </pre>
    `,
  },
  additionalPayload: {
    description: `Any params for the endpoint need to be sent with request <br />
      **Behavior: **
      <pre>
        - **default**: It will be **serialized** with pagination params and it will be exported as a <code>**query string**</code> 
                       to the endpoint function.
        - **If exportPayloadAsObject: false**: It will be **concatinated** with pagination params and 
                       it will be exported as an <code>**object**</code> to the endpoint function**** 
      </pre>  
    `,
  },
  pageSizeOptions: {
    description: `Array of page size **options** to view`,
  },
  initialPageNumber: {
    description: "**Initial page to start with.**",
  },
  pageSize: {
    description: "**Items per page**",
  },
  totalVisiblePages: {
    description: "_Total Number of visible pagination Buttons_",
  },
  dataTargetKey: {
    description: "**Data key in the response**",
  },
  totalCountKey: {
    description: "**Total count prop key in response**",
  },
  serverPageNumberKey: {
    description: "**Page parameter key** for the request",
  },
  serverPageSizeKey: {
    description: "**Page size(items per page) key** for the request",
  },
  nestedDataKey: {
    description:
      "Change the data target in case of the data is not direct in the response and it is nested",
  },
  cascadeMode: {
    description:
      "keeps the previous received results and append the new to them",
  },
  isDisabled: {
    description: "**_option to disable the pagination_**",
  },
  showLoader: {
    description: "Hide or show loader layout",
  },
  isDirectData: {
    description:
      "**Targets the data directly and no need for nested selection** and only related to **Client side Pagination **",
  },
  enableServerSidePagination: {
    description: "**Enables ServerSidePagination**",
  },
  enableReadableStreamParse: {
    description:
      "parse the response if it is **Readable Stream data** like response from **fetch API.**",
  },
  fetchOnMount: {
    description: "Control the initial fetch on mount.",
  },
  exportPayloadAsObject: {
    description:
      "Send payload to endpoint as an **object** body like in post otherwise it will be a **query string**",
  },
  fetchOnPayloadChange: {
    description: "**Triger the fetch on payload change if needed.",
  },
  resetPageIndexOnPayloadChange: {
    description:
      "Resets the page index on payload change to gurantee the right calculations and results if needed",
  },
  emptyPlaceholderText: {
    description: "_Replace the text of empty list placeholder text_",
  },
  value: {
    description: `_value to be paginated and_ ***It doesn't work with fetch or any api call*** (**Server side**) so in order to make it work follow the following rules*
    <pre>
    <code>
    - 1. **Don't provide**: _*endpoint prop*_
    - 2. **fetchOnMount**: _pass it with **false**_
    - 3. **enableServerSidePagination**: _pass it with **false**_
    </code>  
    <pre>
    `,
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
};

export { argTypesConfigs };
