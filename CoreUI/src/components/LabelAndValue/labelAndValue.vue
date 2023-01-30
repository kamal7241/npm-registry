<template>
  <div :class="['label-and-value', { 'd-flex align-center': row }]">
    <v-skeleton-loader
      v-if="isLoading"
      loading
      type="text"
      width="60"
      height="12"
      class="mb-1"
    />
    <template v-else>
      <p
        v-if="label"
        :class="[labelClass, { ['preview']: preview }, 'labelText mb-0']"
      >
        {{ label }}
      </p>
      <slot v-else name="label" />
    </template>

    <v-skeleton-loader
      v-if="isLoading"
      loading
      type="text"
      width="120"
      height="12"
    />
    <template v-else>
      <p
        v-if="value"
        :class="[
          valueClass,
          { ['preview']: preview, 'mx-1': row },
          'valueText mb-0',
        ]"
      >
        {{ value }}
      </p>
      <slot v-else name="value" />
    </template>
  </div>
</template>
<script>
export default {
  name: "LabelAndValue",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
    valueClass: {
      type: String,
      default: "",
    },
    preview: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./labelAndValue.module";
</style>
