<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5212 3.15234C9.93532 3.15234 7.02115 6.06651 7.02115 9.65234V12.7832C7.02115 13.444 6.73948 14.4515 6.40365 15.0148L5.15782 17.084C4.38865 18.3623 4.91949 19.7815 6.32782 20.2582C10.997 21.8182 16.0345 21.8182 20.7037 20.2582C22.0145 19.8248 22.5887 18.2757 21.8737 17.084L20.6278 15.0148C20.3028 14.4515 20.0212 13.444 20.0212 12.7832V9.65234C20.0212 6.07734 17.0962 3.15234 13.5212 3.15234Z"
      stroke="#999999"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M15.5259 3.46656C15.1901 3.36906 14.8434 3.29323 14.4859 3.2499C13.4459 3.1199 12.4492 3.19573 11.5176 3.46656C11.8317 2.6649 12.6117 2.10156 13.5217 2.10156C14.4317 2.10156 15.2117 2.6649 15.5259 3.46656Z"
      stroke="#999999"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.7715 20.6484C16.7715 22.4359 15.309 23.8984 13.5215 23.8984C12.6332 23.8984 11.8098 23.5301 11.2248 22.9451C10.6398 22.3601 10.2715 21.5368 10.2715 20.6484"
      stroke="#999999"
      stroke-width="1.5"
      stroke-miterlimit="10"
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
