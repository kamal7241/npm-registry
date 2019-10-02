# Reason File Uploader

## Install Components 
```
npm install @t2/reason-file-uploader --registry https://najizportalnpm.azurewebsites.net 
```

## Use 
```
1 - import components :
    import {ReasonFileUploader} from "@t2/reason-file-uploader"

2 - use in templete : 
  <ReasonFileUploader
        :Data="this.ReasonData"
        status="Add"  =====> defualt is Add
        @getCommitmentValue="getCommitmentValue"
        data-type="text"     =====> defualt is text
        :dataSource="dataSource"
        :countOfFiles="5"    =====> defualt is 5
        :fileAllowedExtensions= "fileAllowedExtensions"
        direction="rtl"  =====> defualt is rtl
        ref="componentRef"
        :maxSize="maxSize" =====> defualt is 10mb
       :haveDate="false" =====> defualt is false
       @UpdateReson="updatereason" =======> callback get all reason 


      /> 

 dataType = {
  TEXT: "text",
  LIST: "list"
 };

 dataSource : reason dropdown list :
   [{
       id: 1,
       name: ""
   }]

 countOfFiles : number of file uploaded  

 direction : rtl |  ltr

 fileAllowedExtensions : AllowedExtenstions string of the file it sends as string like ".gif,.JPG,.jpeg,.PNG,.doc,.docx"
  
  maxSize : maxSize number in MB of the uploaded file.

maxReasonTextlength : max of the reason text charecters.
```
methods:
getDataSource : return the array of reasons 
 the reason object is  {
  reason;
  file;
  id;
}
and it can be called from function outside by call :
this.$refs.componentRef.getDataSource() 

** The emits:

1- getCommitmentValue : emits when the Commitment changed and returns  the checked or unchecked value.

2- addedReason : emits when added reason.

3- deletedReason : emits when deleted reason.

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
