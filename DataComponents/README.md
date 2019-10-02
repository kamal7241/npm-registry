# DatePicker

npm i @t2/date-picker --registry https://najizportalnpm.azurewebsites.net

## Use

import DatePickerComponents from "@t2/date-picker";
 
 ## parameter

          :isHijri="true" // --true is Hijri date  --false is defualt date
          :Start="1950"   // Start date from
          :End="2019"     // End date to --ex: 1950 - 2019
          :isActive="false" // defualt false to hoglights date when select
          :value="statedate" // on change date value send it null
          :isRange="true"  // To show range date if set false show single date picker
          @UpdateDate="ChangeDate" // return date value from picker as array (0 - is from  // 1- is to)


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
