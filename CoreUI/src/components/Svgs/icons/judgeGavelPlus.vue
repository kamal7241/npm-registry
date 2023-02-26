<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36.6081 21.4082H42.6289C43.4986 21.4082 44.2122 22.1218 44.2122 22.9915V33.9082C44.2122 37.5043 42.9617 40.2681 40.9741 42.1349C38.9815 44.0063 36.2093 45.0124 33.1081 45.0124H16.7331C13.6319 45.0124 10.8596 44.0063 8.86704 42.1349C6.8794 40.2681 5.62891 37.5043 5.62891 33.9082V15.4499C5.62891 11.8538 6.8794 9.08999 8.86704 7.22318C10.8596 5.35173 13.6319 4.3457 16.7331 4.3457H25.5664C26.4361 4.3457 27.1497 5.05935 27.1497 5.92904V11.9499C27.1497 17.1635 31.3944 21.4082 36.6081 21.4082Z"
      stroke="#435363"
    />
    <path
      d="M29.4876 38.4612L24.3594 33.333"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23.7261 32.6888L19.8724 36.5425C19.0233 37.3916 17.6407 37.3916 16.7916 36.5425L12.1759 31.9268C11.3268 31.0777 11.3268 29.6951 12.1759 28.846L19.8724 21.1495C20.7215 20.3004 22.1041 20.3004 22.9532 21.1495L27.5689 25.7653C28.418 26.6144 28.418 27.9969 27.5689 28.846L23.7261 32.6888Z"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.1035 26.9229L21.7958 34.6152"
      stroke="var(--layout-primary-color)"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
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
