<template>
  <div :class="['emptyPlaceholder', wrapperClass]">
    <p v-if="isLoading" class="primaryText mb-2">
      {{ $t("fetchingData") }}
    </p>
    <template v-else>
      <div class="imgPlaceholder">
        <v-icon v-if="icon" aria-hidden="false" class="icon" color="primary">
          {{ icon }}
        </v-icon>
      </div>

      <p v-if="primaryText" class="mb-2 primaryText'">
        {{ primaryText }}
      </p>

      <p v-if="secondaryText" class="secondaryText mb-0">
        {{ secondaryText }}
      </p>

      <slot name="actions" />
    </template>
  </div>
</template>
<script>
export default {
  name: "EmptyPlaceholder",
  props: {
    icon: {
      type: String,
      default: "",
    },
    primaryText: {
      type: String,
      default: "",
    },
    secondaryText: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    wrapperClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./emptyPlaceholder.module";
</style>
