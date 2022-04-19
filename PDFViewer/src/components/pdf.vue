<template>
  <div>
    <v-dialog class="dialog-class w-100" v-model="isShowPDf">
      <v-card>
        <div class="dialog-body">
          <div class="row">
            <div class="col-12">
              <object :data="documentUrl" class="pdfStyle" type="application/pdf">
                <a
                  :href="documentUrl"
                >Your Browser dose not support viewing pdf click here to download it.</a>
              </object>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <div class="row">
            <div class="col-12 text-left">
              <button
                class="btn btn-outline-dark mx-2"
                id="cancel_pdf"
                @click="isShowPDf=false"
              >رجوع</button>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VDialog,
  VDivider,
  VCardActions,
  VSpacer,
  VBtn
} from 'vuetify/lib'
export default {
  name: 'PDF',
  props: {
    // ref : String,
    // documentUrl: String,
  },
  components: {
    VCardTitle,
    VCard,
    VDialog,
    VDivider,
    VCardActions,
    VSpacer,
    VBtn
  },
  data () {
    return {
      isShowPDf: false,
      documentUrl: ''
    }
  },
  methods: {
    open: function (url) {
      if (url != null && url != '') {
        this.documentUrl = url
        this.isShowPDf = true
      }
    },
    close () {
      this.isShowPDf = false
    }
  }
}
</script>
<style scoped>
.pdfStyle {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
