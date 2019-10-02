# attachfile

npm i @t2/attach-file --registry https://najizportalnpm.azurewebsites.net

 ## parameter
:maximumSize  => set max size to all file
:fileExtinstion => allowed file to attach  
@FilesArray => callback fun return array of all file that attached

## Used
```
<template>
  <div id="app">
    <AttachFile :maximumSize="10" :fileExtinstion="fileExtinstion" @FilesArray="AllFiles"></AttachFile>
  </div>
</template>

<script>
import AttachFile from "@t2/attach-file";
export default {
  name: "app",
  props: ["FilesArray"],
  components: { AttachFile },
  data() {
    return {
      fileExtinstion: ".png, .pdf, .jpg, .jpeg"
    };
  },
   methods: {
      AllFiles(data){
          // array of files
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
