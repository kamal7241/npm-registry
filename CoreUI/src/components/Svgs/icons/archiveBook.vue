<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.625 10.2082V24.7915C30.625 29.1665 28.4375 32.0832 23.3333 32.0832H11.6667C6.5625 32.0832 4.375 29.1665 4.375 24.7915V10.2082C4.375 5.83317 6.5625 2.9165 11.6667 2.9165H23.3333C28.4375 2.9165 30.625 5.83317 30.625 10.2082Z"
      stroke="#435363"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.6038 2.9165V14.379C22.6038 15.0206 21.8455 15.3415 21.3788 14.9186L17.9955 11.7978C17.7185 11.5353 17.2809 11.5353 17.0038 11.7978L13.6205 14.9186C13.1539 15.3415 12.3955 15.0206 12.3955 14.379V2.9165H22.6038Z"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.3232 20.4165H25.5212"
      stroke="#435363"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.125 26.25H25.5208"
      stroke="#435363"
      stroke-miterlimit="10"
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
