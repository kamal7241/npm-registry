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

    <empty-placeholder :primary-text="emptyPlaceholderText" icon="mdi-check" />

    <data-table
      :rows="rows"
      :columns="columns"
      :on-click="onRowClicked"
      :primary-field="primaryField"
    >
      <template #dateTime="{ data: { row }, currentStyles }">
        <label-and-value
          preview
          :class="['field', currentStyles]"
          :label="$t('appointmentDateAndTime')"
          :value="row.dateTime"
          value-class="label-and-value-value"
        />
      </template>

      <template #status="{ data: { row }, currentStyles }">
        <label-and-value
          preview
          :class="['field', currentStyles]"
          :label="$t('appointmentStatus')"
          :value="row.status"
          value-class="label-and-value-value"
        />
      </template>

      <template #actions="{ data: { row }, currentStyles }">
        <label-and-value preview :class="['field', currentStyles]">
          <template #value>
            <v-btn
              v-if="row.pendingApproval && !row.isCancelled"
              outlined
              color="error"
              @click="openCancelDialog(row)"
            >
              {{ $t("cancel") }}
            </v-btn>
          </template>
        </label-and-value>
      </template>
    </data-table>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    Calendar: () => import("./components/Calendar/calendar.vue"),
    LabelAndValue: () => import("./components/LabelAndValue/labelAndValue.vue"),
    DataTable: () => import("./components/DataTable/dataTable.vue"),
    EmptyPlaceholder: () =>
      import("./components/EmptyPlaceholder/emptyPlaceholder.vue"),
  },
  data() {
    return {
      // Calendar
      isHijri: true,
      date: [],
      // DataTable
      rows: [
        {
          appointmentID: "Hello",
          dateTime: "Hello",
          serviceTitle: "Hello",
          status: "Hello",
        },
      ],
      primaryField: "appointmentID",
      // EmptyPlaceholder
      emptyPlaceholderText: "تجربة نص",
    };
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t("appointmentNumber"),
          field: "appointmentID",
        },
        {
          title: this.$t("appointmentDateAndTime"),
          field: "dateTime",
        },
        {
          title: this.$t("serviceName"),
          field: "serviceTitle",
        },
        {
          title: this.$t("appointmentStatus"),
          field: "status",
        },
        {
          title: "",
          field: "actions",
        },
      ];
    },
  },
  methods: {
    // Calendar
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

    // DataTable
    onRowClicked(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="scss" scoped>
// @media (min-width: 600px) {
//   .field {
//     width: 25% !important;
//     padding: 25px;
//   }
// }
</style>
