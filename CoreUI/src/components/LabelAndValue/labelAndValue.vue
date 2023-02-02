<template>
  <div :class="['base-label-and-value', { 'd-flex align-center': row }]">
    <v-skeleton-loader
      v-if="isLoading"
      loading
      type="text"
      width="60"
      height="12"
      class="mb-1"
    />
    <template v-else>
      <p v-if="label" :class="[labelClass, 'preview label-text mb-0']">
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
        :class="[valueClass, { 'mx-1': row }, 'value-text mb-0 preview']"
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
    koko: String,
    label: String,
    // label: {
    //   type: String,
    //   default: "",
    // },
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
