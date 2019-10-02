<template>
  <div id="app">
    <DatePickerComponents
      :isHijri="true"
      :Start="1950"
      :End="2019"
      :isActive="false"
      :value="statedate"
      :isRange="true"
      @UpdateDate="ChangeDate"
    />
  </div>
</template>


<script>
import DatePickerComponents from "./components/DatePicker";
// import Datepicker from "vuejs-datepicker";

export default {
  name: "app",
  components: { DatePickerComponents },
  props: ["UpdateDate"],

  data() {
    return {
      statedate: null
    };
  },
  methods: {
    ChangeDate(Date1, Date2) {
      alert("From :" + Date1 + "   " + "To :" + Date2);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
