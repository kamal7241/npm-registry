# a vuetify date picker for umalqura calendar

this component extends [vuetify's v-date-picker](https://vuetifyjs.com/en/components/date-pickers/) 

all of vuetify's v-date-picker props, slots, etc applies to this component

this component depends on [@umalqura/core](https://github.com/umalqura/umalqura) and [vuetify](https://vuetifyjs.com/) you must install them before using it

## Installation

```bash
npm i vuetify-umalqura

# if you dont have @umalqura/core installed
npm i vuetify-umalqura @umalqura/core
```

## Usage:

globally register the component

```js
// src/main.js
import Vue from 'vue'

import VHijriDatePicker from 'vuetify-umalqura'

Vue.component(VHijriDatePicker.name, VHijriDatePicker)

```

or import directly in your .vue files

```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-hijri-date-picker v-model="date" locale="ar" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VHijriDatePicker from 'vuetify-umalqura'

export default {
  name: 'MyComponent',
  data: () => ({
    date: '1406-04-09'
  })
  components: {
    VHijriDatePicker
  }
}
</script>
```