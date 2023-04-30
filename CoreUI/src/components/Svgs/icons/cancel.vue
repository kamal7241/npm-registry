<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      id="Rectangle_3090"
      data-name="Rectangle 3090"
      width="24"
      height="24"
      rx="4"
      fill="none"
    />
    <g id="Edit" transform="translate(7.951 7.951)">
      <g id="Group_22513" data-name="Group 22513">
        <line
          id="Line_4750"
          data-name="Line 4750"
          x2="8.098"
          y2="8.098"
          fill="none"
          stroke="var(--layout-error-color)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
        <line
          id="Line_4751"
          data-name="Line 4751"
          x1="8.098"
          y2="8.098"
          fill="none"
          stroke="#ce6666"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
      </g>
    </g>
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
