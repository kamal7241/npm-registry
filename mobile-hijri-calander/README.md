# Install 
`
npm install @T2/MobileDatePicker --registry https://najizportalnpm.azurewebsites.net
`

## Use
 `
add in package.json : 
  "devDependencies": {
    "@babel/compat-data": "7.8.0",
    .
    .
    .
  }

 add in App.Module :
 import { DatePickerModule } from '@T2/MobileDatePicker';
@NgModule({
 .
 .
 .
  imports: [
      .
      .
      .
      DatePickerModule
      ],
 .
 .

})


In your page     <date-picker [inputTittle]="'اختر التاريخ'"></date-picker>
 `

 ### Parameters
 `
 value: string | any = '';
 minDate: string | any = '1937-03-14';
 maxDate: string | any = '2077-10-17';
 isHijri: Boolean = true;
 showMonthYearSelect: Boolean = true;
 inputTittle: string;
 `

 #### Method 
 `
 pickedDate: EventEmitter<any>;
 `
 

