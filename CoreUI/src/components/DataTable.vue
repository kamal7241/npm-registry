<template>
  <v-app class="">
    <div class="pa-5">
      <v-data-table
        :headers="headers"
        :items="rows"
        :itemsPerPage="5"
        class="primary-color  elevation-1"
      />
      <span class="primary-color ">محمول</span>
    </div>

    <v-btn color="primary">
      asdasdasd
    </v-btn>
  </v-app>
</template>

<script>
  export default {
    props: {
      configs: {
        type: Object,
        default: () => ({})
      },
      headers: {
        type: Array,
        default: () => []
      },
      rows: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      tableConfigs() {
        return {
          itemsPerPage: 20,
          ...this.configs
        }
      }
    }
  }
</script> 

<style scoped lang='scss'>

</style>