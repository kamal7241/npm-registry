# datepicker

npm i @t2/hijri-meladi-picker --registry https://najizportalnpm.azurewebsites.net


## use 
```
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
      min: "2019-09-01",
      max: "2019-10-15",
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

```
## prps 
```
currentDate : current date in meladi or empty

dataFormat : format return date  

:minDate= add minimum date for range => ex: minDate=new Date(2019, 8, 25)

 :maxDate=add maximum date for range => ex: maxDate=new Date(2019, 8, 30)

 :isDisable="true"  ====> determine whether the DatePicker is disabled 'default is false'

 :enableSelectedValueOnLoad="true" ===> to enable or disable first callback on created component (selected value)  "default is true"
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
