<template>
  <section class="box">
    <h2 class="section-header">
      <div v-if="!isLoading" class="title-wrapper">
        <span>{{ title }}</span>
        <slot name="headerAction" />
      </div>

      <v-skeleton-loader
        v-else
        loading
        width="300px"
        height="20px"
        type="heading"
      />
    </h2>
    <div class="content-wrapper">
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
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./cardPanel.module";
</style>
