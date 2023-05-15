<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-name="Path 5611"
      d="M15.56 20.372h-14A1.314 1.314 0 01.25 19.06V1.56A1.314 1.314 0 011.562.25h9.624a.437.437 0 01.309.128l5.249 5.249a.438.438 0 01.128.31V19.06a1.314 1.314 0 01-1.312 1.312zm-14-19.247a.438.438 0 00-.437.438v17.5a.438.438 0 00.437.438h14a.438.438 0 00.437-.437V6.122l-4.993-4.993z"
      fill="var(--layout-primary-color)"
      stroke="var(--layout-primary-color)"
      stroke-width=".5"
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
