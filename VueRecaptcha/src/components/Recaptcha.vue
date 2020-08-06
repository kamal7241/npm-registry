<template>
  <div class="form-group">
    <vue-recaptcha :ref="ref" :sitekey="sitekey" :language="language" :loadRecaptchaScript="true"  @verify="verify" @expired="expired">
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
    language:{
      type: String,
      default: 'ar-sa'
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