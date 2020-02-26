# wizardcomponent
npm i @t2/wizard --registry https://najizportalnpm.azurewebsites.net


## use 
```
<template>
  <div id="app">
    <FormWizard shape="tab" color="#9b59b6">
      <TabContent title="Personal details" icon="ti-user">My first tab content</TabContent>
      <TabContent title="Additional Info" icon="ti-settings">My second tab content</TabContent>
      <TabContent title="Last step" icon="ti-check">Yuhuuu! This seems pretty damn simple</TabContent>
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
