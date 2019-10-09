<template>
  <div>
    <div class="row">
      <div class="col-md-5 col-12">
        <div class="picker-style" @click="fillDefault">
          <vue-datepicker-local
            :disabled-date="disabledDate"
            v-on:input="doWorkMiladi"
            v-model="miladiDate"
            :local="dpLocalProp.dplMiladi"
            :disabled="this.isDisable"
            showButtons= true
          ></vue-datepicker-local>
        </div>
      </div>
      <div class="col-md-5 col-12">
        <div class="picker-style" @click="fillDefault">
          <vue-datepicker-local
            :disabled-date="disabledDateHijri"
            v-on:input="doWorkHijri"
            v-model="hijriDate"
            :local="dpLocalProp.dplHhijri"
            :disabled="this.isDisable"
          ></vue-datepicker-local>
        </div>
      </div>
      <div class="col-md-2 col-12">
          <button class="btn btn-secondary"  @click="clear"><i class="fas fa-calendar-times"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment-hijri");
import VueDatepickerLocal from "vue-datepicker-local";

var datePickerPrpp = {
  miladi: [
    "يناير",
    "فبراير",
    "مارس",
    "ابريل",
    "مايو",
    "يونيو",
    "يوليو",
    "اغسطس",
    "سبتمبر",
    "اكتوبر",
    "نوفمبر",
    "ديسمبر"
  ],
  hijri: [
    "محرَّم",
    "صفر",
    "ربيع الأول",
    "ربيع الآخر",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوَّال",
    "ذو القعدة",
    "ذو الحجة"
  ],
  emptyDays: ["", "", "", "", "", "", ""]
};

export default {
  name: "HGDatePicker",
  components: {
    VueDatepickerLocal
  },
  props: {
    currentDate: {
      type: String,
      default: ""
    },
    dataFormat: {
      type: String,
      default: ""
    },
    minDate: {
      type: String,
      default: ""
    },
    maxDate: {
      type: String,
      default: ""
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    enableSelectedValueOnLoad: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hijriDate: '',
      min: moment(this.minDate)._d,
      max: moment(this.maxDate)._d,
      miladiDate: '',
      dpLocalProp: {
        dplMiladi: {
          monthsHead: datePickerPrpp.miladi,
          months: datePickerPrpp.miladi,
          weeks: datePickerPrpp.weeks
        },
        dplHhijri: {
          monthsHead: datePickerPrpp.hijri,
          months: datePickerPrpp.hijri,
          weeks: datePickerPrpp.weeks
        }
      }
    };
  },
  created() {
    this.updateDate();
  },
  methods: {
    fillDefault() {
      if(!this.hijriDate) {
        this.hijriDate = moment().format('iYYYY-iMM-iDD');
        this.miladiDate = moment().format("YYYY-MM-DD");
      }
    },
    disabledDate(time) {
      if (this.min == "" && this.max == "") return;
      return time < this.min || time > this.max;
    },
    disabledDateHijri(time) {
      if (this.min == "" && this.max == "") return;
      var hijri = moment(time).format("YYYY-MM-DD");
      var m = moment(hijri, "iYYYY-iMM-iDD");
      var datemildi = m._i.replace("---", "");
      var x = moment(datemildi)._d;

      let minHijri = moment(this.minDate)._d;
      let max = moment(this.maxDate).add(-1, "days");
      let maxHijri = moment(max)._d;

      return x < minHijri || x > maxHijri;
    },
    doWorkMiladi: function(value) {
      this.miladiDate = moment(value).format("YYYY-MM-DD");
      this.hijriDate = moment(value).format("iYYYY-iMM-iDD");

      let emitDate = this.miladiDate;
      if (this.dataFormat) emitDate = moment().format(this.dataFormat);
      this.$emit("selection-changed", emitDate);
    },
    doWorkHijri: function(value) {
      var hijri = moment(value).format("YYYY-MM-DD");
      var m = moment(hijri, "iYYYY-iMM-iDD");
      var datemildi = m._i.replace("---", "");
      this.miladiDate = moment(datemildi).format("YYYY-MM-DD");

      let emitDate = this.miladiDate;
      if (this.dataFormat) emitDate = moment().format(this.dataFormat);
      this.$emit("selection-changed", emitDate);
    },
    updateDate() {
      moment.locale("en");
      if (this.currentDate) {
        if (this.currentDate != undefined && this.currentDate != null && this.currentDate != '') {
          this.miladiDate = moment(this.currentDate).format("YYYY-MM-DD");
          this.hijriDate = moment(this.currentDate).format("iYYYY-iMM-iDD");
        }
      }
      // } else {
      //   this.miladiDate = moment().format("YYYY-MM-DD");
      //   this.hijriDate = moment(this.miladiDate).format("iYYYY-iMM-iDD");
      //   document.getElementsByClassName('Miladi')[0].value<HTMLInputElement> = ''
      //   document.getElementsByClassName('Hhijri')[0].value = ''
      // }
      let emitDate = this.miladiDate;
      if(!emitDate) {
        if (this.dataFormat) {
          emitDate = moment().format(this.dataFormat);
        }
      }
      
      if (this.enableSelectedValueOnLoad)
        this.$emit("selection-changed", emitDate);
    },
    clear: function(){
        this.miladiDate = '';
        this.hijriDate = '';
    }
  },
  watch: {
    minDate() {
      this.min = moment(this.minDate)._d;
    },
    maxDate() {
      this.max = moment(this.maxDate)._d;
    },
    currentDate() {
      this.updateDate();
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
