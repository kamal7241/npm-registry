<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HGDatePicker
      v-model="timeRange"
      @selection-changed="input"
      :isDisable="false"
      :enableSelectedValueOnLoad="false"
    ></HGDatePicker>
  </div>
</template>

<script>
import HGDatePicker from "./components/HGDatePicker";
export default {
  name: "app",
  data() {
    return {
      currentDate: "2019-8-28",
      timeRange: null,
      min: "2019-8-28",
      max: "3019-8-30",
      ref: "HGDatePicker"
    };
  },
  components: {
    HGDatePicker
  },
  methods: {
    input(data) {
      this.min = data;
      console.log(data);
    },
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
