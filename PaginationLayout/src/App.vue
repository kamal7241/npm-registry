<template>
  <div
    id="app"
  >
    <PaginationLayout
      :endpoint="endpoint"
      serverPageNumberKey="page"
      serverPageSizeKey="size"
      totalCountKey="totalPassengers"
      enableReadableStreamParse
      :cascadeMode="false"
      dataTargetKey="data"
      isDirectData
      :enableServerSidePagination="true"
      :additionalPayload="additionalPayload"
      :pageSizeOptions="[10, 50, 100, 30]"
      @search="onSearch"
    >
      <!-- Customize Loading slot -->
      <template #loader>
        <span>Loading ...</span>
      </template>      
      
      <!-- Customize list slot -->
      <template #list="{data}">
        <p
          v-for="(item, i) in data"
          :key="i"
        >
          {{ item.name }}
        </p>
      </template>
      
      <!-- Customize pagination slot -->
      <!-- <template
        #pagination="{
          data,
          onChangePageSize,
          onFirstPageActionClicked,
          onPreviousPageActionClicked,
          onNextPageActionClicked,
          onLastPageActionClicked,
        }"
      >
        <button
          class="nav-controller"
          :disabled="data.isFirstPageActionDisabled"
          @click="onFirstPageActionClicked"
        >
          الصفحة الأولى
        </button>   
        
        <button
          class="nav-controller"
          :disabled="data.isFirstPageActionDisabled"
          @click="onPreviousPageActionClicked"
        >
          السابق
        </button>   
        
        <button
          class="nav-controller"
          :disabled="data.isLastPageActionDisabled"
          @click="onNextPageActionClicked"
        >
          التالي
        </button>

        <button
          class="nav-controller"
          :disabled="data.isLastPageActionDisabled"
          @click="onLastPageActionClicked"
        >
          الصفحة الأخيرة
        </button>
      </template> -->
    </PaginationLayout>
  </div>
</template>

<script>
import PaginationLayout from "./components/PaginationLayout.vue";
export default {
  name: "App",
  components: { 
    PaginationLayout 
  },
  data() {
    return {
      additionalPayload: {},
      endpoint: serverSideLink => fetch(`https://api.instantwebtools.net/v1/passenger${serverSideLink}`)
      // client
      // endpoint: serverSideLink => fetch(`http://jsonplaceholder.typicode.com/photos?_limit=100${serverSideLink}`)
    };
  },
  methods: {
    onSearch(data) {
      console.log('onSearch', data);
    }
  }
};
</script>


