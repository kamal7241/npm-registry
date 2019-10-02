<template>
  <div class="form-group">
    <vue-recaptcha :ref="ref" :sitekey="sitekey" :loadRecaptchaScript="true"  @verify="verify" @expired="expired">
    </vue-recaptcha>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
const Recaptcha = {
  name: "recaptcha",
  data() {
    return {
      ref : 'vuerecaptcha',
    }
  },
  props: {
    sitekey: String,
    verify: {
      type: Function
    },
    expired:{
      type: Function
    },
  },
  methods:{
    reset() {
      this.$refs.vuerecaptcha.reset();
    }
  },
  components: { VueRecaptcha }
};
export default Recaptcha;
</script>