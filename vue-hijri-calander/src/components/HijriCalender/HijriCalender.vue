<template>
<div>
  <popper trigger="click" :options="{placement: 'bottom', }" ref="popperRef" @show="openCalender()">
    <div class="popper">
      <div>
          <div class="hijriCalender">
              <div class="hijriCalenderControls"> 
                    <button class="previousButton" @click="subtractMonth" type="button">&lt;&lt;</button>
                    <strong v-bind="currentDate">{{getCurrentDateFormated()}}</strong>
                    <button class="nextButton" @click="addMonth" type="button">&gt;&gt;</button>
                    <div class="yearAndMonthList" v-if="showMonthYearSelect">
                      <div>
                        <span class="yearListContainer">
                          <select class="yearSelect" :value="getCurrentYear()" @change="onYearChange($event)">
                            <option  v-for="year in yearsList" v-bind:key="year" :value="year">{{year}}</option> 
                          </select>
                        </span>
                        <span class="monthListContainer">
                          <select class="monthSelect" :value="getCurrentMonth()" @change="onMonthChange($event)">
                            <option v-for="month in months" v-bind:key="month.number" :value="month.number" >{{month.name}}</option>)
                          </select>
                        </span>
                      </div>
                    </div>
                    <div class="dayNamesList">
                      <div class="dayName" v-for="dayName in arabicDayNames" v-bind:key="dayName">
                          {{dayName}}
                      </div>
                    </div>
                    <div class="monthDays">
                      <div v-for="i in selectedMonthDays" v-bind:key="i.date" class="monthDay" :class="{selected: isSelectedDate(i.date)}">
                        <Button class="monthDayButton" :class="{selected: isSelectedDate(i.date),otherMonth: !i.isSameMonth,disabled: isDateDisabled(i.date)}" :value="i.date" type="button" @click="onDateSelected(i.date)">{{i.number}}</Button>
                      </div>
                    </div>
              </div>
          </div>
      </div>
    </div>
    <div slot="reference">
      <input type="text" autoComplete="off" readOnly  :value="selectedDateinHijri()" class="datepicker" />
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

@Component({
  components: {
    Popper,
  },
})
export default class HijriCalender extends Vue {
  @Prop({default: '', required: true})
  public value: string|any;
  @Prop({default: ''})
  public minDate: string|any;
  @Prop({default: ''})
  public maxDate: string|any;
  public currentDate: any = moment();
  public arabicDayNames = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
  public showMonthYearSelect: boolean = true;
  public minYear: number = 1356;
  public maxYear: number = 1500;
  public yearsList: number[] = [];
  public months: MonthVM[] = [
            {number: 0, name: 'محرم'},
            {number: 1, name: 'صفر'},
            {number: 2, name: 'ربيع الأول'},
            {number: 3, name: 'ربيع الثاني'},
            {number: 4, name: 'جمادي الأولى'},
            {number: 5, name: 'جمادي الآخرة'},
            {number: 6, name: 'رجب'},
            {number: 7, name: 'شعبان'},
            {number: 8, name: 'رمضان'},
            {number: 9, name: 'شوال'},
            {number: 10, name: 'ذو القعدة'},
            {number: 11, name: 'ذو الحجة'},
        ];
  public selectedMonthDays: DayVM[] = [];

  public created() {
    for (let i = this.minYear; i <= this.maxYear; i = i + 1) {
        this.yearsList.push(i);
    }
  }
  @Watch('value')
  public onValueChanged(value: string, oldValue: string) {
    if (this.value) {
      this.currentDate = new moment(this.value, 'YYYY-MM-DD');
    } else {
      this.currentDate = moment();
    }
    this.reFillMonthDays();
  }
  public addMonth() {
    this.currentDate = this.currentDate.add(1, 'iMonth');
    this.reFillMonthDays();
    this.$forceUpdate();
  }
  public subtractMonth() {
    this.currentDate = this.currentDate.subtract(1, 'iMonth');
    this.reFillMonthDays();
    this.$forceUpdate();
  }
  public getCurrentDateFormated() {
    return this.currentDate.locale('ar-SA').format('iMMMM') +
      ' (' + this.currentDate.format('iMM') +
      ') ' + this.currentDate.format('iYYYY');
  }
  public getCurrentYear() {
    return this.currentDate.iYear();
  }
  public getCurrentMonth() {
    return this.currentDate.iMonth();
  }
  public onDateSelected(date: string) {
    if (!this.isDateDisabled(date)) {
      this.$emit('input', date);
      this.currentDate = new moment(date, 'YYYY-MM-DD');
      (this.$refs.popperRef as PopperType).doClose();
      this.reFillMonthDays();
      this.$forceUpdate();
    }
  }
  public selectedDateinHijri() {
    if (this.value) {
      return moment(this.value, 'YYYY-MM-DD').locale('en').format('iYYYY-iMM-iDD');
    } else {
      return '';
    }
  }
  public isSelectedDate(date: string) {
    return date === this.value;
  }
  public isDateDisabled(date: string) {
    let result: boolean = false;
    if (this.maxDate) {
      result = moment(date, 'YYYY-MM-DD').isAfter(moment(this.maxDate, 'YYYY-MM-DD')) || result;
    }
    if (this.minDate) {
      result = moment(date, 'YYYY-MM-DD').isBefore(moment(this.minDate, 'YYYY-MM-DD')) || result;
    }
    return result;
  }
  public onMonthChange(event: any) {
    const year = this.currentDate.locale('en').format('iYYYY');
    const month = (parseInt(event.target.value, 10) + 1);
    const day = this.currentDate.locale('en').format('iDD');
    const result = year + '-' + month + '-' + day;
    this.currentDate = new moment(result, 'iYYYY-iM-iDD');
    this.reFillMonthDays();
    this.$forceUpdate();
  }
  public onYearChange(event: any) {
    const year = event.target.value;
    const month = this.currentDate.locale('en').format('iMM');
    const day = this.currentDate.locale('en').format('iDD');
    const result = year + '-' + month + '-' + day;
    this.currentDate = new moment(result, 'iYYYY-iM-iDD');
    this.reFillMonthDays();
    this.$forceUpdate();
  }
  public openCalender() {
    if (this.value) {
      this.currentDate = new moment(this.value, 'YYYY-MM-DD');
    } else {
      this.currentDate = moment();
    }
    this.reFillMonthDays();
    this.$forceUpdate();
  }
  private reFillMonthDays() {
    this.selectedMonthDays = [];
    const monthStartDay = this.getCurrentMonthStartDayNumber();
    const temp = new moment(this.currentDate).startOf('iMonth');
    for (let i = monthStartDay ; i > 0; i--) {
      const x = new moment(temp).subtract(i, 'Day');
      x.locale('en');
      this.selectedMonthDays.push({
        number: x.format('iD'),
        date: x.format('YYYY-MM-DD'),
        isSameMonth: false,
      });
    }
    const temp2 = new moment(this.currentDate).startOf('iMonth');
    const monthDays = this.monthDays();
    for (let i = 0; i < monthDays; i++) {
      const x = new moment(temp2).add(i, 'Day');
      x.locale('en');
      this.selectedMonthDays.push({
        number: x.format('iD'),
        date: x.format('YYYY-MM-DD'),
        isSameMonth: true,
      });
    }
    const monthEndDay = (Number)(this.getCurrentMonthEndDayNumber());
    const temp3 = new moment(this.currentDate).endOf('iMonth');
    for (let index = 1; index < 7 - monthEndDay; index++) {
      const x = new moment(temp3).add(index, 'Day');
      x.locale('en');
      this.selectedMonthDays.push({
        number: x.format('iD'),
        date: x.format('YYYY-MM-DD'),
        isSameMonth: false,
      });
    }
  }
  private getCurrentMonthStartDayNumber() {
    const time = new moment(this.currentDate);
    time.startOf('iMonth');
    return time.locale('en').format('d');
  }
  private getCurrentMonthEndDayNumber() {
    const time = new moment(this.currentDate);
    time.endOf('iMonth');
    return time.locale('en').format('d');
  }
  private monthDays() {
    const time = new moment(this.currentDate);
    return time.locale('en').iDaysInMonth();
  }
}
</script>

<style lang="scss">
.hijriCalender { 
  width: 266px;
  direction: rtl;
  background: #ffffff;
  padding: 15px;
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

.previousButton {
    position: absolute;
    border: 0px;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    background-color: #fff;
    right: 15px;
}
.previousButton:hover {
    color: #888888
}
.nextButton {
    position: absolute;
    border: 0px;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    background-color: #fff;
    left: 15px;
}
.nextButton:hover {
    color: #888888
}

.dayNamesList {
    text-align: right;
    border-bottom: 1px solid #ddd;
}
.dayName {
    display: inline-block;
    margin: 2px;
    width: 30px;
    height: 25px;
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
    width: 30px;
    padding: 1px;
    border: 1px solid #fff;
    text-align: center;
    -webkit-box-sizing: unset !important;
    box-sizing: unset;
    border-radius: 4px;   
}
.monthDay:hover {
    border: 1px solid black;
};
.noHover:hover {
    border: '';
};
.monthDayButton {
    cursor: pointer;
    border: 0px;
    width: 30px;
    padding: 5px;
    font-size: 14px;
    border-radius: 0px;
    background-color: white;
    color: "";
}
.monthDayButton:focus {
    outline: unset;
}
.monthDayButton.selected {
    outline: unset;
    background-color: #1284E7;
    color: black;
}
.monthDayButton.otherMonth{
  background-color: #D0D0D0;
}

.monthDayButton.disabled{
  color: #C1D1E5;
  background-color: #F3F3F3 !important;
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
    background:url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGQ9Ik01NjQgMTgwLjJINDQ4Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1aDExNmM4LjIgMCAxNSA2LjcgMTUgMTVzLTYuOCAxNS0xNSAxNXoiIGZpbGw9IiM5ODk4OTgiLz48cGF0aCBkPSJNOTQ1IDk1Mi4ySDgxLjJjLTguMiAwLTE1LTYuNy0xNS0xNVYxNjIuOGMwLTguMyA2LjgtMTUgMTUtMTVIMjk0YzguMiAwIDE1IDYuNyAxNSAxNXMtNi44IDE1LTE1IDE1SDk2LjJ2NzQ0LjRIOTMwVjE3Ny44SDcxMy42Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1SDk0NWM4LjIgMCAxNSA2LjcgMTUgMTV2Nzc0LjRjMCA4LjMtNi44IDE1LTE1IDE1eiIgZmlsbD0iIzk4OTg5OCIvPjxwYXRoIGQ9Ik0zMzMuMyA1NTFIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zMzMuMyA3NDBIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zNzAuOCAyNTguNmMtOC4zIDAtMTUtNi43LTE1LTE1Vjg2LjhjMC04LjIgNi43LTE1IDE1LTE1czE1IDYuOCAxNSAxNXYxNTYuOGMwIDguMy02LjcgMTUtMTUgMTV6bTI3MC4yIDBjLTguMyAwLTE1LTYuNy0xNS0xNVY4Ni44YzAtOC4yIDYuNy0xNSAxNS0xNXMxNSA2LjggMTUgMTV2MTU2LjhjMCA4LjMtNi43IDE1LTE1IDE1ek05NDUgMzcyLjJIODEuMmMtOC4yIDAtMTUtNi43LTE1LTE1czYuOC0xNSAxNS0xNUg5NDVjOC4yIDAgMTUgNi43IDE1IDE1cy02LjggMTUtMTUgMTV6IiBmaWxsPSIjOTg5ODk4Ii8+PC9zdmc+") no-repeat 99.6% 50%;
}
.datepicker::before {
  content: '';
  display: block;
  position: absolute;
  width: 34px;
  height: 100%;
  top: 0;
  right: 0;
  
}

</style>
