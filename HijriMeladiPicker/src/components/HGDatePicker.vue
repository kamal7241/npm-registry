<template>
    <div>
        <div class="picker-style">
            <HijriCalender v-model='miladiDate' :minDate="minDate" :maxDate="maxDate" :isDisabled='isDisable' :isHijri='false' />
            <i class="far fa-times-circle" @click="clear" v-if="!isDisable"></i>
        </div>
        <div class="picker-style">
            <HijriCalender v-model='miladiDate' :minDate="minDate" :maxDate="maxDate" :isDisabled='isDisable' :isHijri='true' />
            <i class="far fa-times-circle" @click="clear" v-if="!isDisable"></i>
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

.picker-style {
    position: relative;
    margin-bottom: 15px;
}

.picker-style .fa-times-circle{
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #b2b2b2;
}

.datepicker {
  background: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGQ9Ik01NjQgMTgwLjJINDQ4Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1aDExNmM4LjIgMCAxNSA2LjcgMTUgMTVzLTYuOCAxNS0xNSAxNXoiIGZpbGw9IiM5ODk4OTgiLz48cGF0aCBkPSJNOTQ1IDk1Mi4ySDgxLjJjLTguMiAwLTE1LTYuNy0xNS0xNVYxNjIuOGMwLTguMyA2LjgtMTUgMTUtMTVIMjk0YzguMiAwIDE1IDYuNyAxNSAxNXMtNi44IDE1LTE1IDE1SDk2LjJ2NzQ0LjRIOTMwVjE3Ny44SDcxMy42Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1SDk0NWM4LjIgMCAxNSA2LjcgMTUgMTV2Nzc0LjRjMCA4LjMtNi44IDE1LTE1IDE1eiIgZmlsbD0iIzk4OTg5OCIvPjxwYXRoIGQ9Ik0zMzMuMyA1NTFIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zMzMuMyA3NDBIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zNzAuOCAyNTguNmMtOC4zIDAtMTUtNi43LTE1LTE1Vjg2LjhjMC04LjIgNi43LTE1IDE1LTE1czE1IDYuOCAxNSAxNXYxNTYuOGMwIDguMy02LjcgMTUtMTUgMTV6bTI3MC4yIDBjLTguMyAwLTE1LTYuNy0xNS0xNVY4Ni44YzAtOC4yIDYuNy0xNSAxNS0xNXMxNSA2LjggMTUgMTV2MTU2LjhjMCA4LjMtNi43IDE1LTE1IDE1ek05NDUgMzcyLjJIODEuMmMtOC4yIDAtMTUtNi43LTE1LTE1czYuOC0xNSAxNS0xNUg5NDVjOC4yIDAgMTUgNi43IDE1IDE1cy02LjggMTUtMTUgMTV6IiBmaWxsPSIjOTg5ODk4Ii8+PC9zdmc+")
    no-repeat 96% 50% !important;
}
</style>
