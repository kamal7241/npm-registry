<template>
  <div id="app">
    {{date}}
    <HijriCalender v-model='date' :minDate='minDate' :maxDate='maxDate' :isDisabled='isDisabled'/>
    <button @click='clearDate()'>Clear Date</button>
    <button @click='setDate()'>Set Date</button>
    <button @click='setMinDate()'>Set Min. Date</button>
    <button @click='setMaxDate()'>Set Max. Date</button>
    <button @click='flipDisabled()'>Flip Disabled</button>
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
  public isDisabled: boolean = false;
  public clearDate() {
    this.date = '';
  }
  public setDate() {
    this.date = '2019-11-05';
  }
  public setMinDate() {
    this.minDate = '2013-1-05';
  }
  public setMaxDate() {
    this.maxDate = '2022-11-05';
  }
  public flipDisabled() {
    this.isDisabled = ! this.isDisabled;
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
