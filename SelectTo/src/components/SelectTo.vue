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
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "SelectTo",
  components: { Multiselect },
  props: [
    "Data",
    "isMulti",
    "isSearchable",
    "tittle",
    "showPreserve",
    "selectedoption",
    "isDisabled",
    "label"
  ],
  data() {
    return {
      VmultiSelect: null,
      value: null
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
    }
  },
  watch: {
    selectedoption() {
      handler:function(){
     this.value = this.selectedoption;
      this.VmultiSelect = this.selectedoption;
      },
 
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>