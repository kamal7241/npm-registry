<template>
  <div id="app">
    <AttachmentField 
      label='Vue3'
      name='V3'
      isRequired
      isMultiple
      :maxFileSizeInMega='1'
      :maxFilesSizeInMega='2'
      :maxDisplayNameLength='5'
      :maxAttachments='20'
      :resetErrorOnSelect='false'
      :activateInternalErrorPreview='false'
      :localizations='{actionName: "sdfsdf"}'
      :value='[{name: "dfgdfgdfg"}]'
      enableFullnameDisplay
      validateOnSingleFileSize
      enableFancyPreview
      exportInitialFieldMeta
      @select='logVue3'
      @error="errVue3"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { MojCoreUiSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  MojCoreUiSample,
  // }
  methods: {
    logVue2: files => console.log('V2', files),
    logVue3: files => console.log('V3', files),
    errVue3: files => console.log('V3Error', files),
    errVue2: files => console.log('V2Error', files),
  }
});
</script>


