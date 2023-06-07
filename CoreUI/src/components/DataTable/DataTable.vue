<template>
  <section :class="wrapperClass">
    <div
      v-for="(row, i) in rows"
      :key="i"
      class="base-data-table-list-item mb-4 d-flex flex-column flex-sm-row align-strech"
    >
      <slot
        v-if="enhancedColumns.primaryColumn"
        :name="enhancedColumns.primaryColumn.field"
        :data="{ row, columns, currentIteration: i }"
      >
        <div class="field primary">
          <div
            :class="[
              `label-icon-wrapper d-flex align-center`,
              { clickabel: onClick },
            ]"
            @click="onClick(row)"
          >
            <label-and-value
              :is-loading="isLoading"
              :label="enhancedColumns.primaryColumn.title"
              :value="getColumnValue(row, enhancedColumns.primaryColumn)"
            />

            <template v-if="onClick">
              <v-spacer v-if="!noSpacer" />

              <v-btn :id="clickPrimaryFieldAction" class="arrow" text>
                <v-icon color="white" medium> mdi-arrow-left </v-icon>
              </v-btn>
            </template>
          </div>
        </div>
      </slot>

      <div class="enhanced-columns-wrapper d-flex flex-wrap align-center">
        <template
          v-for="(column, currentIteration) in enhancedColumns.sortedColumns"
          :class="column.class"
        >
          <slot
            :name="column.field"
            :data="{ row, columns, currentIteration }"
            currentClass="field"
          >
            <label-and-value
              class="field"
              :label="column.title"
              :is-loading="isLoading"
              :value="getColumnValue(row, column)"
            />
          </slot>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
// components
import LabelAndValue from "../LabelAndValue/labelAndValue.vue";

export default {
  name: "DataTable",
  components: {
    LabelAndValue,
  },
  props: {
    clickPrimaryFieldAction: {
      type: String,
      default: "",
    },

    columns: {
      type: Array,
      required: true,
      default: () => [],
    },

    rows: {
      type: Array,
      required: true,
      default: () => [],
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    primaryField: {
      type: String,
      default: "",
    },

    onClick: {
      type: Function,
    },

    wrapperClass: {
      type: String,
      default: "",
    },

    noSpacer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    enhancedColumns() {
      let primaryColumn = null;

      if (this.rows.length) {
        if (!this.primaryField) {
          return {
            primaryColumn,
            sortedColumns: this.columns,
          };
        }

        const primaryFieldIndex = this.columns.findIndex(
          (column) => column.field === this.primaryField
        );

        if (primaryFieldIndex > -1) {
          const sortedColumns = [...this.columns];
          [primaryColumn] = sortedColumns.splice(primaryFieldIndex, 1);

          return {
            primaryColumn,
            sortedColumns,
          };
        }

        return {
          primaryColumn,
          sortedColumns: this.columns,
        };
      }

      return {
        primaryColumn,
        sortedColumns: [],
      };
    },
  },
  methods: {
    getColumnValue(row, column) {
      if (column.formatter) {
        return column.formatter(row) || "---";
      }
      return row[column.field] || "---";
    },
  },
};
</script>

<style scoped>
.base-data-table-list-item {
  transition: box-shadow 0.3s ease-in-out;
  border: 1px solid rgb(var(--layout-primary-rgb-color), 0.1) !important;
  /* Todo: to be removed */
  box-shadow: unset !important;
}

.base-data-table-list-item .field {
  padding: 10px;
  min-width: 157px;
}

.base-data-table-list-item .field.primary {
  background-color: rgb(var(--layout-primary-rgb-color), 0.1) !important;
}

.base-data-table-list-item .field.primary .label-icon-wrapper {
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

.base-data-table-list-item .field.primary .label-icon-wrapper.clickabel {
  cursor: pointer;
}

.base-data-table-list-item .field.primary .base-label-and-value {
  width: 150px;
}

.base-data-table-list-item .field.primary .arrow {
  cursor: pointer;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  min-width: auto;
  transition: background-color 0.3s ease-in-out;
  /* Todo:  To be removed */
  background-color: unset;
  /* transition: unset; */
}

.base-data-table-list-item .field.primary .arrow span.v-btn__content .v-icon {
  color: var(--layout-primary-color) !important;
  transition: color 0.3s ease-in-out;
}

.base-data-table-list-item .enhanced-columns-wrapper {
  flex: 1;
  justify-content: space-around;
}

.base-data-table-list-item:hover {
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.05) !important;
}

.base-data-table-list-item:hover .label-icon-wrapper {
  transition: all 0.9s ease-in-out;
  transform: translateX(-25px);
}

.base-data-table-list-item:hover
  .label-icon-wrapper
  .field.primary
  .base-label-and-value {
  transform: translateX(-15px);
  transition: all 0.3s ease-in-out;
}

.base-data-table-list-item:hover .field.primary .arrow {
  background-color: var(--layout-primary-color);
  /* Todo:  To be removed */
  transform: unset;
}

.base-data-table-list-item:hover .field.primary span.v-btn__content .v-icon {
  color: #fff !important;
}
</style>
