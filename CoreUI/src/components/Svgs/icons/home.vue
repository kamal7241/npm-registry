<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.667 20.8462C11.667 19.7416 12.5624 18.8462 13.667 18.8462H20.4362C21.5408 18.8462 22.4362 19.7416 22.4362 20.8462V31.4103H11.667V20.8462Z"
      stroke="var(--package-primary-color)"
      stroke-width="1.5"
    />
    <path
      d="M5.37644 10.6612L5.37679 10.6609L13.2369 4.53617C14.1214 3.84819 15.3246 3.47267 16.5601 3.4437C17.7956 3.41473 19.0167 3.73342 19.9348 4.37611L28.9471 10.6906L28.9482 10.6913C29.5868 11.1364 30.1951 11.8825 30.6447 12.7437C31.0943 13.6049 31.359 14.5315 31.359 15.3123V25.929C31.359 29.0224 28.8259 31.5686 25.7195 31.5686H8.83197C5.72632 31.5686 3.19238 29.0231 3.19238 25.9144V15.1082C3.19238 14.3812 3.43059 13.502 3.83762 12.6724C4.24455 11.843 4.796 11.1126 5.37644 10.6612Z"
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
