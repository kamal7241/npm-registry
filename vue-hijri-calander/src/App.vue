<template>
  <div id="app">
    {{date}}
    <HijriCalender v-model='date' :minDate='minDate' :maxDate='maxDate' :isHijri='true'/>
    <HijriCalender v-model='date' :minDate='minDate' :maxDate='maxDate' :isHijri='false'/>
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
