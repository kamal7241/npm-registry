
<template>
  <div>
    <pdf ref="pdfViwer"></pdf>
    <button class="btn btn-outline-dark mx-2" id="cancel_pdf" @click="show">open pdf</button>
        <button class="btn btn-outline-dark mx-2" id="cancel_pdf" @click="close">close pdf</button>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import pdf from './components/pdf.vue'

@Component({
  components: {
    pdf
  },
  data () {
    return {
      pdfDialog: false
    }
  },
  methods: {
    show () {
      //  this.$refs.pdfViwer.open("sample.pdf");
      (this.$refs.pdfViwer as any).open('sample.pdf')
    },
    close () {
      //  this.$refs.pdfViwer.open("sample.pdf");
      (this.$refs.pdfViwer as any).close()
    }
  }
})
export default class App extends Vue {}
</script>
