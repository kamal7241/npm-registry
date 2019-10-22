# vue-hijri-calander

npm i @t2/vue-hijri-calander --registry https://najizportalnpm.azurewebsites.net

 ## parameter
:minDate  => set min date to allow
:maxDate  => set max date to allow
v-model='date' => string containing date with this format 'YYYY-MM-YY'
## Used
```
<template>
  <div id="app">
    {{date}}
    <HijriCalender v-model='date' :minDate='minDate' :maxDate='maxDate'/>
    <button @click='clearDate()'>Clear Date</button>
    <button @click='setDate()'>Set Date</button>
    <button @click='setMinDate()'>Set Min. Date</button>
    <button @click='setMaxDate()'>Set Max. Date</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HijriCalender from './components/HijriCalender/HijriCalender.vue';
@Component({
  components: {
    HijriCalender,
  },
})
export default class App extends Vue {
  public date: string = '';
  public minDate: string = '';
  public maxDate: string = '';

  public clearDate() {
    this.date = '';
  }
  public setDate() {
    this.date = '2019-09-13';
  }
  public setMinDate() {
    this.minDate = '2019-09-01';
  }
  public setMaxDate() {
    this.maxDate = '2019-10-15';
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

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
