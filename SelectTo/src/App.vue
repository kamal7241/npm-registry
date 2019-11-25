<template>
  <div id="app">
    <SelectTo
      v-model="selctTomodel"
      :Data="newdata"
      :isMulti="false"
      :isSearchable="true"
      :tittle="this.tittle"
      :showPreserve="true"
      :selectedoption="this.value"
      :isDisabled="false"
      :clear-on-select="true"
      :trackBy="trackBy"
      :label="label"
    ></SelectTo>

    <button @click="clickMe()">click</button>
  </div>
</template>
<script>
import SelectTo from "./components/SelectTo.vue";
export default {
  name: "app",
  components: {
    SelectTo
  },
  data() {
    return {
      language: "language",
      selctTomodel: "options",
      tittle: "Pick a value",
      value: "",
      newdata: [{ Id: 1, Text: "name"}, { Id: 2, Text: "name2"}],
      trackBy: "Id",
      label: 'Text'
    };
  },
  methods: {
    clickMe() {
      this.value = null;
      this.selctTomodel = null;
    }
  }
};
</script>

