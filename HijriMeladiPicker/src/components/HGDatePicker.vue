<template>
  <div>
    <div class="row">
      <div class="col-md-5 col-12">
        <div class="picker-style">
          <HijriCalender v-model='miladiDate' :minDate="minDate" :maxDate="maxDate" :isDisabled='isDisable' :isHijri='false'/>
        </div>
      </div>
      <div class="col-md-5 col-12">
        <div class="picker-style">
          <HijriCalender v-model='miladiDate' :minDate="minDate" :maxDate="maxDate" :isDisabled='isDisable' :isHijri='true'/>
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
import HijriCalender from '@t2/vue-hijri-calander';

export default {
  name: "HGDatePicker",
  components: {
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
    };
  },
  created() {
  },
  mounted() {
    this.miladiDate = this.currentDate;
  },
  methods: {
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
    miladiDate() {
      this.$emit("selection-changed", this.miladiDate);
    },
    currentDate() {
      this.miladiDate = this.currentDate;
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
