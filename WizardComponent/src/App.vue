<template>
  <div id="app">
    <FormWizard shape="tab" color="#9b59b6" ref="componentRef">
      <TabContent title="Personal details" icon="ti-user">My first tab content</TabContent>
      <TabContent title="Additional Info" icon="ti-settings">My second tab content</TabContent>
      <TabContent title="Last step" icon="ti-check">Yuhuuu! This seems pretty damn simple</TabContent>
    </FormWizard>
    <button @click="nextTab">Next</button>
    <button @click="prevTab">Back</button>
  </div>
</template>

<script>
import FormWizard from "./components/FormWizard";
import TabContent from "./components/TabContent";
export default {
  name: "app",
  components: {
    FormWizard,
    TabContent
  },
  methods: {
    nextTab() {
      this.$refs.componentRef.nextTab();
    },
    prevTab() {
      this.$refs.componentRef.prevTab();
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
}
</style>
