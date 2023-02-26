<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.86882 15.0615L7.86917 15.0612L19.098 6.31152C19.0981 6.31146 19.0981 6.3114 19.0982 6.31133C20.4046 5.29534 22.1702 4.74802 23.972 4.70577C25.7738 4.66352 27.5652 5.12747 28.9208 6.07633C28.9208 6.07638 28.9209 6.07642 28.921 6.07646L41.7958 15.0972L41.7968 15.0979C42.7448 15.7586 43.6344 16.8547 44.2879 18.1066C44.9413 19.3584 45.3327 20.7162 45.3327 21.8752V37.0418C45.3327 41.579 41.6183 45.3127 37.0619 45.3127H12.9368C8.3812 45.3127 4.66602 41.5797 4.66602 37.021V21.5835C4.66602 20.5034 5.01829 19.2148 5.60969 18.0095C6.20099 16.8043 7.00714 15.7317 7.86882 15.0615Z"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M34.375 23.958L25.625 32.708L22.2917 27.708L15.625 34.3747"
      stroke="var(--layout-primary-color)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M30.209 23.958H34.3757V28.1247"
      stroke="var(--layout-primary-color)"
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
