<template>
  <div>
    <div class="row">
      <div class="col-md-5 col-12">
        <div class="picker-style">
          <vue-datepicker-local
            :disabled-date="disabledDate"
            v-on:input="doWorkMiladi"
            v-model="miladiDate"
            :local="dpLocalProp.dplMiladi"
            :disabled="isDisable"
          ></vue-datepicker-local>
        </div>
      </div>
      <div class="col-md-5 col-12">
        <div class="picker-style">
          <HijriCalender v-model='miladiDate' :minDate="minDate" :maxDate="maxDate" :isdisabled='isDisable'/>
        </div>
      </div>
      <div class="col-md-2 col-12" v-if="!isDisable">
          <button class="btn btn-secondary"  @click="clear"><i class="fas fa-calendar-times"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment-hijri");
import VueDatepickerLocal from "vue-datepicker-local";
import HijriCalender from '@t2/vue-hijri-calander';

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
  emptyDays: ["", "", "", "", "", "", ""]
};

export default {
  name: "HGDatePicker",
  components: {
    VueDatepickerLocal,
    HijriCalender,
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
      min: moment(this.minDate)._d,
      max: moment(this.maxDate)._d,
      miladiDate: '',
      dpLocalProp: {
        dplMiladi: {
          monthsHead: datePickerPrpp.miladi,
          months: datePickerPrpp.miladi,
          weeks: datePickerPrpp.weeks
        }
      }
    };
  },
  created() {
    this.updateDate();
  },
  methods: {
    disabledDate(time) {
      if (this.min == "" && this.max == "") return;
      return time < this.min || time > this.max;
    },
    doWorkMiladi: function(value) {
      this.miladiDate = moment(value).format("YYYY-MM-DD");
      let emitDate = this.miladiDate;
      if (this.dataFormat) emitDate = moment().format(this.dataFormat);
      this.$emit("selection-changed", emitDate);
    },
    updateDate() {
      moment.locale("en");
      if (this.currentDate) {
        if (this.currentDate != undefined && this.currentDate != null && this.currentDate != '') {
          this.miladiDate = moment(this.currentDate).format("YYYY-MM-DD");
        }
      }
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
    },
    miladiDate() {
      this.$emit("selection-changed", this.miladiDate);
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
