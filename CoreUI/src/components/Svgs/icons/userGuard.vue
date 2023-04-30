<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.2002 3.04418L7.64972 5.87371C5.90963 6.52435 4.4873 8.58218 4.4873 10.4433V21.6858C4.4873 23.4713 5.66756 25.8166 7.10502 26.8909L13.6114 31.7481C15.7449 33.352 19.2553 33.352 21.3888 31.7481L27.8953 26.8909C29.3327 25.8166 30.5129 23.4713 30.5129 21.6858V10.4433C30.5129 8.58218 29.0906 6.52435 27.3505 5.87371L19.8001 3.04418C18.5139 2.57512 16.4561 2.57512 15.2002 3.04418Z"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.3252 15.6934C17.2549 15.6934 17.1671 15.6934 17.0968 15.6934C15.4455 15.6407 14.1279 14.2705 14.1279 12.6016C14.1279 10.8976 15.5158 9.50977 17.2198 9.50977C18.9238 9.50977 20.3116 10.8976 20.3116 12.6016C20.294 14.2881 18.9765 15.6407 17.3252 15.6934Z"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.8293 18.8173C12.1428 19.9416 12.1428 21.7861 13.8293 22.9104C15.7441 24.1928 18.8886 24.1928 20.8035 22.9104C22.4899 21.7861 22.4899 19.9416 20.8035 18.8173C18.9062 17.5349 15.7617 17.5349 13.8293 18.8173Z"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
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
