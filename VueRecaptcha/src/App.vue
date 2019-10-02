<template>
  <div id="app">
    <Recaptcha :ref="ref" :sitekey="sitekey" :verify="onVerify" :expired="onExpired"></Recaptcha>
    <button @click="onSubmit">Ok</button>
    <button @click="Reset">Reset</button>
  </div>
</template>

<script>
import Recaptcha from "./components/Recaptcha.vue";
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
      debugger;
      this.$refs.recaptcha.reset()
    }
  }
};
</script>