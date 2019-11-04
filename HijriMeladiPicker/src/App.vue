<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HGDatePicker
      :currentDate="currentDate"
      @selection-changed="input"
      :isDisable="Disable"
      :enableSelectedValueOnLoad="false"
      :minDate="min"
      :maxDate="max"
    ></HGDatePicker>
    <button @click="changeDate()"> Change Date</button>
  </div>
</template>

<script>
import HGDatePicker from "./components/HGDatePicker";
export default {
  name: "app",
  data() {
    return {
      currentDate: "2019-09-13",
      min: "",
      max: "",
      ref: "HGDatePicker",
      Disable: false
    };
  },
  components: {
    HGDatePicker
  },
  methods: {
    input(data) {
      console.log(data);
    },
    changeDate() {
      this.currentDate = '2019-09-29';
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
