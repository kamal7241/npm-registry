<template>
  <div class="listing-items-cont">
    <div class="inquery-item-cont" v-for="(row, index) in vbt_rows" :key="index">
      <slot :name="getCellSlotName(vbt_columns[0])"
            :row="row"
            :column="vbt_columns[0]"
            :cell_value="getValueFromRow(row,vbt_columns[0].name)"></slot>
      <div class="inquery-item-info-cont">
        <div class="fw-1 inquery-item-info"
             v-for="(column, key, index) in vbt_columns.slice(1)"
             :key="index"
             v-if="checkColumnVisibility(column,row)">
          <div class="inquery-item-info-t">{{column.label}}</div>
          <div class="inquery-item-info-v">
            <slot :name="getCellSlotName(column)"
                  :row="row"
                  :column="column"
                  :cell_value="getValueFromRow(row,column.name)">{{getValueFromRow(row,column.name)}}</slot>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-if="havePagination"
      :page="page"
      :per_page="per_page"
      :total="totalRows"
      :num_of_visibile_pagination_buttons="num_of_visibile_pagination_buttons"
      :per_page_options="per_page_options"
      :dir="'rtl'"
      @update:page="update_page"
      @update:per_page="update_per_page"
     >
   </Pagination>
  </div>
</template>

<script>
  const momentHijri = require("moment-hijri");

  import findIndex from "lodash/findIndex";
  import filter from "lodash/filter";
  import includes from "lodash/includes";
  import map from "lodash/map";
  import has from "lodash/has";
  import extend from "lodash/extend";
  import isEmpty from "lodash/isEmpty";
  import isEqual from "lodash/isEqual";
  import debounce from "lodash/debounce";
  import cloneDeep from "lodash/cloneDeep";
  import differenceWith from "lodash/differenceWith";
  import differenceBy from "lodash/differenceBy";
  import intersectionWith from "lodash/intersectionWith";
  import intersectionBy from "lodash/intersectionBy";
  import orderBy from "lodash/orderBy";
  import get from "lodash/get";
  import omit from "lodash/omit";
  import clone from "lodash/clone";

  import Row from "./Row.vue";
  import CheckBox from "./CheckBox.vue";
  import SelectAllRowsCheckBox from "./SelectAllRowsCheckBox.vue";
  import SortIcon from "./SortIcon.vue";
  import Pagination from "./Pagination.vue";
  import Simple from "./Filters/Simple.vue";
  import DateFilter from "./Filters/DateFilter.vue";
  import MultiSelect from "./Filters/MultiSelect.vue";

  import { EventBus } from "./event-bus.js";
  import moment from "moment";

  export default {
    name: "DataTable",
    props: {
      rows: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      totalRows: {
        type: Number,
        default: 0
      },
      config: {
        type: Object,
        default() {
          return {};
        }
      },
      classes: {
        type: Object,
        default() {
          return {};
        }
      },
      actions: {
        type: Array,
        default() {
          return [];
        }
      },
      customFilters: {
        type: Array,
        default() {
          return [];
        }
      },
      havePagination: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        from_1_to: "",
        vbt_rows: [],
        vbt_columns: [],
        query: {
          sort: [],
          filters: [],
          global_search: ""
        },
        page: 1,
        per_page: 10,
        original_rows: [],
        num_of_visibile_pagination_buttons: 5,
        temp_filtered_results: [],
        pagination: this.havePagination,
        pagination_info: true,
        checkbox_rows: false,
        selected_items: [],
        highlight_row_hover: true,
        highlight_row_hover_color: "#d6d6d6",
        rows_selectable: false,
        allRowsSelected: false,
        multi_column_sort: false,
        card_title: "",
        global_search: {
          placeholder: "Enter search text",
          class: "",
          visibility: true,
          case_sensitive: false,
          showClearButton: true,
          searchOnPressEnter: false,
          searchDebounceRate: 60,
          init: {
            value: ""
          }
        },
        per_page_options: [5, 10, 15],
        show_refresh_button: true,
        show_reset_button: true,
        server_mode: false,
        total_rows: 0,
        card_mode: true,
        selected_rows_info: false,
        lastSelectedItemIndex: null,
        isFirstTime: true,
        isResponsive: true,
        preservePageOnDataChange: false,
        canEmitQueries: false,
        dir: {},
        ar: {},
        en: {}
      };
    },
    mounted() {
      this.ar = {
        Enter_search_text: "أدخل نص البحث",
        Refresh: "إعادة التحميل",
        Reset_Query: "إعادة التعيين ",
        No_results_found: "لا توجد نتائج",
        total_records: "مجموع السجلات",
        rows_selected: "الصفوف المحددة",
        From_1_to: "من 1 الى",
        of: "من",
        entries: "سجل",
        Go_to_page: "انتقل إلى صفحة"
      };

      this.en = {
        Enter_search_text: "Enter search text",
        Refresh: "Refresh",
        Reset_Query: "Reset Query",
        No_results_found: "No results found",
        total_records: "total records",
        rows_selected: "rows selected",
        From_1_to: "From 1 to",
        of: "of",
        entries: "entries",
        Go_to_page: "Go to page"
      };

      this.from_1_to =
        has(this.config, "dir") && this.config.dir == "rtl"
          ? this.ar.From_1_to
          : this.en.From_1_to;

      this.vbt_rows = cloneDeep(this.rows);
      this.vbt_columns = cloneDeep(this.columns);
      const self = this;
      // check if user mentioned unique id for a column, if not set unique id for all items
      this.original_rows = map(this.vbt_rows, (element, index) => {
        const extra = {};
        if (!self.hasUniqueId) {
          extra.vbt_id = index + 1;
        }
        return extend({}, element, extra);
      });

      this.vbt_columns = map(this.vbt_columns, (element, index) => {
        const extra = {};
        extra.vbt_col_id = index + 1;
        return extend({}, element, extra);
      });

      this.initConfig();
      this.initialSort();
      this.initFilterQueries();

      if (this.global_search.visibility) {
        this.$nextTick(() => {
          this.initGlobalSearch();
        });
      }

      this.$nextTick(() => {
        if (!this.server_mode) {
          this.filter(false, true);
        } else {
          this.canEmitQueries = true;
          this.emitQueryParams();
        }
      });

      this.handleShiftKey();
    },
    components: {
      Row,
      CheckBox,
      SelectAllRowsCheckBox,
      Simple,
      MultiSelect,
      SortIcon,
      Pagination,
      DateFilter
    },
    methods: {
      checkColumnVisibility(column, row) {
        if (typeof column.visible !== 'function') {
          return true;
        }
        return column.visible(row);
      },
      update_page(payload) {
        this.page = payload;
        // this.$emit('on-change-page', payload);
      },
      update_per_page(payload) {
        this.per_page = payload;
        this.$emit('on-change-per-page', payload);
      },
    initConfig() {
        if (isEmpty(this.config)) {
          return;
        }

        this.dir =
          has(this.config, "dir") && this.config.dir == "rtl" ? this.ar : this.en;

        this.global_search.placeholder = this.dir.Enter_search_text;

        this.pagination = has(this.config, "pagination")
          ? this.config.pagination
          : false;

        this.num_of_visibile_pagination_buttons = has(
          this.config,
          "num_of_visibile_pagination_buttons"
        )
          ? this.config.num_of_visibile_pagination_buttons
          : 7;

        this.per_page_options = has(this.config, "per_page_options")
          ? this.config.per_page_options
          : [5, 10, 15];

        this.per_page = has(this.config, "per_page") ? this.config.per_page : 10;

        this.page = has(this.config, "page") ? this.config.page : 1;

        this.checkbox_rows = has(this.config, "checkbox_rows")
          ? this.config.checkbox_rows
          : false;

        this.highlight_row_hover = has(this.config, "highlight_row_hover")
          ? this.config.highlight_row_hover
          : true;

        this.highlight_row_hover_color = has(
          this.config,
          "highlight_row_hover_color"
        )
          ? this.config.highlight_row_hover_color
          : "#d6d6d6";

        this.rows_selectable = has(this.config, "rows_selectable")
          ? this.config.rows_selectable
          : false;

        this.multi_column_sort = has(this.config, "multi_column_sort")
          ? this.config.multi_column_sort
          : false;

        this.pagination_info = has(this.config, "pagination_info")
          ? this.config.pagination_info
          : true;

        this.card_title = has(this.config, "card_title")
          ? this.config.card_title
          : "";

        if (has(this.config, "global_search")) {
          this.global_search.placeholder = has(
            this.config.global_search,
            "placeholder"
          )
            ? this.config.global_search.placeholder
            : "Enter search text";
          this.global_search.visibility = has(
            this.config.global_search,
            "visibility"
          )
            ? this.config.global_search.visibility
            : true;
          this.global_search.case_sensitive = has(
            this.config.global_search,
            "case_sensitive"
          )
            ? this.config.global_search.case_sensitive
            : false;
          this.global_search.showClearButton = has(
            this.config.global_search,
            "showClearButton"
          )
            ? this.config.global_search.showClearButton
            : true;
          this.global_search.searchOnPressEnter = has(
            this.config.global_search,
            "searchOnPressEnter"
          )
            ? this.config.global_search.searchOnPressEnter
            : false;
          this.global_search.searchDebounceRate = has(
            this.config.global_search,
            "searchDebounceRate"
          )
            ? this.config.global_search.searchDebounceRate
            : 60;
          this.global_search.class = has(this.config.global_search, "class")
            ? this.config.global_search.class
            : "";
          this.global_search.init.value = has(
            this.config.global_search,
            "init.value"
          )
            ? this.config.global_search.init.value
            : "";
        }

        this.show_refresh_button = has(this.config, "show_refresh_button")
          ? this.config.show_refresh_button
          : true;

        this.show_reset_button = has(this.config, "show_reset_button")
          ? this.config.show_reset_button
          : true;

        this.server_mode = has(this.config, "server_mode")
          ? this.config.server_mode
          : false;

        this.card_mode = has(this.config, "card_mode")
          ? this.config.card_mode
          : true;

        this.selected_rows_info = has(this.config, "card_mode")
          ? this.config.selected_rows_info
          : false;

        this.preservePageOnDataChange = has(
          this.config,
          "preservePageOnDataChange"
        )
          ? this.config.preservePageOnDataChange
          : false;
      },

      initialSort() {
        // TODO optimze this with removing this filter
        const initial_sort_columns = filter(
          this.vbt_columns,
          column => has(column, "initial_sort") && column.initial_sort == true
        );

        initial_sort_columns.some(initial_sort_column => {
          const result = findIndex(this.query.sort, {
            vbt_col_id: initial_sort_column.vbt_col_id
          });

          if (result == -1) {
            // initial sort order validation starts here
            let initial_sort_order = "asc";
            if (has(initial_sort_column, "initial_sort_order")) {
              if (
                includes(["asc", "desc"], initial_sort_column.initial_sort_order)
              ) {
                initial_sort_order = initial_sort_column.initial_sort_order;
              } else {
                console.log(
                  "invalid initial_sort_order, so setting it to default"
                );
              }
            }
            // initial sort order validation ends here
            this.query.sort.push({
              vbt_col_id: initial_sort_column.vbt_col_id,
              name: initial_sort_column.name,
              order: initial_sort_order,
              caseSensitive: this.isSortCaseSensitive(initial_sort_column)
            });
          }
          // else {
          //     this.query.sort[result].order = initial_sort_column.initial_sort_order;
          // }

          // if multicolum sort sort is false, then consider only first initial sort column
          if (!this.multi_column_sort) {
            return true;
          }
        });
      },

      initGlobalSearch() {
        if (this.$refs.global_search){
           this.$refs.global_search.value = this.global_search.init.value;
        }
        if (this.query) {
           this.query.global_search = this.global_search.init.value;
        }
      },

      hasFilter(column) {
        return has(column, "filter.type");
      },

      clearFilter(column) {
        const filter_index = this.getFilterIndex(column);
        if (filter_index !== -1) {
          this.query.filters.splice(filter_index, 1);
        }
      },

      getFilterIndex(column) {
        return findIndex(this.query.filters, {
          name: column.name
        });
      },

      initFilterQueries() {
        this.vbt_columns.forEach(vbt_column => {
          if (!has(vbt_column, "filter")) return;

          if (vbt_column.filter.type == "simple") {
            if (!has(vbt_column, "filter.init.value")) return;

            this.updateFilter({
              value: vbt_column.filter.init.value,
              column: vbt_column
            });
          } else if (vbt_column.filter.type == "select") {
            if (!has(vbt_column, "filter.init.value")) return;

            let initialValues = [];
            if (vbt_column.filter.mode == "multi") {
              if (Array.isArray(vbt_column.filter.init.value)) {
                initialValues = vbt_column.filter.init.value;
              } else {
                console.log("Initial value for 'multi' mode should be an array");
              }
            } else if (vbt_column.filter.mode == "single") {
              if (
                Number.isInteger(vbt_column.filter.init.value) &&
                vbt_column.filter.init.value > -1
              ) {
                initialValues = [vbt_column.filter.init.value];
              } else {
                console.log(
                  "Initial value for 'single' mode should be a single number and greater than -1"
                );
              }
            }

            const selected_options = vbt_column.filter.options
              .filter((_, index) => includes(initialValues, index))
              .map(filtered_option => filtered_option.value);

            this.updateMultiSelectFilter({
              selected_options,
              column: vbt_column
            });
          }
        });
      },

      isSortCaseSensitive(column) {
        return column.sortCaseSensitive != undefined
          ? column.sortCaseSensitive
          : true;
      },

      updateSortQuery(column) {
        const result = findIndex(this.query.sort, {
          vbt_col_id: column.vbt_col_id
        });

        if (result == -1) {
          if (!this.multi_column_sort) {
            this.query.sort = [];
          }
          this.query.sort.push({
            vbt_col_id: column.vbt_col_id,
            name: column.name,
            order: "asc",
            caseSensitive: this.isSortCaseSensitive(column)
          });
        } else {
          this.query.sort[result].order =
            this.query.sort[result].order == "asc" ? "desc" : "asc";
        }
      },
      isShiftSelection(shiftKey, rowIndex) {
        return (
          shiftKey == true &&
          this.lastSelectedItemIndex != null &&
          this.lastSelectedItemIndex != rowIndex
        );
      },
      handleAddRow(payload) {
        const row = this.vbt_rows[payload.rowIndex];
        if (this.isShiftSelection(payload.shiftKey, payload.rowIndex)) {
          const rows = this.getShiftSelectionRows(payload.rowIndex);
          rows.forEach(_row => {
            this.addSelectedItem(_row);
          });
        } else {
          this.addSelectedItem(row);
        }

        this.$emit("on-select-row", {
          selected_items: cloneDeep(this.selected_items),
          selected_item: row
        });

        let difference = [];

        if (this.server_mode && !this.hasUniqueId) {
          difference = differenceWith(
            this.vbt_rows,
            this.selected_items,
            isEqual
          );
        } else {
          difference = differenceBy(
            this.vbt_rows,
            this.selected_items,
            this.uniqueId
          );
        }

        if (difference.length == 0) {
          this.allRowsSelected = true;
          // EventBus.$emit('select-select-all-items-checkbox', "from main");
        } else {
          this.allRowsSelected = false;
          // EventBus.$emit('unselect-select-all-items-checkbox', "from main");
        }

        this.lastSelectedItemIndex = payload.rowIndex;
      },

      getActionButtonClass(action) {
        return has(action, "class") ? action.class : " btn-secondary";
      },

      handleRemoveRow(payload) {
        const row = this.vbt_rows[payload.rowIndex];
        if (this.isShiftSelection(payload.shiftKey, payload.rowIndex)) {
          const rows = this.getShiftSelectionRows(payload.rowIndex);
          rows.forEach(_row => {
            this.removeSelectedItem(_row);
          });
        } else {
          this.removeSelectedItem(row);
        }
        this.$emit("on-unselect-row", {
          selected_items: cloneDeep(this.selected_items),
          unselected_item: row
        });
        // EventBus.$emit('unselect-select-all-items-checkbox');
        this.allRowsSelected = false;
        this.lastSelectedItemIndex = payload.rowIndex;
      },
      addSelectedItem(item) {
        let index = -1;
        if (this.server_mode && !this.hasUniqueId) {
          index = findIndex(this.selected_items, selected_item =>
            isEqual(selected_item, item)
          );
        } else {
          index = findIndex(
            this.selected_items,
            selected_item => selected_item[this.uniqueId] == item[this.uniqueId]
          );
        }

        if (index == -1) {
          this.selected_items.push(item);
        }
      },
      selectAllItems() {
        let difference = [];

        if (this.server_mode && !this.hasUniqueId) {
          difference = differenceWith(
            this.vbt_rows,
            this.selected_items,
            isEqual
          );
        } else {
          difference = differenceBy(
            this.vbt_rows,
            this.selected_items,
            this.uniqueId
          );
        }

        this.selected_items.push(...difference);

        this.$emit("on-all-select-rows", {
          selected_items: cloneDeep(this.selected_items)
        });
      },
      unSelectAllItems() {
        let difference = [];

        if (this.server_mode && !this.hasUniqueId) {
          const result = intersectionWith(
            this.vbt_rows,
            this.selected_items,
            isEqual
          );
          difference = differenceWith(this.selected_items, result, isEqual);
        } else {
          const result = intersectionBy(
            this.vbt_rows,
            this.selected_items,
            this.uniqueId
          );
          difference = differenceBy(this.selected_items, result, this.uniqueId);
        }

        this.selected_items = difference;

        this.$emit("on-all-unselect-rows", {
          selected_items: cloneDeep(this.selected_items)
        });
      },
      removeSelectedItem(item) {
        // TODO try with findbyId function
        this.selected_items.some((selected_item, index) => {
          if (isEqual(item, selected_item)) {
            this.selected_items.splice(index, 1);
            return true;
          }
        });
      },
      getShiftSelectionRows(rowIndex) {
        let start = 0;
        let end = 0;
        if (this.lastSelectedItemIndex < rowIndex) {
          start = this.lastSelectedItemIndex;
          end = rowIndex + 1;
        } else if (this.lastSelectedItemIndex > rowIndex) {
          start = rowIndex;
          end = this.lastSelectedItemIndex + 1;
        }
        return this.vbt_rows.slice(start, end);
      },
      updateFilter(payload) {
        const value =
          typeof payload.value === "number"
            ? payload.value.toString()
            : payload.value;
        const { column } = payload;
        const filter_index = findIndex(this.query.filters, {
          name: column.name
        });
        if (filter_index == -1) {
          if (value !== "") {
            this.query.filters.push({
              type: column.filter.type,
              name: column.name,
              text: value.trim(),
              config: column.filter
            });
          }
        } else if (value === "") {
          this.query.filters.splice(filter_index, 1);
        } else {
          this.query.filters[filter_index].text = value.trim();
        }
      },
      updateMultiSelectFilter(payload) {
        const { selected_options } = payload;
        const { column } = payload;

        const filter_index = findIndex(this.query.filters, {
          name: column.name
        });

        if (filter_index == -1) {
          if (selected_options.length === 0) {
            return;
          }
          this.query.filters.push({
            type: column.filter.type,
            mode: column.filter.mode,
            name: column.name,
            selected_options,
            config: column.filter
          });
        } else if (selected_options.length === 0) {
          this.query.filters.splice(filter_index, 1);
        } else {
          this.query.filters[filter_index].selected_options = selected_options;
        }
      },
      updateDateSelectFilter(payload) {
        const { value } = payload;
        const { column } = payload;

        const filter_index = findIndex(this.query.filters, {
          name: column.name
        });

        if (filter_index == -1) {
          this.query.filters.push({
            type: column.filter.type,
            mode: column.filter.mode,
            name: column.name,
            date: value,
            config: column.filter
          });
        } else {
          this.query.filters[filter_index].date = value;
        }
      },
      sort() {
        if (this.query.sort.length != 0) {
          const orders = this.query.sort.map(sortConfig => sortConfig.order);

          this.temp_filtered_results = orderBy(
            this.temp_filtered_results,
            this.query.sort.map(sortConfig => row => {
              const value = get(row, sortConfig.name);
              if (sortConfig.caseSensitive) return value != null ? value : "";
              return value != null ? value.toString().toLowerCase() : "";
            }),
            orders
          );
        }

        this.paginateFilter();
      },
      isDate(date) {
        if (date == null || date == "") return null;
        let d = new Date(date);
        if (isNaN(d)) return null;
        d.setHours(0, 0, 0);
        return d;
      },

      filter(resetPage = true, isInit = false) {
        const res = filter(this.original_rows, row => {
          let flag = true;
          this.query.filters.some((filter, key) => {
            if (filter.type === "simple") {
              if (
                this.simpleFilter(
                  get(row, filter.name),
                  filter.text,
                  filter.config
                )
              ) {
                // continue to next filter
                flag = true;
              } else {
                // stop here and break loop since one filter has failed
                flag = false;
                return true;
              }
            } else if (filter.type === "select") {
              if (
                this.multiSelectFilter(
                  get(row, filter.name),
                  filter.selected_options,
                  filter.config
                )
              ) {
                flag = true;
              } else {
                flag = false;
                return true;
              }
            } else if (filter.type === "custom") {
              const index = findIndex(this.vbt_columns, { name: filter.name });
              if (index > -1) {
                const column = this.vbt_columns[index];
                if (column.filter.validator) {
                  const result = column.filter.validator(
                    get(row, filter.name),
                    filter.text
                  );
                  if (result == true || result == undefined) {
                    flag = true;
                  } else {
                    flag = false;
                    return true;
                  }
                } else {
                  flag = true;
                }
              } else {
                flag = true;
              }
            } else if (filter.type === "date") {
              if (
                filter.data &&
                filter.data.fromDate &&
                filter.data.toDate &&
                this.dateSelectedFilter(row, filter)
              ) {
                flag = true;
              } else if (
                filter.data &&
                filter.data.fromDate &&
                filter.data.toDate
              ) {
                flag = false;
              } else {
                flag = true;
              }
              return true;
            }
          });
          return flag;
        });

        this.temp_filtered_results = res;

        // Do global search only if global search text is not empty and
        // filtered results is also not empty
        if (this.query.global_search !== "" && this.rowCount != 0) {
          this.temp_filtered_results = this.globalSearch(
            this.temp_filtered_results
          );
        }

        this.sort();
        if (resetPage || this.rowCount == 0) {
          this.page = 1;
        } else if (!isInit) {
          const newTotalPage = Math.ceil(this.rowCount / this.per_page);
          this.page = this.page <= newTotalPage ? this.page : newTotalPage;
        }
      },

      globalSearch(temp_filtered_results) {
        const global_search_results = filter(temp_filtered_results, row => {
          let flag = false;

          this.vbt_columns.some((vbt_column, key) => {
            let value = get(row, vbt_column.name);
            let global_search_text = this.query.global_search;

            if (value == null || typeof value === "undefined") {
              value = "";
            }

            if (typeof value !== "string") {
              value = value.toString();
            }

            if (typeof global_search_text !== "string") {
              global_search_text = global_search_text.toString();
            }

            if (!this.global_search.case_sensitive) {
              value = value.toLowerCase();
              global_search_text = global_search_text.toLowerCase();
            }

            if (value.indexOf(global_search_text) > -1) {
              flag = true;
            }
          });

          return flag;
        });

        return global_search_results;
      },
      simpleFilter(value, filter_text, config) {
        if (value == null || typeof value === "undefined") {
          value = "";
        }

        if (typeof value !== "string") {
          value = value.toString();
        }

        if (typeof filter_text !== "string") {
          value = filter_text.toString();
        }

        const is_case_sensitive = has(config, "case_sensitive")
          ? config.case_sensitive
          : false;

        if (!is_case_sensitive) {
          value = value.toLowerCase();
          filter_text = filter_text.toLowerCase();
        }

        return value.indexOf(filter_text) > -1;
      },
      multiSelectFilter(value, selected_options, config) {
        if (typeof value !== "string") {
          value = value.toString().toLowerCase();
        } else {
          value = value.toLowerCase();
        }

        selected_options = map(selected_options, option =>
          typeof option !== "string"
            ? option.toString().toLowerCase()
            : option.toLowerCase()
        );
        return includes(selected_options, value);
        // let is_case_sensitive = (has(config,'case_sensitive')) ? config.case_sensitive : false;

        // if (!is_case_sensitive) {
        //     value = value.toLowerCase();
        //     filter_text = filter_text.toLowerCase();
        // }

        // return value.indexOf(filter_text) > -1;
      },
      dateSelectedFilter(row, filter) {
        let from = null;
        let to = null;
        momentHijri.locale("en");
        if (filter.config && filter.config.isHijri) {
          from = this.isDate(
            momentHijri(filter.date.fromDate, "iD/iM/iYYYY").format("M/D/YYYY")
          );

          to = this.isDate(
            momentHijri(filter.date.toDate, "iD/iM/iYYYY").format("M/D/YYYY")
          );
        } else {
          from = this.isDate(
            momentHijri(filter.date.fromDate, "D/M/YYYY").format("M/D/YYYY")
          );
          to = this.isDate(
            momentHijri(filter.date.toDate, "D/M/YYYY").format("M/D/YYYY")
          );
        }
        let dateField;
        if (filter.config.gregorianFieldName)
          dateField = filter.config.gregorianFieldName
            .split(".")
            .reduce((a, v) => a[v], row);
        else dateField = filter.name.split(".").reduce((a, v) => a[v], row);
        let rowDate = this.isDate(dateField);
        if (
          rowDate.getTime() >= from.getTime() &&
          rowDate.getTime() <= to.getTime()
        ) {
          return true;
        } else {
          return false;
        }
      },

      paginateFilter() {
        if (this.pagination) {
          const start = (this.page - 1) * this.per_page;
          const end = start + this.per_page;
          this.vbt_rows = this.temp_filtered_results.slice(start, end);
        } else {
          this.vbt_rows = cloneDeep(this.temp_filtered_results);
        }
      },

      selectAllCheckbox() {
        if (this.allRowsSelected || this.currentPageSelectionCount > 0) {
          this.unSelectAllItems();
          this.allRowsSelected = false;
        } else {
          this.selectAllItems();
          this.allRowsSelected = true;
        }
      },

      isSortableColumn(column) {
        if (!has(column, "sort")) {
          return false;
        }
        return column.sort;
      },
      // row method starts here
      getValueFromRow(row, name) {
        return get(row, name);
      },
      getCellSlotName(column) {
        if (has(column, "slot_name")) {
          return column.slot_name;
        }
        return column.name.replace(/\./g, "_");
      },
      // row method ends here
      resetSort() {
        this.query.sort = [];
        this.filter(!this.preservePageOnDataChange);
      },

      updateGlobalSearchHandler(value) {
        this.query.global_search = value;
      },

      clearGlobalSearch() {
        this.query.global_search = "";
        this.$refs.global_search.value = "";
      },

      resetQuery() {
        this.query = {
          sort: [],
          filters: [],
          global_search: ""
        };

        this.$refs.global_search.value = "";
        EventBus.$emit("reset-query");
      },

      emitQueryParams(page = null) {
        if (this.server_mode && this.canEmitQueries) {
          const queryParams = cloneDeep(this.query);
          const sort = map(queryParams.sort, o => omit(o, "vbt_col_id"));
          const filters = map(queryParams.filters, o => omit(o, "config"));
          const { global_search } = queryParams;
          const per_page = clone(this.per_page);

          if (page == null) {
            if (this.preservePageOnDataChange) {
              page = this.page;
            } else {
              this.page = 1;
              page = 1;
            }
          }

          const payload = {
            sort,
            filters,
            global_search,
            per_page,
            page
          };

          this.$emit("on-change-query", payload);
        }
      },
      columnClasses(column) {
        let classes = "";

        const default_text_alignment = "text-center";

        // decide text alignment class - starts here
        const alignments = [
          "text-justify",
          "text-right",
          "text-left",
          "text-center"
        ];
        if (
          has(column, "column_text_alignment") &&
          includes(alignments, column.column_text_alignment)
        ) {
          classes = `${classes} ${column.column_text_alignment}`;
        } else {
          classes = `${classes} ${default_text_alignment}`;
        }
        // decide text alignment class - ends here

        // adding user defined classes to rows - starts here
        if (has(column, "column_classes")) {
          classes = `${classes} ${column.column_classes}`;
        }
        // adding user defined classes to rows - ends here

        // adding classes for sortable column - starts here
        if (this.isSortableColumn(column)) {
          classes += " vbt-sort-cursor";
        }
        // adding classes for sortable column - ends here

        return classes;
      },

      handleShiftKey() {
        ["keyup", "keydown"].forEach(event => {
          window.addEventListener(event, e => {
            document.onselectstart = function () {
              return !(e.key == "Shift" && e.shiftKey == true);
            };
          });
        });
      },
      emitActionEvent(action) {
        const payload = {
          event_payload: cloneDeep(action.event_payload)
        };

        if (this.isSelectable) {
          payload.selectedItems = cloneDeep(this.selected_items);
        }

        this.$emit(action.event_name, payload);
      },
      canShowColumn(column) {
        return !!(column.visibility == undefined || column.visibility);
      }
    },
    computed: {
      rowCount() {
        if (!this.server_mode) {
          return this.temp_filtered_results.length;
        }
        return this.totalRows;
      },
      selectedItemsCount() {
        return this.selected_items.length;
      },
      filteredResultsCount() {
        return this.temp_filtered_results.length;
      },
      uniqueId() {
        let unique_id = "";

        if (!this.hasUniqueId) {
          unique_id = "vbt_id";
          return unique_id;
        }
        this.vbt_columns.some((column, key) => {
          if (has(column, "uniqueId") && column.uniqueId === true) {
            unique_id = column.name;
            return true;
          }
        });

        return unique_id;
      },
      hasUniqueId() {
        let has_unique_id = false;

        this.vbt_columns.some((column, key) => {
          if (has(column, "uniqueId") && column.uniqueId === true) {
            has_unique_id = true;
            return true;
          }
        });

        return has_unique_id;
      },

      // pagination info computed properties - start

      currentPageRowsLength() {
        return this.vbt_rows.length;
      },

      currentPageRows() {
        var count = this.vbt_rows.length;
        if (this.page > 1)
          if (count < this.per_page) {
            count = this.per_page * (this.page - 1) + count;
          } else {
            count = this.per_page * this.page;
          }
        return count;
      },

      filteredRowsLength() {
        return this.rowCount;
      },

      originalRowsLength() {
        return this.server_mode ? this.rowCount : this.rows.length;
      },

      // pagination info computed properties - end
      rowHighlightColor() {
        return this.highlight_row_hover ? this.highlight_row_hover_color : "";
      },

      headerColSpan() {
        let count = this.checkbox_rows ? 1 : 0;

        count += this.vbt_columns.filter(column => this.canShowColumn(column))
          .length;
        console.log(count);
        return count;
      },

      showToolsRow() {
        return (
          (this.global_search && this.global_search.visibility) == true ||
          this.show_refresh_button == true ||
          this.show_reset_button == true ||
          this.actions.length > 0
        );
      },

      showFilterRow() {
        let show_row = false;

        this.columns.some((column, key) => {
          if (has(column, "filter")) {
            show_row = true;
            return true;
          }
        });
        return show_row;
      },

      showPaginationRow() {
        let show_pagination_row = false;

        if (
          this.card_mode == false &&
          (this.pagination == true ||
            this.pagination_info == true ||
            this.selected_rows_info == true)
        ) {
          show_pagination_row = true;
        }

        return show_pagination_row;
      },

      currentPageSelectionCount() {
        let result = [];
        if (this.server_mode && !this.hasUniqueId) {
          result = intersectionWith(this.vbt_rows, this.selected_items, isEqual);
        } else {
          result = intersectionBy(
            this.vbt_rows,
            this.selected_items,
            this.uniqueId
          );
        }
        return result.length;
      },
      tableClasses() {
        let classes = "";
        if (typeof this.classes.table === "string") {
          return this.classes.table;
        }
        if (typeof this.classes.table === "object") {
          Object.entries(this.classes.table).forEach(([key, value]) => {
            if (typeof value === "boolean" && value) {
              classes += key;
            } else if (typeof value === "function") {
              const truth = value(this.rows);
              if (typeof truth === "boolean" && truth) {
                classes += " ";
                classes += key;
              }
            }
          });
        }
        return classes;
      },
      tableWrapperClasses() {
        const classes = "";
        const defaultClasses = "table-responsive";

        if (!this.classes.tableWrapper && this.classes.tableWrapper != "") {
          return defaultClasses;
        }

        return typeof this.classes.tableWrapper === "string"
          ? this.classes.tableWrapper
          : defaultClasses;
      },

      isSelectable() {
        return this.checkbox_rows || this.rows_selectable;
      },

      updateGlobalSearch() {
        return debounce(
          this.updateGlobalSearchHandler,
          this.global_search.searchDebounceRate
        );
      }
    },
    watch: {
      "query.filters": {
        handler(after, before) {
          if (!this.server_mode) {
            this.filter(!this.preservePageOnDataChange);
          }
        },
        deep: true
      },
      "query.sort": {
        handler(after, before) {
          if (!this.server_mode) {
            this.sort();
          }
        },
        deep: true
      },
      "query.global_search": {
        handler(newVal, oldVal) {
          if (!this.server_mode) {
            this.filter(!this.preservePageOnDataChange);
          }
        }
      },
      query: {
        handler(newVal, oldVal) {
          if (this.server_mode) {
            this.emitQueryParams();
          }
        },
        deep: true
      },
      per_page: {
        handler(newVal, oldVal) {
          if (!this.server_mode) {
            const doPaginateFilter = this.page == 1;
            if (!this.preservePageOnDataChange) this.page = 1;
            if (doPaginateFilter) {
              this.paginateFilter();
            }
          } else {
            this.emitQueryParams();
          }
        }
      },
      pagination: {
        handler(newVal, oldVal) {
          if (!this.server_mode) {
            this.paginateFilter();
          } else {
            this.emitQueryParams();
          }
        }
      },
      rows: {
        handler(newVal, oldVal) {
          this.vbt_rows = cloneDeep(this.rows);

          if (!this.server_mode) {
            // check if user mentioned unique id for a column, if not set unique id for all items
            const self = this;
            this.original_rows = map(this.vbt_rows, (element, index) => {
              const extra = {};
              if (!self.hasUniqueId) {
                extra.vbt_id = index + 1;
              }
              return extend({}, element, extra);
            });
            this.filter(!this.preservePageOnDataChange, !this.isFirstTime);
          } else if (this.preservePageOnDataChange) {
            const predictedTotalPage = Math.ceil(this.rowCount / this.per_page);
            if (predictedTotalPage != 0) {
              this.page =
                this.page <= predictedTotalPage ? this.page : predictedTotalPage;
            } else {
              this.page = 1;
            }
          }

          this.isFirstTime = false;
        },
        deep: true
      },
      customFilters: {
        handler(newVal, oldVal) {
          if (!this.server_mode) {
            newVal.forEach(customFilter => {
              if (customFilter.name) {
                const index = this.query.filters.findIndex(
                  filter => filter.name === customFilter.name
                );
                if (index == -1) {
                  this.query.filters.push(customFilter);
                } else {
                  this.query.filters[index].text = customFilter.text;
                }
              }
            });
          }
        },
        deep: true
      },
      columns: {
        handler(newVal, oldVal) {
          this.vbt_columns = cloneDeep(this.columns);

          this.vbt_columns = map(this.vbt_columns, (element, index) => {
            const extra = {};
            extra.vbt_col_id = index + 1;
            return extend({}, element, extra);
          });

          this.initFilterQueries();
        },
        deep: true
      },
      config: {
        handler(newVal, oldVal) {
          this.initConfig();
        },
        deep: true
      },

      vbt_rows: {
        handler(newVal, oldVal) {
          // resetting the shift mode
          this.lastSelectedItemIndex = null;

          if (this.selected_items.length == 0) {
            // EventBus.$emit('unselect-select-all-items-checkbox');
            this.allRowsSelected = false;
            return;
          }

          let difference = [];

          if (this.server_mode && !this.hasUniqueId) {
            difference = differenceWith(newVal, this.selected_items, isEqual);
          } else {
            difference = differenceBy(newVal, this.selected_items, this.uniqueId);
          }

          if (difference.length == 0) {
            // EventBus.$emit('select-select-all-items-checkbox');
            this.allRowsSelected = true;
          } else {
            this.allRowsSelected = false;
            // EventBus.$emit('unselect-select-all-items-checkbox');
          }
        },
        deep: true
      },

      page(newVal, oldVal) {
        if (!this.server_mode) {
          this.paginateFilter();
        } else {
          this.emitQueryParams(newVal);
        }
        if (this.page == 1) this.from_1_to = this.dir.From_1_to;
        else
          this.from_1_to = this.dir.From_1_to.replace(
            "1",
            (this.page - 1) * this.per_page + 1 + ""
          );

        this.$emit("on-change-page", this.page);
      },
      "config.multi_column_sort": {
        handler(newVal, oldVal) {
          this.resetSort();
        }
      }
    }
  };
</script>

<style scoped>
  /*inquiry page*/
  .listing-cont {
    display: flex;
    position: relative;
  }

  .listing-items-cont {
    width: 100%;
    transition: all ease 0.3s;
  }

  .opened .listing-items-cont {
    width: calc(100% - 270px);
  }

  .listing-cont.closed.loaded .listing-sorting-cont {
    display: none;
  }

  .listing-sorting-cont {
    background-color: #faf9f4;
    margin-bottom: 20px;
    width: 250px;
    animation-duration: 0.3s;
    position: absolute;
    left: 0;
  }

  .inquery-page-col-row {
    display: flex;
    justify-content: space-between;
  }

  .inquery-page-search-cont {
    position: fixed;
    width: 30%;
    padding-right: 20px;
    right: 0;
    top: 0;
    bottom: 0px;
    width: 200px;
    background-color: #e8e8e8;
    z-index: 999999;
  }

  .inquery-items-cont {
    flex: 1;
    padding-right: 20px;
    margin-top: 30px;
  }

  section.inquery-page-section {
    min-height: calc(100vh - 270px);
  }

  .inquery-item-cont {
    display: flex;
    border: 1px solid #dbdbdb;
    margin-bottom: 20px;
    transition: all ease 0.3s;
  }

  .inquery-item-info-cont {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0px 20px;
  }

  .inquery-item-id {
    background-color: #faf9f4;
    width: 220px;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

    .inquery-item-id * {
      color: #01353d !important;
    }

  .inquery-item-info-t {
    font-size: 14px;
    color: #435363;
    margin-bottom: 10px;
  }

  .inquery-item-info-v {
    font-size: 18px;
    font-weight: bold;
  }

  .inquery-item-info {
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .inquery-item-id a {
    display: flex;
    height: 100%;
    padding: 20px;
    justify-content: center;
  }

    .inquery-item-id a span {
      display: block;
    }

    .inquery-item-id a:hover .servicesButton__seeMore:after {
      background-color: #e1d19c;
      color: #fff;
      margin-left: -20px;
    }

  .inquery-item-cont:hover {
    box-shadow: 0 24px 24px -16px rgba(0, 0, 0, 0.08);
  }

  span.inqiery-link-info {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
  }

  #filters-group .card {
    padding: 0 10px !important;
    margin-top: 0px;
    margin-bottom: 15px;
    box-shadow: none !important;
    background-color: transparent;
    border: none;
    border-right: 5px solid #37c5ba;
  }

  #filters-group .form-check {
    margin-bottom: 10px;
    font-size: 14px;
    padding-right: 2rem;
    vertical-align: middle;
    display: flex;
    align-items: center;
    line-height: 20px;
  }

  #filters-group .form-check-input {
    -webkit-appearance: checkbox;
  }

  #filters-group .card-header a {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    outline: none !important;
    align-items: center;
  }

    #filters-group .card-header a span {
      flex: 1;
    }

  #filters-group .card-header {
    background-color: transparent !important;
    padding: 10px 0px;
    border: none !important;
  }

  .sorting-block-title {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #filters-group .card-body {
    padding: 0px;
    margin-top: 10px;
    max-height: 130px;
    overflow: auto;
  }

  #filters-group {
    padding: 0px 15px;
  }

    #filters-group .card-header a.collapsed i.icon {
      transform: rotate(180deg);
    }

    #filters-group .card-header a i.icon {
      transition: all ease 0.3s;
      font-size: 10px;
    }

  .listing-sorting-cont i.icon.icon-close {
    background-color: #fff;
    padding: 10px;
    border: 1px solid #e8e8e8;
    color: #36c5ba;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
  }

  @media (max-width: 900px) {
    .inquery-item-id {
      order: 1;
      width: unset;
      flex: 1;
    }

    .inquery-item-cont {
      flex-direction: column;
    }

    .inquery-item-info {
      flex: none;
      width: 50%;
    }

    .inquery-item-info-cont {
      flex-wrap: wrap;
    }

    .inquery-items-cont {
      padding: 0px;
    }

    .inquery-item-info-cont {
      padding: 0px 10px;
    }
  }

  @media (max-width: 500px) {
    .inquery-item-info {
      width: 100%;
    }

    .header-search {
      display: none;
    }

    .user-side-menu {
      display: none;
    }

    .user-main-content {
      padding: 0px 15px !important;
    }

    html,
    body {
      overflow-x: hidden !important;
    }

    footer.user-footer p {
      width: 100%;
      margin: 15px 0px;
      text-align: center;
    }

    footer.user-footer {
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    .opened .listing-items-cont {
      width: 100% !important;
    }

    .listing-sorting-cont.fadeInLeft {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>


// workflow - server
// get data(payload)
// clone to origin_rows
// do filter
// do global search
// do sort
// do paginate
