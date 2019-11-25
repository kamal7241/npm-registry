<template>
  <div>
    <multiselect
      v-model="VmultiSelect"
      :multiple="isMulti"
      :searchable="isSearchable"
      :placeholder="this.tittle"
      :options="Data"
      :preserve-search="showPreserve"
      @input="updateSelected"
      :value="value"
      :disabled="isDisabled"
      :label="label"
      :NoResult="NoResult"
      :NoOptions="NoOptions"
      :trackBy="trackBy"
      :clear="clear"
    >
      <span slot="noResult">{{NoResult}}</span>
      <span slot="noOptions">{{NoOptions}}</span>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "SelectTo",
  components: { Multiselect },
  props: {
    Data: Array,
    isMulti: Boolean,
    isSearchable: Boolean,
    tittle: String,
    showPreserve: Boolean,
    selectedoption: Object,
    isDisabled: Boolean,
    label: String,
    NoResult: {
      type: String,
      default: "لا توجد نتائج"
    },
    NoOptions:{
      type: String,
      default: "لا توجد خيارات"
    },
    trackBy: String,
    clear: Boolean,
  },
  data() {
    return {
      VmultiSelect: null,
      value: null,
    };
  },
  mounted() {
    if (this.selectedoption != null) {
      this.VmultiSelect = this.selectedoption;
    }
  },
  methods: {
    updateSelected(items) {
      this.$emit("SlectedItems", items);
      this.$emit("input", items);
    },
    clearOptions() {
      console.log('inner clear');
      this.value = null;
      this.VmultiSelect = [];
      //this.clear = false;
    }
  },
  watch: {
    selectedoption() {

      this.value = this.selectedoption;
      this.VmultiSelect = this.selectedoption;


    },
    'clear': function() {
      this.clearOptions();
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>