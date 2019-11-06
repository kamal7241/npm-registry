<template>
  <div>
    <popper trigger="clickToToggle" :options="{placement: 'bottom', }" ref="popperRef" @show="openCalender()" :force-show="forceShow">
      <div class="popper">
        <div>
          <div class="hijriCalender">
            <div class="hijriCalenderControls">
              <div class="HeaderCal">
                <div class="H-sup">
                  <button class="nextButton" @click="addYear" title="التالي" type="button">&lt;</button>
                  <strong class="Btn-Year" @click="showYearSelect">{{getYearFormated()}}</strong>
                  <button class="previousButton" @click="subtractYear" title="السابق" type="button">&gt;</button>
                </div>
                <div class="H-sup">
                  <button class="nextButton" @click="addMonth" title="التالي" type="button">&lt;</button>
                  <strong v-bind="calenderProvider.currentDate">{{getMonthFormated()}}</strong>
                  <button class="previousButton" @click="subtractMonth" title="السابق" type="button">&gt;</button>
                </div>
                <div class="pt-2">
                  <strong v-bind="calenderProvider.currentDate">{{getMonthFormatedGregorian()}} {{getYearFormatedGregorian()}}</strong>
                </div>
              </div>
              <div v-if="!isYearList">
                <div class="dayNamesList" >
                  <div class="dayName" v-for="dayName in calenderProvider.dayNames" v-bind:key="dayName">{{dayName}}</div>
                </div>
                <div class="monthDays">
                  <div v-for="i in calenderProvider.selectedMonthDays" v-bind:key="i.date" class="monthDay" :class="{selected: isSelectedDate(i.date)}">
                    <Button class="monthDayButton" :class="{selected: isSelectedDate(i.date),otherMonth: !(i.isSameMonth || ! i.isSelectableDate),disabled: isDateDisabled(i.date),currentDate: isCurrentDate(i.date)}" :value="i.date" type="button" @click="onDateSelected(i)">
                      <div class="hijrday">{{i.number}}</div>
                      <div class="Gregorianday">{{GetDayGregorian(i.date)}}</div>
                    </Button>
                  </div>
                </div>
              </div>
              <div class="TabYears" v-if="isYearList">
                <button class="nextButton" @click="nextPage()" title="التالي" type="button">&lt;</button>
                <div class="monthDays YearsDiv">
                  <div v-for="i in GetYears()" v-bind:key="i" class="monthDay YearDiv" :class="{selected: isSelectedDateYear(i)}">
                    <Button class="monthDayButton YearDivButton" :class="{selected: isSelectedDateYear(i)}" :value="i" type="button" @click="onDateSelectedYear(i)">
                      <div class="YearItem">{{i}}</div>
                    </Button>
                  </div>
                </div>
                <button class="previousButton" @click="prevPage()" title="السابق" type="button">&gt;</button>
              </div>
              <div class="footerCal"></div>
            </div>
          </div>
        </div>
      </div>
      <div slot="reference" :class="{Divdisabled : isDisabled}">
        <div class="datepicker" :class="{disabled : isDisabled}">
          <input type="text" autocomplete="off" readonly :value="selectedDateinHijri()" :disabled="isDisabled"/>
        </div>
      </div>
    </popper>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Popper, { PopperType } from 'vue-popperjs';
import moment from 'moment-hijri';
import MonthVM from './Model/MonthVM';
import DayVM from './Model/DayVM';
import ICalenderProvider from './Providers/ICalenderProvider';
import HijriCalenderProvider from './Providers/HijriCalenderProvider';
import GregorianCalenderProvider from './Providers/GregorianCalenderProvider';

@Component({
  components: {
    Popper,
  },
})
export default class HijriCalender extends Vue {
  public forceShow: boolean = false;
  @Prop({ default: '', required: true })
  public value: string | any;
  @Prop({ default: '' })
  public minDate: string | any;
  @Prop({ default: '' })
  public maxDate: string | any;
  @Prop({ default: true })
  public showMonthYearSelect: boolean | any;
  @Prop({ default: true })
  public isHijri: boolean | any;
  @Prop({ default: false })
  public isDisabled: boolean | any;
  public isYearList: boolean | any = false;
  private calenderProvider: ICalenderProvider | any;
  public created() {
    this.calenderProvider = new HijriCalenderProvider(this.maxDate, this.minDate);
  }
  @Watch('value')
  public onValueChanged(value: string, oldValue: string) {
    this.calenderProvider.setDate(value);
    this.calenderProvider.reFillMonthDays();
    this.forceShow = false;
  }
  @Watch('minDate')
  public onMinDateChanged(value: string, oldValue: string) {
    this.calenderProvider.minDate = value;
  }
  @Watch('maxDate')
  public onMaxDateChanged(value: string, oldValue: string) {
    this.calenderProvider.maxDate = value;
  }
  public addMonth() {
    this.calenderProvider.addMonth();
    this.$forceUpdate();
  }
  public subtractMonth() {
    this.calenderProvider.subtractMonth();
    this.$forceUpdate();
  }
  public addYear() {
    this.calenderProvider.addYear();
    this.$forceUpdate();
  }
  public subtractYear() {
    this.calenderProvider.subtractYear();
    this.$forceUpdate();
  }
  public getMonthFormated() {
    return this.calenderProvider.getMonthFormated();
  }
  public GetYears() {
    return this.calenderProvider.GetYears();
  }
  public nextPage() {
    this.calenderProvider.nextPage();
    this.$forceUpdate();
  }
  public prevPage() {
    this.calenderProvider.prevPage();
    this.$forceUpdate();
  }
  public getYearFormated() {
    return this.calenderProvider.getYearFormated();
  }
  public getMonthFormatedGregorian() {
    return this.calenderProvider.getMonthFormatedGregorian();
  }
  public getYearFormatedGregorian() {
    return this.calenderProvider.getYearFormatedGregorian();
  }
  public getCurrentYear() {
    return this.calenderProvider.getCurrentYear();
  }
  public getCurrentMonth() {
    return this.calenderProvider.getCurrentMonth();
  }
  public onDateSelected(date: DayVM) {
    if (!this.isDateDisabled(date.date) && date.isSelectableDate) {
      this.$emit('input', date.date);
      (this.$refs.popperRef as PopperType).doClose();
      this.calenderProvider.reFillMonthDays();
      this.$forceUpdate();
    }
  }
  public onDateSelectedYear(Year: number): void {
    this.calenderProvider.ChangeYearSelected(Year);
    this.isYearList = false;
    this.calenderProvider.reFillMonthDays();
  }
  public selectedDateinHijri() {
    return this.calenderProvider.selectedDate(this.value);
  }
  public isSelectedDate(date: string) {
    return date === this.value;
  }
  public isCurrentDate(date: string) {
    return date === moment().locale('en').format('YYYY-MM-DD');
  }
  public isSelectedDateYear(year: number) {
    return this.calenderProvider.isSelectedDateYear(year);
  }
  public isDateDisabled(date: string) {
    return this.calenderProvider.isDateDisabled(date);
  }
  public onMonthChange(event: any) {
    this.calenderProvider.onMonthChange(event.target.value);
    this.$forceUpdate();
  }
  public onYearChange(event: any) {
    this.calenderProvider.onYearChange(event.target.value);
    this.$forceUpdate();
  }
  public GetDayGregorian(day: any) {
    return new moment(day).locale('en').format('DD');
  }
  public openCalender() {
    this.calenderProvider.setDate(this.value);
    const indexcurrentYear = this.calenderProvider.recalculateYearPage();
    this.calenderProvider.reFillMonthDays();
    this.$forceUpdate();
  }
  public showYearSelect() {
    this.isYearList = true;
    this.forceShow = true;
  }
}
</script>

<style lang="scss">
.hijrday {
  text-align: left;
}
.Gregorianday {
  text-align: right;
  color: #ff9900;
}
.HeaderCal {
  background-color: #477388;
  color: #fff;
  padding: 10px;
}
.footerCal {
  background-color: #477388;
  padding: 20px;
  border: 1px solid #dddddd;
}
.H-sup {
  position: relative;
  line-height: 2;
}
.TabYears {
  position: relative;
}
.TabYears .previousButton {
  top: 45%;
  left: 5px;
}
.TabYears .nextButton {
  top: 45%;
  right: 5px;
}
button.monthDayButton.YearDivButton {
  height: 25px;
  width: 77px;
}
.monthDay.YearDiv {
  width: 77px;
  height: 25px;
}
.monthDays.YearsDiv {
  margin: 0 40px;
  min-height: 231px;
}
.hijriCalender {
  width: 336px;
  direction: rtl;
  background: #ffffff;
  padding: 0;
  border: 1px solid #ddd;
  margin-top: 2px;
  font-family: serif;
  box-sizing: unset;
  -webkit-box-sizing: unset;
  font-size: 14px;
  border-radius: 4px;
  z-index: 1000;
  color: black !important;
}
.hijriCalenderControls {
  direction: rtl;
  text-align: center;
}
strong.Btn-Year {
  cursor: pointer;
}
.previousButton {
  position: absolute;
  border: 0px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  background-color: #305161;
  border-radius: 50%;
  left: 0;
  color: #fff;
  width: 25px;
  height: 25px;
  top: 0px;
}
.previousButton:hover {
  color: #888888;
}
.nextButton {
  position: absolute;
  border: 0px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  background-color: #305161;
  border-radius: 50%;
  color: #fff;
  right: 0;
  width: 25px;
  height: 25px;
  top: 0;
}
.nextButton:hover {
  color: #888888;
}
button.monthDayButton.currentDate {
    border: 1px solid #477388;
}
.dayNamesList {
  text-align: right;
  border-bottom: 1px solid #000;
  padding-top: 3px;
}
.dayName {
  display: inline-block;
  margin: 2px;
  width: 40px;
  height: 18px;
  padding: 1px;
  border: 1px solid #fff;
  text-align: center;
  -webkit-box-sizing: unset !important;
  box-sizing: unset;
}

.yearAndMonthList {
  margin-top: 10px;
}

.yearListContainer {
  padding: 5px;
}

.yearSelect {
  width: 100px;
  -webkit-appearance: menulist-button;
  background: transparent;
  height: 25px;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 12px;
}

.monthListContainer {
  padding: 5px;
}
.monthSelect {
  width: 100px;
  -webkit-appearance: menulist-button;
  background: transparent;
  height: 25px;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 14px;
}

.monthDays {
  text-align: right;
  display: flex;
  flex-flow: wrap;
}

.monthDay {
  margin: 2px;
  width: 40px;
  padding: 1px;
  border: 1px solid #fff;
  text-align: center;
  -webkit-box-sizing: unset !important;
  box-sizing: unset;
  border-radius: 4px;
}

.noHover:hover {
  border: "";
}
.monthDayButton {
  cursor: pointer;
  border: 0px;
  width: 40px;
  height: 40px;
  padding: 5px;
  font-size: 14px;
  border-radius: 0px;
  background-color: white;
  color: "";
}
.monthDayButton:hover {
  background-color: #5f99b5;
}
.monthDayButton:focus {
  outline: unset;
}
.monthDayButton.selected {
  outline: unset;
  background-color: #477388;
  color: #fff;
}
.otherMonth:not(.disabled) .hijrday, .otherMonth .Gregorianday {
    color: #9e9e9e;
}
.otherMonth:not(.disabled):hover .hijrday{
   color: #000;
}
.otherMonth:not(.disabled):hover .Gregorianday{
  color: #ff9900;
}
.monthDayButton.disabled {
  color: #c1d1e5;
  background-color: #f3f3f3 !important;
  cursor: not-allowed;
}
.datepicker {
  display: block !important;
  width: 100% !important;
  height: 34px !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #495057 !important;
  background-color: #fff !important;
  background-clip: padding-box !important;
  border: 1px solid #ced4da !important;
  border-radius: 10px !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
  box-sizing: border-box;
  outline: none;
  padding: 0 34px 0 12px;
  -webkit-user-select: none;
  background: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGQ9Ik01NjQgMTgwLjJINDQ4Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1aDExNmM4LjIgMCAxNSA2LjcgMTUgMTVzLTYuOCAxNS0xNSAxNXoiIGZpbGw9IiM5ODk4OTgiLz48cGF0aCBkPSJNOTQ1IDk1Mi4ySDgxLjJjLTguMiAwLTE1LTYuNy0xNS0xNVYxNjIuOGMwLTguMyA2LjgtMTUgMTUtMTVIMjk0YzguMiAwIDE1IDYuNyAxNSAxNXMtNi44IDE1LTE1IDE1SDk2LjJ2NzQ0LjRIOTMwVjE3Ny44SDcxMy42Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1SDk0NWM4LjIgMCAxNSA2LjcgMTUgMTV2Nzc0LjRjMCA4LjMtNi44IDE1LTE1IDE1eiIgZmlsbD0iIzk4OTg5OCIvPjxwYXRoIGQ9Ik0zMzMuMyA1NTFIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zMzMuMyA3NDBIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zNzAuOCAyNTguNmMtOC4zIDAtMTUtNi43LTE1LTE1Vjg2LjhjMC04LjIgNi43LTE1IDE1LTE1czE1IDYuOCAxNSAxNXYxNTYuOGMwIDguMy02LjcgMTUtMTUgMTV6bTI3MC4yIDBjLTguMyAwLTE1LTYuNy0xNS0xNVY4Ni44YzAtOC4yIDYuNy0xNSAxNS0xNXMxNSA2LjggMTUgMTV2MTU2LjhjMCA4LjMtNi43IDE1LTE1IDE1ek05NDUgMzcyLjJIODEuMmMtOC4yIDAtMTUtNi43LTE1LTE1czYuOC0xNSAxNS0xNUg5NDVjOC4yIDAgMTUgNi43IDE1IDE1cy02LjggMTUtMTUgMTV6IiBmaWxsPSIjOTg5ODk4Ii8+PC9zdmc+")
    no-repeat 96% 50%;
}
.datepicker.disabled {
  background-color: #e9ecef;
}
.datepicker::before {
  content: "";
  display: block;
  position: absolute;
  width: 34px;
  height: 100%;
  top: 0;
  right: 0;
}
.popper {
  z-index: 1;
}

.Divdisabled {
  pointer-events: none;
}
</style>
