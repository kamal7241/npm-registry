<template>
  <div id="app">
    <FormWizard>
      <TabContent title="Tab one" icon>Tab one</TabContent>
      <TabContent title="Tab two" icon>Tab two</TabContent>
      <TabContent title="Tab three" icon>Tab three</TabContent>
      <TabContent title="Tab four" icon>Tab four</TabContent>
      <TabContent title="Tab five" icon>Tab five</TabContent>
      <TabContent title="Tab six" icon>Tab six</TabContent>
    </FormWizard>
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
