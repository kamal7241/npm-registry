<template>
  <v-app>
    <div class="pa-5">
      <v-card class=" data-table-wrapper">
        <v-card-title
          v-if="isTitleAvailable"
          class="mb-3"
        >
          <h3 class="font-regular">
            {{ title }}
          </h3>

          <v-spacer />

          <v-text-field
            v-if="enableGlobalSearch"
            v-model="search"
            class="global-search"
            append-icon="mdi-magnify"
            :label="searchFieldLabel"
            single-line
            hide-details
            clearable
          />
        </v-card-title>

        <v-data-table v-bind="tableConfigs" />
      </v-card>
    </div>
  </v-app>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },          
      searchFieldLabel: {
        type: String,
        default: 'بحث'
      },      
      enableGlobalSearch: {
        type: Boolean,
        default: true
      },   
      configs: {
        type: Object,
        default: () => ({})
      },
    },
    data() {
      return  {
        search: ''
      }
    },
    computed: {
      isTitleAvailable() {
        return this.enableGlobalSearch || Boolean(this.title)
      },
        enhancedHeaders() {
          return this.configs.headers.map(header => ({ 
            align: 'center',
            ...header, 
            class: `tabel-header-enhancer ${header.class || ''}`,
            cellClass: `tabel-cell-enhancer font-regular ${header.cellClass || ''}`,
          }))
        },
      tableConfigs() {
        return {
          itemsPerPage: 5,
          ...this.configs,
          headers: this.enhancedHeaders,
          search: this.search
        }
      }
    }
  }
</script> 

<style scoped>
@import './styles.css';
</style>