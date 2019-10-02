<template>
  <div class="form-group has-clear-right">
    <!-- <div>

                  <div class="title">{{ this.from}}</div>

                  <input

                    type="date"

                    class="form-control"

                    v-model="fromDate"

                    :placeholder="from"

                    onkeydown="return false"

                  />

                </div>

                <div>

                  <div class="title">{{this.to}}</div>

                  <input

                    type="date"

                    class="form-control"

                    v-model="toDate"

                    :placeholder="to"

                    :disabled="fromDate == null || fromDate == ''"

                    onkeydown="return false"

                  />

    </div>-->

    <DatePickerComponents
      :isRTL="dir"
      :isHijri="config.isHijri"
      :Start="config.Start"
      :End="config.End"
      :isActive="isActive"
      :value="statedate"
      :isRange="config.isRange"
      @UpdateDate="ChangeDate"
      @clear-filter="clearFilter"
    ></DatePickerComponents>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import has from "lodash/has";

import { EventBus } from "../event-bus.js";

import DatePickerComponents from "@t2/date-picker";

export default {
  name: "DateFilter",
  props: {
    column: {
      type: Object,
      default() {
        return {};
      }
    },
    config: {},
    dir: String
  },
  data() {
    return {
      filterOnPressEnter: false,
      debounceRate: 60,
      fromDate: null,
      toDate: null,
      from: "from",
      to: "to",
      statedate: ""
    };
  },
  mounted() {
    this.from = this.dir && this.dir == "rtl" ? "من" : "from";
    this.to = this.dir && this.dir == "rtl" ? "الى" : "to";

    if (!this.filterOnPressEnter && has(this.column, "filter.debounceRate")) {
      this.debounceRate = this.column.filter.debounceRate;
    }

    EventBus.$on("reset-query", () => {
      this.fromDate = "";
      this.toDate = "";
    });
  },
  methods: {
    clearFilter() {
      this.$emit("clear-filter", this.column);
    },
    // TODO - configurable debouncing
    updateFilterHandler(event) {},
    isDate(date) {
      if (date == null || date == "") return "";
      let d = new Date(date);
      if (isNaN(d)) return "";
      d.setHours(0, 0, 0);
      return d;
    },
    updateFromDate() {
      if (this.fromDate == null || this.fromDate == "") {
        this.toDate == null;
      }
      this.$emit("update-date-select-filter", {
        value: {
          fromDate: this.isDate(this.fromDate),
          toDate: this.isDate(this.toDate)
        },
        column: this.column
      });
    },
    ChangeDate(Date1, Date2) {
      this.$emit("update-date-select-filter", {
        value: {
          fromDate: Date1,
          toDate: Date2,
          isHijri: this.isHijri
        },
        column: this.column
      });
    }
  },
  components: {
    DatePickerComponents
  },
  computed: {
    showClearButton() {
      return this.column.filter.showClearButton == undefined
        ? true
        : this.column.filter.showClearButton;
    },
    updateFilter() {
      return debounce(this.updateFilterHandler, this.debounceRate);
    }
  },
  watch: {
    fromDate() {
      this.updateFromDate();
    },
    toDate() {
      this.updateFromDate();
    },
    dir() {
      this.from = this.dir && this.dir == "rtl" ? "من" : "from";
      this.to = this.dir && this.dir == "rtl" ? "الى" : "to";
    }
  }
};
</script>

<style scoped>
.title {
  width: 33px;
  display: inline-block;
}

.vbt-simple-filter-clear {
  cursor: pointer;
}

/* Styles for wrapping the search box */

.main {
  width: 50%;
  margin: 50px auto;
}

/* Bootstrap 4 text input with clear icon on the right */

.has-clear-right {
  position: relative;
  height: 35px;
}

.has-clear-right .form-control {
  /* padding-right: 2.375rem; */
  width: inherit !important;
  text-align: end;
  display: initial !important;
}

.has-clear-right .form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
}

.has-clear-right .form-control-feedback:hover {
  color: red;
}
</style>
