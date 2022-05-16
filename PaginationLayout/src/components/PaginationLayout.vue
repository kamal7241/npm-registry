<template>
  <v-app class="min-h-unset">
    <div class="layout-wrapper">
      <div
        v-if="isLoading && showLoader"
        class="loading-wrapper"
      >
        <slot name="loader">
          <img
            src="../assets/loading.gif"
            alt="loading img"
            width="200"
            height="200"
          >
        </slot> 
      </div>
          
      <div
        v-if="generatedList.length"
        class="data-placeholder"
        :class="{'loading': isLoading}"
      >
        <slot
          name="list"
          :data="generatedList"
        />    
        <div class="navigation">
          <slot
            name="pagination"
            :data="paginationProps"
            :onChangePageSize="onChangePageSize"
            :onFirstPageActionClicked="onFirstPageActionClicked"
            :onPreviousPageActionClicked="onPreviousPageActionClicked"
            :onNextPageActionClicked="onNextPageActionClicked"
            :onLastPageActionClicked="onLastPageActionClicked"
          >
            <v-pagination
              v-if="availablePagesCount"
              v-model="currentPage"
              :length="availablePagesCount"
              :total-rows="totalCount"
              :per-page="currentPageSize"
              :total-visible="totalVisiblePages"
              :disabled="isDisabled"
              @input="onChangePageIndex"
            >
              <template #first-text>
                <img
                  src="../assets/first-page.svg"
                  alt="fisrt-page"
                  width="10"
                  height="10"
                >
              </template>
              <template #prev-text>
                <img
                  src="../assets/prev-page.svg"
                  alt="fisrt-page"
                  width="10"
                  height="10"
                >
              </template>
              <template #next-text>
                <img
                  src="../assets/next-page.svg"
                  alt="fisrt-page"
                  width="10"
                  height="10"
                >
              </template>
              <template #last-text>
                <img
                  src="../assets/last-page.svg"
                  alt="fisrt-page"
                  width="10"
                  height="10"
                >
              </template>
            </v-pagination>

            <span class="separator" />

            <div class="page-size-wrapper">
              <v-select
                v-model="currentPageSize"
                :items="pageSizeOptions"
                outline
                :disabled="isDisabled"
                append-icon="expand_more"
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
                @input="onChangePageSize"
              />
            </div>
          </slot>
        </div>
      </div>
      <div v-else>
        <slot name="empty-placeholder">
          <div class="empty-list">
            <h4>{{ emptyPlaceholderText }}</h4>
          </div>
        </slot>
      </div>
    </div>
  </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.min.css'
import { serializeQueryParams } from './Utils';
import { VSelect, VPagination } from 'vuetify/lib';

export default {
  name: 'PaginationLayout',

  components: {
    VSelect,
    VPagination
  },

  props: {
    endpoint: {
      type: Function,
      required: true,
    },
    additionalPayload: {
      type: Object,
      default: () => ({}),
    },  
    pageSizeOptions: {
      type: Array,
      default: () => ([5, 10, 30]),
    },
    initialPageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalVisiblePages: {
      type: Number,
      default: 7,
    },
    emptyPlaceholderText: {
      type: String,
      default: 'لا توجد بيانات لعرضها'
    },
    dataTargetKey: {
      type: String,
      default: "records",
    },
    totalCountKey: {
      type: String,
      default: "count",
    },    
    serverPageNumberKey: {
      type: String,
      default: "pageIndex",
    },    
    serverPageSizeKey: {
      type: String,
      default: "pageSize",
    },
    nestedDataKey: {
      type: String,
      default: '',
    },
    cascadeMode: {
      type: Boolean,
      default: false,
    }, 
    isDisabled: {
      type: Boolean,
      default: false
    },  
    showLoader: {
      type: Boolean,
      default: false,
    },    
    isDirectData: {
      type: Boolean,
      default: false,
    },
    enableServerSidePagination: {
      type: Boolean,
      default: true,
    },    
    enableReadableStreamParse: {
      type: Boolean,
      default: false,
    },
    fetchOnMount: {
      type: Boolean,
      default: true,
    },    
    exportPayloadAsObject: {
      type: Boolean,
      default: false,
    },
    fetchOnPayloadChange: {
      type: Boolean,
      default: true,
    },
    resetPageIndexOnPayloadChange: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentPage: this.initialPageNumber,
      currentPageSize: this.pageSize,
      list: [],
      totalCount: 0,
      isLoading: false,
    }
  },
  computed: {
    availablePagesCount() {
      return Math.ceil(this.totalCount / this.currentPageSize) - 1;
    },
    isFirstPageActionDisabled() {
      return this.currentPage === 0;
    },
    isLastPageActionDisabled() {
      return this.currentPage === this.availablePagesCount;
    },
    generatedList() {
      const { currentPage, currentPageSize, enableServerSidePagination, list } = this;
      const currentList = JSON.parse(JSON.stringify(list));
      const currentPageNumber = (currentPage * currentPageSize) - currentPageSize;
      const modifiedList = currentList.splice(currentPageNumber, currentPageSize);

      return enableServerSidePagination ? list : modifiedList;
    },
    // for customization
    paginationProps() {
      return {
        isLoading: this.isLoading,
        totalCount: this.totalCount,
        totalPages: this.availablePagesCount,
        currentPageSize: this.currentPageSize,
        isLastPageActionDisabled: this.isLastPageActionDisabled,
        isFirstPageActionDisabled: this.isFirstPageActionDisabled,
      }
    }
  },
  watch: {
    additionalPayload: {
      handler(newPayload, oldPayload) {
        if (JSON.stringify(newPayload) !== JSON.stringify(oldPayload)) {
          if (this.resetPageIndexOnPayloadChange) {
            this.currentPage = this.initialPageNumber;
          }

          if (this.fetchOnPayloadChange) {
            this.loadResults();
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    if(this.fetchOnMount) {
      this.loadResults();
    }
  },
  methods: {
    async loadResults(data = this.additionalPayload) {
      // To be done [Show Loader]
      const payload = {
        ...data,
      };

      if(this.enableServerSidePagination) {
        payload[this.serverPageSizeKey]= this.currentPageSize;
        payload[this.serverPageNumberKey]= this.currentPage;
      }

      this.isLoading = true;

      try {
        const fetchData = await this.endpoint(this.exportPayloadAsObject ? payload : serializeQueryParams(payload));
        const result = this.enableReadableStreamParse ? await fetchData.json() : fetchData.data || [];
        const dataTarget = result[this.dataTargetKey] || [];

        let data = [];
        let totalCount = 0;

        if(!this.enableServerSidePagination) {
          data = this.isDirectData ? result : dataTarget;
        } else {
          data =  this.nestedDataKey ? dataTarget[this.nestedDataKey] : dataTarget;
            
          totalCount = result[this.totalCountKey];
        }

        if (this.cascadeMode && this.enableServerSidePagination) {
          this.list = this.list.concat(data);
        } else {
          this.list = data || [];
        }

        this.totalCount = this.enableServerSidePagination ? totalCount : data.length;
        // update parent
        this.$emit("search", { 
          data, 
          totalCount : this.enableServerSidePagination ? totalCount : data.length
        });
      } catch(err) {
        console.error('[ERROR IN FETCHING]', err.message)
      }

      this.isLoading = false;
    },
    // Helpers for UI
    onFirstPageActionClicked() {
      this.currentPage = this.initialPageNumber;

      if(this.enableServerSidePagination) {
        this.loadResults();
      }

    },   
    onPreviousPageActionClicked() {
      this.currentPage -= 1;

      if(this.enableServerSidePagination) {
        this.loadResults();
      }
    },    
    onNextPageActionClicked() {
      this.currentPage += 1;

      if(this.enableServerSidePagination) {
        this.loadResults();
      }
    },    
    onLastPageActionClicked() {
      this.currentPage = this.availablePagesCount;

      if(this.enableServerSidePagination) {
        this.loadResults();
      }
    },
    onChangePageIndex(currentPage) {
      this.currentPage = currentPage;

      if(this.enableServerSidePagination) {
        this.loadResults();
      }
    },  
    onChangePageSize(currentPageSize) {
      this.currentPageSize = currentPageSize;

      if(this.generatedList.length) {

        this.currentPage = this.initialPageNumber;

        if(this.enableServerSidePagination) {
          this.loadResults();
        }
      }
    }
  },
}
</script>
<style scoped>
  @import './style.css';
</style>