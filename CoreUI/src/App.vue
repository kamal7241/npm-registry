<template>
  <v-app>
    <calendar
      color="primary"
      :label="'تصفية بالتاريخ'"
      :row="true"
      :range="true"
      :hijri="isHijri"
      :value="date"
      :hint="'يرجى ادخال فترة زمنية'"
      dense
      @change="changeDate"
      @changeHijri="changeHijriState"
    />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    Calendar: () => import("@/components/Calendar/calendar.vue"),
  },
  data() {
    return {
      isHijri: true,
      date: [],
    };
  },
  methods: {
    changeDate(newDate) {
      if (newDate.gregorian.length === 2) {
        this.date = this.isHijri ? newDate.hijri : newDate.gregorian;
        this.filterDate = newDate.gregorian;
      } else {
        this.date = [];
        this.filterDate = [];
      }
    },

    changeHijriState() {
      this.isHijri = !this.isHijri;
    },
  },
};
</script>
