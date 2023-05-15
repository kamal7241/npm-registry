<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 8V12.1667"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99986 18.3419H4.94986C2.0582 18.3419 0.849863 16.2752 2.24986 13.7502L4.84986 9.06689L7.29986 4.66689C8.7832 1.99189 11.2165 1.99189 12.6999 4.66689L15.1499 9.07523L17.7499 13.7586C19.1499 16.2836 17.9332 18.3502 15.0499 18.3502H9.99986V18.3419Z"
      stroke="#292D32"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99512 14.6665H10.0026"
      stroke="#292D32"
      stroke-width="2"
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
