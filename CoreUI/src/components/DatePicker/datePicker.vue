<template>
  <v-input :rules="rules" :value="value" class="pkg-base-datepicker">
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
          class="ddl"
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
          class="ddl"
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
          class="ddl"
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
import { generateRange, padNumber } from "../../utils/calendar";
import { getHijriMonthInfo, gregorianToHijri, hijriToGregorian } from "./utils";

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
      const today = new Date().toString();
      const { hijriMonth, gregorianMonth } = getHijriMonthInfo(today);

      const month = isHijri ? hijriMonth : gregorianMonth;
      // ! (+1) because months are zero based
      return month + 1;
    },

    selectedMonthInstance() {
      const { isHijri, dateModel } = this;
      const { month, year } = dateModel;
      const today = new Date().toString();
      const { hijriYear, gregorianYear } = getHijriMonthInfo(today);
      const currentYear = isHijri ? hijriYear : gregorianYear;
      const validYear = year && this.isValidSelectedDate ? year : currentYear;

      return month
        ? getHijriMonthInfo(`${validYear}-${month}`)
        : getHijriMonthInfo(today);
    },

    isLastDayInCurrentMonth() {
      const { isHijri } = this;
      const today = new Date().toString();
      const {
        totalDaysInHijriMonth,
        totalDaysInGregorianMonth,
        hijriDay,
        gregorianDay,
      } = getHijriMonthInfo(today);

      const todayDate = isHijri ? hijriDay : gregorianDay;
      const daysInCurrentMonth = isHijri
        ? totalDaysInHijriMonth
        : totalDaysInGregorianMonth;

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
      const today = new Date().toString();
      const { hijriDay, gregorianDay } = getHijriMonthInfo(today);
      const todayDate = isHijri ? hijriDay : gregorianDay;
      const selectedMonth = isHijri
        ? selectedMonthInstance.hijriMonth
        : selectedMonthInstance.gregorianMonth;
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
      const today = new Date().toString();
      const now = getHijriMonthInfo(today);

      const { hijriYear, gregorianYear } = getHijriMonthInfo(today);
      const currentYear = isHijri ? hijriYear : gregorianYear;

      const currentMonth = isHijri ? now.hijriMonth : now.gregorianMonth;
      const isCurrentYearSelected = currentYear === dateModel.year;

      if (futureOnly && isCurrentYearSelected) {
        const count = skipTodayInFutureMode && isLastDayInCurrentMonth ? 2 : 1;

        return currentMonth + count;
      }

      return 1;
    },
    initialMaxPreviewedYears() {
      const { minimumGregorianYear, maxPreviewedYears } = this;

      const today = new Date().toString();
      const currentYear = getHijriMonthInfo(today).gregorianYear;

      return maxPreviewedYears || currentYear - minimumGregorianYear;
    },
    days() {
      const { isHijri, dateModel, selectedMonthInstance } = this;
      const { day: selectedDay } = dateModel;

      const daysInCurrentSelectedMonth = isHijri
        ? selectedMonthInstance.totalDaysInHijriMonth
        : selectedMonthInstance.totalDaysInGregorianMonth;
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
        ? selectedMonthInstance.hijriMonth
        : selectedMonthInstance.gregorianMonth;
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
      const today = new Date().toString();
      const { hijriYear, gregorianYear } = getHijriMonthInfo(today);
      const currentYear = isHijri ? hijriYear : gregorianYear;
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

      return `${year}/${padNumber(Number(month), 2)}/${padNumber(
        Number(day),
        2
      )}`;
    },
    isValidSelectedDate() {
      const { day, month, year } = this.dateModel;

      return Boolean(day && month && year);
    },
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
        let exportedDate;

        if (exportAsHijri && !isHijri) {
          exportedDate = gregorianToHijri(this.dateModel).date;
        } else if (!exportAsHijri && isHijri) {
          exportedDate = hijriToGregorian(this.dateModel).date;
        } else {
          exportedDate = this.serializedDateModel;
        }
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
      const dateModel = this.getDateModel(date || this.serializedDateModel);
      const { date: constructedDate } = gregorianToHijri(dateModel);
      return this.getDateModel(constructedDate);
    },

    convertToGregorian(date) {
      const dateModel = this.getDateModel(date || this.serializedDateModel);
      const { date: constructedDate } = hijriToGregorian(dateModel);
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
        const { date } = this.isHijri
          ? gregorianToHijri(this.dateModel)
          : hijriToGregorian(this.dateModel);
        this.dateModel = this.getDateModel(date);
      }

      this.onChange();
    },
  },
};
</script>

<style scoped>
@import url("./date-picker.css");
</style>
