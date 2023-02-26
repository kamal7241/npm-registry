<template>
  <v-input :rules="rules" :value="value" class="base-calendar">
    <div class="label-and-field-wrapper">
      <div
        :class="[
          `label-wrapper d-flex align-center text-start justify-${
            label ? 'space-between' : 'end'
          }`,
        ]"
      >
        <p v-if="label" class="field-label mb-0">{{ label }}</p>

        <div
          v-if="!disabled"
          :class="[
            'date-type-toggler d-flex align-center justify-space-between ',
          ]"
        >
          <p :class="[{ 'primary--text': !isHijri }, 'field-label my-0 ']">
            {{ $t("gregorian") }}
          </p>

          <v-switch
            :id="switchActionId"
            v-model="isHijri"
            :dense="dense"
            color="primary"
            :ripple="false"
            class="my-0 mx-2"
            :false-value="false"
            :true-value="true"
            hide-details
            @change="onChangeCalendarType"
          />

          <p :class="[{ 'primary--text': isHijri }, 'field-label my-0']">
            {{ $t("hijri") }}
          </p>
        </div>
      </div>

      <div class="list-wrapper d-flex align-center justify-space-between mb-2">
        <v-autocomplete
          :id="yearsDropdownId"
          v-model="dateModel.year"
          outlined
          :dense="dense"
          item-text="label"
          item-value="value"
          :label="$t('theYear')"
          :items="years"
          class="list"
          hide-details
          :disabled="disabled"
          :menu-props="{ bottom: true, offsetY: true }"
          @input="onChange()"
        />

        <v-autocomplete
          :id="monthsDropdownId"
          v-model="dateModel.month"
          outlined
          :dense="dense"
          item-text="label"
          item-value="value"
          :label="$t('theMonth')"
          :items="months"
          class="list"
          hide-details
          :disabled="disabled"
          :menu-props="{ bottom: true, offsetY: true }"
          @input="onChange()"
        />

        <v-autocomplete
          :id="daysDropdownId"
          v-model="dateModel.day"
          outlined
          :dense="dense"
          item-text="label"
          item-value="value"
          :label="$t('theDay')"
          :items="days"
          class="list"
          hide-details
          :disabled="disabled"
          :menu-props="{ bottom: true, offsetY: true }"
          @input="onChange()"
        />
      </div>
    </div>
  </v-input>
</template>

<script>
import moment from "moment-hijri";
import { generateRange } from "../../utils/calendar";

export default {
  name: "DatePicker",
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    switchActionId: {
      type: String,
      default: "",
    },
    yearsDropdownId: {
      type: String,
      default: "",
    },
    monthsDropdownId: {
      type: String,
      default: "",
    },
    daysDropdownId: {
      type: String,
      default: "",
    },
    minimumGregorianYear: {
      type: Number,
      default: 1900,
    },
    maxPreviewedYears: {
      type: Number,
      default: 0,
    },
    futureOnly: {
      type: Boolean,
      default: false,
    },
    skipTodayInFutureMode: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    initialIsHijri: {
      type: Boolean,
      default: true,
    },
    exportAsHijri: {
      type: Boolean,
      default: true,
    },
    format: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isHijri: true,
      defaultDateFormat: "YYYY/MM/DD",
      defaultHijriDateFormat: "iYYYY/iMM/iDD",
      initialDateModel: {
        day: null,
        month: null,
        year: null,
      },
      dateModel: { ...this.initialDateModel },
    };
  },
  computed: {
    currentMonthInYear() {
      const { isHijri } = this;
      const now = moment();

      const month = isHijri ? now.iMonth() : now.month();
      // ! (+1) because months are zero based
      return month + 1;
    },

    selectedMonthInstance() {
      const { isHijri, dateModel } = this;
      const { month, year } = dateModel;
      const format = isHijri ? "iYYYY-iM" : "YYYY-M";
      const currentYear = isHijri ? moment().iYear() : moment().year();
      const validYear = year && this.isValidSelectedDate ? year : currentYear;

      return month ? moment(`${validYear}-${month}`, format) : moment();
    },

    isLastDayInCurrentMonth() {
      const { isHijri } = this;
      const now = moment();
      const todayDate = isHijri ? now.iDate() : now.date();
      const daysInCurrentMonth = isHijri
        ? now.iDaysInMonth()
        : now.daysInMonth();

      return todayDate === daysInCurrentMonth;
    },
    daysRangeStartNumber() {
      const {
        isHijri,
        futureOnly,
        currentMonthInYear,
        selectedMonthInstance,
        skipTodayInFutureMode,
        isLastDayInCurrentMonth,
      } = this;
      const todayDate = isHijri ? moment().iDate() : moment().date();
      const selectedMonth = isHijri
        ? selectedMonthInstance.iMonth()
        : selectedMonthInstance.month();
      const isCurrentMonthSelected = currentMonthInYear === selectedMonth + 1;

      if (futureOnly && isCurrentMonthSelected) {
        let startNumber = todayDate;

        if (skipTodayInFutureMode && isLastDayInCurrentMonth) {
          startNumber = 1;
        }

        if (skipTodayInFutureMode && !isLastDayInCurrentMonth) {
          startNumber = todayDate + 1;
        }

        return startNumber;
      }

      return 1;
    },
    monthsRangeStartNumber() {
      const {
        isHijri,
        futureOnly,
        dateModel,
        skipTodayInFutureMode,
        isLastDayInCurrentMonth,
      } = this;
      const now = moment();

      const currentYear = isHijri ? now.iYear() : now.year();
      const currentMonth = isHijri ? now.iMonth() : now.month();
      const isCurrentYearSelected = currentYear === dateModel.year;

      if (futureOnly && isCurrentYearSelected) {
        const count = skipTodayInFutureMode && isLastDayInCurrentMonth ? 2 : 1;

        return currentMonth + count;
      }

      return 1;
    },
    initialMaxPreviewedYears() {
      const { minimumGregorianYear, maxPreviewedYears } = this;
      const currentYear = moment().year();

      return Math.abs(maxPreviewedYears) || currentYear - minimumGregorianYear;
    },
    days() {
      const { isHijri, dateModel, selectedMonthInstance } = this;
      const { day: selectedDay } = dateModel;

      const daysInCurrentSelectedMonth = isHijri
        ? selectedMonthInstance.iDaysInMonth()
        : selectedMonthInstance.daysInMonth();

      const shouldResetDate =
        Number(selectedDay) > daysInCurrentSelectedMonth ||
        Number(selectedDay) < this.daysRangeStartNumber;

      if (selectedDay && shouldResetDate) {
        this.dateModel.day = null;
        // ? update parent
        this.onChange();
      }

      return generateRange({
        start: this.daysRangeStartNumber,
        end: daysInCurrentSelectedMonth,
      });
    },
    months() {
      const { isHijri, selectedMonthInstance, dateModel } = this;
      const { month } = dateModel;

      const selectedMonth = isHijri
        ? selectedMonthInstance.iMonth()
        : selectedMonthInstance.month();
      const shouldResetMonth = this.monthsRangeStartNumber > selectedMonth + 1;

      if (month && shouldResetMonth) {
        this.dateModel.month = null;
        // ? update parent
        this.onChange();
      }

      return generateRange({
        start: this.monthsRangeStartNumber,
        end: 12,
        isMonthMode: true,
        isHijri,
      });
    },
    years() {
      const { isHijri, futureOnly, initialMaxPreviewedYears } = this;
      const currentYear = isHijri ? moment().iYear() : moment().year();
      const yearToStartFrom = futureOnly
        ? currentYear
        : currentYear - initialMaxPreviewedYears;
      const yearToStopAt = futureOnly
        ? currentYear + initialMaxPreviewedYears
        : currentYear;

      return generateRange({
        start: yearToStartFrom,
        // ! to execlude the last year
        end: yearToStopAt - 1,
        valueLength: 4,
        reverse: true,
      });
    },

    serializedDateModel() {
      const { day, month, year } = this.dateModel;

      return `${year}/${month}/${day}`;
    },
    isValidSelectedDate() {
      const { day, month, year } = this.dateModel;

      return Boolean(day && month && year);
    },
  },
  watch: {
    value() {
      this.updateFieldWithValue();
    },
  },
  created() {
    moment.locale("en");
  },
  mounted() {
    this.isHijri = this.initialIsHijri;

    if (this.value) {
      this.updateFieldWithValue();
    }
  },
  methods: {
    reset() {
      this.isHijri = this.initialIsHijri;
      this.dateModel = { ...this.initialDateModel };
    },

    onChange() {
      const { isHijri, exportAsHijri, isValidSelectedDate } = this;

      if (isValidSelectedDate) {
        const currentFormat = isHijri
          ? this.defaultHijriDateFormat
          : this.defaultDateFormat;
        const exportedFormat = exportAsHijri
          ? this.defaultHijriDateFormat
          : this.defaultDateFormat;
        // ! month - 1 ---> because in moment months are 0 based
        const exportedDate = moment(
          this.serializedDateModel,
          currentFormat
        ).format(this.format || exportedFormat);

        this.$emit("change", exportedDate);
      } else {
        this.$emit("change", "");
      }
    },

    updateFieldWithValue() {
      if (!this.value) {
        this.dateModel = { ...this.initialDateModel };
      } else {
        this.dateModel = this.getDateModel(this.value);
        // this.dateModel = this.isHijri
        //   ? this.getDateModel(this.value)
        //   : this.convertToGregorian(this.value);
      }

      this.onChange();
    },

    convertToHijri(date) {
      const constructedDate = moment(
        date || this.serializedDateModel,
        this.defaultDateFormat
      ).format(this.defaultHijriDateFormat);

      return this.getDateModel(constructedDate);
    },

    convertToGregorian(date) {
      const constructedDate = moment(
        date || this.serializedDateModel,
        this.defaultHijriDateFormat
      ).format(this.defaultDateFormat);

      return this.getDateModel(constructedDate);
    },

    getDateModel(date) {
      const [year, month, day] = date.split("/");

      return {
        day: Number(day),
        month: Number(month),
        year: Number(year),
      };
    },

    onChangeCalendarType() {
      if (this.isValidSelectedDate) {
        this.dateModel = this.isHijri
          ? this.convertToHijri()
          : this.convertToGregorian();
      }

      this.onChange();
    },
  },
};
</script>

<style scoped lang="scss">
.label-and-field-wrapper {
  position: relative;
  width: 100%;

  .label-wrapper {
    width: 100%;
    position: absolute;
    top: -38px;
  }

  .list-wrapper {
    width: 100%;
    .list {
      &:not(:first-of-type, :last-of-type) {
        margin: 0 10px;
      }
    }
  }

  @media (max-width: 500px) {
    .list-wrapper {
      flex-direction: column;

      .list {
        width: 100%;

        &:not(:first-of-type, :last-of-type) {
          margin: 10px 0;
        }
      }
    }
  }

  @media (max-width: 300px) {
    .label-wrapper {
      .fieldLabel,
      .dateTypeToggler {
        font-size: 14px;
      }
    }
  }
}
</style>
