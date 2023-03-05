<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36.6081 21.4082H42.6289C43.4986 21.4082 44.2122 22.1218 44.2122 22.9915V33.9082C44.2122 37.5043 42.9617 40.2681 40.9741 42.1349C38.9815 44.0063 36.2093 45.0124 33.1081 45.0124H16.7331C13.6319 45.0124 10.8596 44.0063 8.86704 42.1349C6.8794 40.2681 5.62891 37.5043 5.62891 33.9082V15.4499C5.62891 11.8538 6.8794 9.08999 8.86704 7.22318C10.8596 5.35173 13.6319 4.3457 16.7331 4.3457H25.5664C26.4361 4.3457 27.1497 5.05935 27.1497 5.92904V11.9499C27.1497 17.1635 31.3944 21.4082 36.6081 21.4082Z"
      stroke="#435363"
    />
    <path
      d="M32.0508 11.5381H42.3072"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M37.1797 16.6666V6.41016"
      stroke="#435363"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.071 29.0143C17.9752 29.0047 17.8602 29.0047 17.7548 29.0143C15.4736 28.9376 13.6621 27.0686 13.6621 24.7683C13.6621 22.42 15.5599 20.5127 17.9177 20.5127C20.2659 20.5127 22.1733 22.42 22.1733 24.7683C22.1637 27.0686 20.3522 28.9376 18.071 29.0143Z"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25.0211 22.4297C26.8805 22.4297 28.3757 23.9345 28.3757 25.7843C28.3757 27.5958 26.938 29.0718 25.1457 29.1389C25.069 29.1294 24.9827 29.1294 24.8965 29.1389"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.2787 32.5508C10.9592 34.1036 10.9592 36.6339 13.2787 38.177C15.9145 39.9406 20.2371 39.9406 22.8729 38.177C25.1924 36.6243 25.1924 34.094 22.8729 32.5508C20.2467 30.7969 15.924 30.7969 13.2787 32.5508Z"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M26.8691 37.7654C27.5592 37.6217 28.211 37.3437 28.7477 36.9316C30.2429 35.8102 30.2429 33.9603 28.7477 32.8389C28.2206 32.4364 27.5784 32.168 26.8979 32.0146"
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
