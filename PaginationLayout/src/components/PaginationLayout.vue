<template>
  <div class="layout-wrapper">
    <div
      v-if="isLoading"
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
          <b-pagination
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="currentPageSize"
            @change="onChangePageIndex"
          >
            <template #first-text>
              <img
                src="../assets/first-page.png"
                alt="fisrt-page"
                width="10"
                height="10"
              >
            </template>
            <template #prev-text>
              <img
                src="../assets/prev-page.png"
                alt="fisrt-page"
                width="10"
                height="10"
              >
            </template>
            <template #next-text>
              <img
                src="../assets/next-page.png"
                alt="fisrt-page"
                width="10"
                height="10"
              >
            </template>
            <template #last-text>
              <img
                src="../assets/last-page.png"
                alt="fisrt-page"
                width="10"
                height="10"
              >
            </template>
          </b-pagination>

          <span class="separator" />

          <div class="page-size-wrapper">
            <Select
              :value="currentPageSize"
              :options="pageSizeOptions"
              :clearable="false"
              :searchable="false"
              @input="onChangePageSize"
            />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { serializeQueryParams } from './Utils';
import Select from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'PaginationLayout',
  components: {
    Select,
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
    localizations: {
      type: Object,
      default: () => ({}),
    },    
    pageSizeOptions: {
      type: Array,
      default: () => ([5, 10, 30]),
    },
    pageNumber: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    dataTargetKey: {
      type: String,
      default: "data",
    },
    totalCountKey: {
      type: String,
      default: "totalCount",
    },    
    serverPageNumberKey: {
      type: String,
      default: "pageNumber",
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
    isDirectData: {
      type: Boolean,
      default: true,
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
      currentPage: this.pageNumber,
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
    },
    strings() {
      return {
        firstPageText: 'الصفحة الأولى',
        nextPageText: 'التالي',
        prevPageText: 'السابق',
        lastPageText: 'الصفحة الأخيرة',
        ...this.localizations
      }
    }
  },
  watch: {
    additionalPayload: {
      handler(newPayload, oldPayload) {
        if (JSON.stringify(newPayload) !== JSON.stringify(oldPayload)) {
          if (this.resetPageIndexOnPayloadChange) {
            this.currentPage = 0;
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
        const fetchData = await this.endpoint(serializeQueryParams(payload));
        const result = this.enableReadableStreamParse ? await fetchData.json() : fetchData;
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
      this.currentPage = 0;

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
      this.currentPage = 0;

      if(this.enableServerSidePagination) {
        this.loadResults();
      }
    }
  },
}
</script>

<style scoped>
.layout-wrapper {
  position: relative;
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.data-placeholder.loading {
  filter: blur(1px);
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.navigation .pagination {
  margin: 0;
}

.navigation .pagination .page-item,
.navigation .pagination .page-item > .page-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation .pagination .page-item:not([role='separator']).disabled {
  opacity: .5;
}

.navigation .pagination .page-item > .page-link {
  padding: 0;
  width: 36px;
  height: 36px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
}

.navigation .pagination .page-item:not(.active):hover > .page-link {
  color: #158E8D;
}

.navigation .pagination .page-item:not(:first-of-type) {
  margin: 0 5px;
}
.navigation .pagination .page-item.active > .page-link {
  background-color: #158E8D;
  outline: none;
  border: none;
}

.separator {
  margin: 0 10px;
}

.nav-controller {
  padding: 5px 15px;
  margin: 5px;
  border-radius: 5px;
  font-size: 13px;
  box-shadow: 2px 2px 5px #ccc;
  cursor: pointer;
  transition: box-shadow .11s ease-in-out;
}

.nav-controller:active {
  box-shadow: unset;
}

.page-size-wrapper {
  width: 90px;
}
/* DDL */
 .v-select {
  direction: rtl;
} 

.v-select .vs__clear,
.v-select .vs__open-indicator {
  fill: #418C8C;
  width: 15px;
  height: 9px;
  margin: 0 5px;
}

.v-select,
.v-select .vs__dropdown-menu {
  box-shadow: none;
}

.v-select .vs__dropdown-toggle {
  border: 2px solid #DBDBDB;
}

.v-select .vs__dropdown-menu {
  border: 1px solid #DBDBDB;
  border-radius: 0;
  border-top: 0;
  min-width: 100%;
}
.v-select .vs__dropdown-menu .vs__dropdown-option {
  color: #02363D;
  font-size: 15px;
  padding: 5px 10px;
  text-align: initial;
  transition: background-color .3s ease-in;
}

.v-select .vs__dropdown-menu .vs__dropdown-option.vs__dropdown-option--highlight {
  color: #fff;
  background: #158E8D;
}

@media (max-width: 480px) {
  .separator {
    display: none;
  }
  .navigation {
    flex-direction: column;
  }

  .navigation .pagination {
    margin-bottom: 10px;
  }

  .page-size-wrapper {
    width: 100%;
  }
}

@media (max-width: 310px) {
  .navigation .pagination .page-item > .page-link {
    width: 30px;
    height: 30px;
  }
}
</style>