# datepicker

npm i @t2/hijri-meladi-picker --registry https://najizportalnpm.azurewebsites.net


## use 
```
<HGDatePicker @selection-changed="input"></HGDatePicker>

import HGDatePicker from "@t2/hijri-meladi-picker";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    HGDatePicker
  },
  methods: {
    input(date) {
      console.log(date);
    }
  }
};
```
## prps 
```
currentDate : current date in meladi or empty

dataFormat : format return date  

:minDate= add minimum date for range => ex: minDate=new Date(2019, 8, 25)

 :maxDate=add maximum date for range => ex: maxDate=new Date(2019, 8, 30)

 :isDisable="true"  ====> determine whether the DatePicker is disabled 'default is false'

 :enableSelectedValueOnLoad="true" ===> to enable or disable first callback on created component (selected value)  "default is true"
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
