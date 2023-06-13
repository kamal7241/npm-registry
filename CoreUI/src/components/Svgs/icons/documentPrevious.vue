<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.125 24.375H11.375L14.625 27.625"
      stroke="var(--package-primary-color)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.375 24.375L14.625 21.125"
      stroke="var(--package-primary-color)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M35.75 16.25V24.375C35.75 32.5 32.5 35.75 24.375 35.75H14.625C6.5 35.75 3.25 32.5 3.25 24.375V14.625C3.25 6.5 6.5 3.25 14.625 3.25H22.75"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M35.75 16.25H29.25C24.375 16.25 22.75 14.625 22.75 9.75V3.25L29.25 9.75L35.75 16.25Z"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  props: {
    width: {
      required: false,
      type: [String, Number],
      default: "25",
    },
    height: {
      required: false,
      type: [String, Number],
      default: "25",
    },
  },
};
</script>
