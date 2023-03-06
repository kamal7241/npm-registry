<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.1993 46.6246L14.6243 40.4496C14.9493 38.9996 14.3743 36.9746 13.3243 35.9246L7.12428 29.7246C3.47428 26.0746 4.64928 22.3746 9.74928 21.5246L17.7243 20.1996C19.0493 19.9746 20.6493 18.7996 21.2493 17.5746L25.6493 8.77461C28.0243 3.99961 31.9243 3.99961 34.3243 8.77461L38.7243 17.5746C38.9993 18.1496 39.5243 18.6996 40.0993 19.1746"
      stroke="#999999"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M50.2508 21.5254C55.3508 22.3754 56.5508 26.0754 52.8758 29.7254L46.6758 35.9254C45.6258 36.9754 45.0508 39.0004 45.3758 40.4504L47.1508 48.1254C48.5508 54.2004 45.3258 56.5504 39.9508 53.3754L32.4758 48.9504C31.1258 48.1504 28.9008 48.1504 27.5258 48.9504L20.0508 53.3754"
      stroke="#999999"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M55 5L5 55"
      stroke="#999999"
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
      type: String,
      default: "25",
    },
    height: {
      required: false,
      type: String,
      default: "25",
    },
  },
};
</script>
