<template>
  <section class="box">
    <h2 class="sectionHeader">{{ title }}</h2>

    <div class="contentWrapper">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  name: "CardPanel",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./cardPanel.module";
</style>
