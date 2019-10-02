# choose-file

## Install Components 
```
npm install @t2/choose-file --registry https://najizportalnpm.azurewebsites.net 
```

## Use 
```
1 - import components :
    import {ChooseFile} from "@t2/choose-file"

2 - use in templete : 
  <ChooseFile
    :fileAllowedExtensions="fileAllowedExtensions"
    :direction="direction"
    :maxSize="maxSize"
    :fileId="myId"
    @selectFile="selectFile"
    @deleteFile="deleteFile"
        />



 direction : rtl |  ltr

 fileAllowedExtensions : AllowedExtenstions string of the file it sends as string like ".gif,.JPG,.jpeg,.PNG,.doc,.docx"
  
  maxSize : maxSize number in MB of the uploaded file.

  fileId : id of file.
```

** The emits:

1- selectFile : emits when the file selected and returns  the file object.

2- deleteFile : emits when delete file and return fileId.




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
