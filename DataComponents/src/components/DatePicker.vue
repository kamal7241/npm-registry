<template>
  <div>
    <div>
      <modal :width="320" :height="getHeight()" :scrollable="true" name="PickerModel">
        <div v-bind:class="{'ar-div':isHijri, 'en-div':!isHijri}">
          <p class="datefont">{{dateFrom}}</p>

          <smooth-picker
            v-bind:class="[isActive? 'select' : 'defult']"
            :data="data"
            ref="smoothPicker"
            :change="dataChange"
          ></smooth-picker>
          <div v-if="isRange" v-bind:class="{'ar-div':isHijri, 'en-div':!isHijri}">
            <p class="datefont">{{dateTo}}</p>

            <smooth-picker
              v-bind:class="[isActive? 'select' : 'defult']"
              :data="data"
              ref="smoothPicker_2"
              :change="dataChange"
            ></smooth-picker>
          </div>
        </div>

        <div class="button-div">
          <button class="button" type="button" v-on:click="confirm">{{SetDateLabel}}</button>
        </div>
      </modal>
    </div>
    <div>
      <button
        class="openPicker"
        type="button"
        v-on:click="opeDatepicker"
        v-bind:selectDate="selectDate"
      >{{selectDate}}</button>
    </div>
  </div>
</template>

<script>
import "vue-smooth-picker/dist/css/style.css";
import { SmoothPicker } from "vue-smooth-picker";
import moment from "moment";
export default {
  name: "DatePicker",
  components: {
    SmoothPicker
  },
  props: ["isHijri", "Start", "End", "isActive", "value", "isRange"],
  data() {
    return {
      firstDate: null,
      secondDate: null,
      selectDate: "DD MM YYYY",
      dateFrom: null,
      dateTo: null,
      SetDateLabel: null,

      data: [
        {
          currentIndex: 0,
          flex: 3,
          list: this.getDays(),
          textAlign: "center"
        },
        {
          currentIndex: 0,
          flex: 3,
          list: this.getMonth(),
          textAlign: "center",
          className: "row-group"
        },
        {
          currentIndex: 0,
          flex: 3,
          list: this.getYear(),
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    setLang: function() {
      if (this.isHijri) {
        this.dateFrom = "من تاريخ";
        this.dateTo = "إلى تاريخ";
        this.SetDateLabel = "ضبط التاريخ";
      } else {
        this.dateFrom = "From date :";
        this.dateTo = "To date :";
        this.SetDateLabel = "Set Date";
      }
    },
    getYear: function() {
      var startdate = this.Start;
      var enddate = this.End;
      var years = [];
      if (this.isHijri) {
        startdate = Math.trunc((this.Start - 622) / 0.97);
        enddate = Math.trunc((this.End - 622) / 0.97);
      }
      for (startdate; startdate <= enddate; startdate++) {
        years.push(startdate + "");
      }
      return years;
    },
    getDays() {
      var days = [];
      var Startday = 1;
      for (Startday; Startday <= 31; Startday++) {
        days.push(Startday + "");
      }
      return days;
    },
    getMonth() {
      if (this.isHijri) {
        return [
          "مُحَرَّم",
          "صَفَر",
          "ربيع الاول",
          "ربيع الاخر",
          "جُمَادَىٰ الأول",
          "جُمَادَىٰ الاخر",
          "رَجَب",
          "شَعْبَان",
          "رَمَضَان",
          "شَوَّال",
          "ذُو القعده",
          "ذُو الحجه"
        ];
      } else {
        return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
      }
    },
    setDay: function(value) {
      let currentIndex = value;
      let list = this.data[0].list;
      this.$refs.smoothPicker.setGroupData(
        0,
        Object.assign({}, this.data[0], { currentIndex, list })
      );
    },
    setMonth: function(value) {
      let currentIndex = parseInt(value) - 1;
      let list = this.data[1].list;
      this.$refs.smoothPicker.setGroupData(
        1,
        Object.assign({}, this.data[1], { currentIndex, list })
      );
    },
    setYear: function(index, year) {
      let currentIndex = index;
      if (this.isHijri) {
        let hijriYear = Math.trunc((year - 622) / 0.97) + "";
        currentIndex = this.data[2].list.indexOf(hijriYear);
      }
      let list = this.data[2].list;
      this.$refs.smoothPicker.setGroupData(
        2,
        Object.assign({}, this.data[2], { currentIndex, list })
      );
    },
    getHeight: function() {
      if (this.isRange) {
        return 420;
      } else {
        return 220;
      }
    },
    dataChange() {
      this.isActive = false;
    },
    confirm() {
      const ciList = this.$refs.smoothPicker.getCurrentIndexList();
      const day_from = this.data[0].list[ciList[0]];
      const month_from =
        this.data[1].list.indexOf(this.data[1].list[ciList[1]]) + 1;
      const year_from = this.data[2].list[ciList[2]];
      this.firstDate = day_from + "/" + month_from + "/" + year_from;

      this.isActive = true;
      //this.$emit("UpdateDate", this.firstDate, this.secondDate);
      if (this.isRange == true) {
        const ciList_2 = this.$refs.smoothPicker_2.getCurrentIndexList();
        const day_to = this.data[0].list[ciList_2[0]];
        const month_to =
          this.data[1].list.indexOf(this.data[1].list[ciList_2[1]]) + 1;
        const year_to = this.data[2].list[ciList_2[2]];
        this.secondDate = day_to + "/" + month_to + "/" + year_to;
        this.selectDate =
          "From :" + this.firstDate + " - " + "To :" + this.secondDate;
      } else {
        this.selectDate = "Date :" + this.firstDate;
      }
      this.$modal.hide("PickerModel");
    },
    opeDatepicker() {
      this.isActive = false;
      this.$modal.show("PickerModel");
    }
  },

  watch: {
    value() {
      this.setDay(this.data[0].list.indexOf(moment(this.value).format("D")));
      this.setMonth(moment(this.value).format("M"));
      this.setYear(
        this.data[2].list.indexOf(moment(this.value).format("YYYY")),
        moment(this.value).format("YYYY")
      );
      this.isActive = true;
    }
  },
  mounted: function() {
    this.setLang();
  }
};
</script>
<style scoped>
.ar-div {
  direction: rtl;
  width: 320px;
  margin: 0 auto;
  left: 0;
}
.en-div {
  direction: ltr;
}
.defult {
  background-color: white;
}
.select {
  background-color: #e5f8ff;
}
.datefont {
  font-size: 15px;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.button-div {
  position: absolute;
  left: 50%;
  margin-left: -50px;
}
.button {
  border-radius: 9px;
  font-size: 16px;
  width: 100px;
}
.openPicker {
  width: 250px;
  height: 40px;
  font-size: 16px;
  border-radius: 3px;
}
</style>
