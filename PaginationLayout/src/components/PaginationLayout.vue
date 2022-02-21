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
          <div class="actions">
            <button
              class="nav-controller"
              :disabled="isFirstPageActionDisabled"
              @click="onFirstPageActionClicked"
            >
              {{ strings.firstPageText }}
            </button>   
        
            <button
              class="nav-controller"
              :disabled="isFirstPageActionDisabled"
              @click="onPreviousPageActionClicked"
            >
              {{ strings.prevPageText }}
            </button>   
        
            <button
              class="nav-controller"
              :disabled="isLastPageActionDisabled"
              @click="onNextPageActionClicked"
            >
              {{ strings.nextPageText }}
            </button>

            <button
              class="nav-controller"
              :disabled="isLastPageActionDisabled"
              @click="onLastPageActionClicked"
            >
              {{ strings.lastPageText }}
            </button>
          </div>

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
    Select
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
    isSSPDisabled: {
      type: Boolean,
      default: false,
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
      const { currentPage, currentPageSize, isSSPDisabled, list } = this;
      const currentList = JSON.parse(JSON.stringify(list));
      const currentPageNumber = (currentPage * currentPageSize) - currentPageSize;
      const modifiedList = currentList.splice(currentPageNumber, currentPageSize);

      return isSSPDisabled ? modifiedList : list;
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

      if(!this.isSSPDisabled) {
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

        if(this.isSSPDisabled) {
          data = this.isDirectData ? result : dataTarget;
        } else {
          data =  this.nestedDataKey ? dataTarget[this.nestedDataKey] : dataTarget;
          totalCount = result[this.totalCountKey];
        }

        if (this.cascadeMode && !this.isSSPDisabled) {
          this.list = this.list.concat(data);
        } else {
          this.list = data || [];
        }

        this.totalCount = this.isSSPDisabled ? data.length : totalCount;
        // update parent
        this.$emit("search", { 
          data, 
          totalCount : this.isSSPDisabled ?  data.length : totalCount
        });
      } catch(err) {
        console.error('[ERROR IN FETCHING]', err.message)
      }

      this.isLoading = false;
    },
    // Helpers for UI
    onFirstPageActionClicked() {
      this.currentPage = 0;

      if(!this.isSSPDisabled) {
        this.loadResults();
      }

    },   
    onPreviousPageActionClicked() {
      this.currentPage -= 1;

      if(!this.isSSPDisabled) {
        this.loadResults();
      }
    },    
    onNextPageActionClicked() {
      this.currentPage += 1;

      if(!this.isSSPDisabled) {
        this.loadResults();
      }
    },    
    onLastPageActionClicked() {
      this.currentPage = this.availablePagesCount;

      if(!this.isSSPDisabled) {
        this.loadResults();
      }
    },
    onChangePageSize(currentPageSize) {
      this.currentPageSize = currentPageSize;
      this.currentPage = 0;

      if(!this.isSSPDisabled) {
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
  width: 160px;
}
</style>