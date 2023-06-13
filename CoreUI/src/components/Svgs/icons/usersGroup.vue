<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3574 2.85742H8.64314C4.78599 2.85742 2.85742 4.78599 2.85742 8.64314V21.1788C2.85742 21.7092 3.29135 22.1431 3.82171 22.1431H16.3574C20.2146 22.1431 22.1431 20.2146 22.1431 16.3574V8.64314C22.1431 4.78599 20.2146 2.85742 16.3574 2.85742Z"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.7826 12.594C10.7292 12.5887 10.6651 12.5887 10.6064 12.594C9.33543 12.5513 8.32617 11.51 8.32617 10.2284C8.32617 8.92008 9.3835 7.85742 10.6971 7.85742C12.0054 7.85742 13.0681 8.92008 13.0681 10.2284C13.0628 11.51 12.0535 12.5513 10.7826 12.594Z"
      stroke="var(--package-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.6534 8.92578C15.6894 8.92578 16.5224 9.76416 16.5224 10.7948C16.5224 11.8041 15.7214 12.6264 14.7228 12.6638C14.6801 12.6585 14.632 12.6585 14.584 12.6638"
      stroke="var(--package-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.11179 14.5649C6.81951 15.43 6.81951 16.8398 8.11179 17.6995C9.5803 18.6821 11.9886 18.6821 13.4571 17.6995C14.7494 16.8345 14.7494 15.4247 13.4571 14.5649C11.994 13.5877 9.58564 13.5877 8.11179 14.5649Z"
      stroke="var(--package-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.6836 17.4696C16.0681 17.3895 16.4312 17.2347 16.7302 17.0051C17.5633 16.3803 17.5633 15.3496 16.7302 14.7249C16.4365 14.5006 16.0788 14.3511 15.6996 14.2656"
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
      type: Number,
      default: 25,
    },
    height: {
      required: false,
      type: Number,
      default: 25,
    },
  },
};
</script>
