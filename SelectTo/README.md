# selectto
npm i @t2/selectto --registry https://najizportalnpm.azurewebsites.net

 ## parameter
     :Data=> Array of available options: Objects, Strings or Integers. If array of objects, visible label will default to option.label.
      :isMulti=> is multi select or single
      :isSearchable=> show search box
      :tittle=> tittle or palceholder os select spinner
      :showPreserve=> show previous serch 
      :selectedoption=>Presets the selected options.
      @SlectedItems=> call back return array of select items
      :isDisabled="false"=> disable selectTo
      :label="language" => Label from option Object, that will be visible in the dropdown.

 ## Used
```
<template>
  <div id="app">
     <SelectTo
      v-model="selctTomodel"
      :Data="data"
      :isMulti="false"
      :isSearchable="false"
      :tittle="this.tittle"
      :showPreserve="true"
      :selectedoption="this.value"
      @SlectedItems="selected"
      :isDisabled="false"
    ></SelectTo>
  </div>
</template>

<script>
import SelectTo from "@t2/selectto";
export default {
  name: "app",
  components: {
    SelectTo
  },
  data() {
    return {
      tittle: "Pick a value",
      data: [
        "Select option",
        "options",
        "selected",
        "mulitple",
        "label",
        "searchable",
        "clearOnSelect",
        "hideSelected",
        "maxHeight",
        "allowEmpty",
        "showLabels",
        "onChange",
        "touched"
      ]
    };
  },
  methods: {
  selected(data) {
   console.log(JSON.stringify(data));
     }
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
