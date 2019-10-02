# vrecaptcha

## Project setup
```
npm install @t2/recaptcha --registry https://najizportalnpm.azurewebsites.net 

```

## USE 
```
<template>
  <div id="app">
    <Recaptcha :REF="ref" :sitekey="sitekey" :verify="onVerify" :expired="onExpired"></Recaptcha>
    <button @click="onSubmit">Ok</button>
    <button @click="Reset">Reset</button>
  </div>
</template>

<script>
import Recaptcha from "@t2/recaptcha";
export default {
  name: "app",
  components: { Recaptcha },
  data() {
    return {
      sitekey: "6LdzwLkUAAAAAETZsI0FWrt6nu4Y_vZ4zrlUvupp",
      ref: "recaptcha",
    };
  },
  methods: {
    onSubmit: function() {
      var response = grecaptcha.getResponse();
      if (response.length == 0) {
        console.log("recaptcha-error");
        return false;
      } else {
        console.log("recaptcha-scsess");
      }
    },
    onVerify: function(response) {
      console.log("Verify: " + response);
    },
    onExpired: function() {
      console.log("Expired");
    },
    Reset: function(){
      this.$refs.recaptcha.reset()
    }
  }
};
</script>
```
