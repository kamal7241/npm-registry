<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.20572 11.8347L6.20607 11.8344L14.9645 5.0097C15.9615 4.23421 17.3147 3.81286 18.7013 3.78035C20.0878 3.74784 21.461 4.10527 22.4958 4.82964L32.5381 11.8658L32.5391 11.8665C33.2602 12.3691 33.9436 13.2085 34.4475 14.1739C34.9515 15.1393 35.25 16.1809 35.25 17.0625V28.8925C35.25 32.3709 32.4018 35.2338 28.9088 35.2338H10.0912C6.59893 35.2338 3.75 32.3717 3.75 28.8763V16.835C3.75 16.0139 4.01863 15.0255 4.47482 14.0957C4.93091 13.1661 5.55029 12.3445 6.20572 11.8347Z"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.2378 12H16.7622C13.585 12 13.3399 14.8561 15.0553 16.4109L23.9447 24.4892C25.6601 26.044 25.415 28.9001 22.2378 28.9001H16.7622C13.585 28.9001 13.3399 26.044 15.0553 24.4892L23.9447 16.4109C25.6601 14.8561 25.415 12 22.2378 12Z"
      stroke="var(--package-primary-color)"
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
