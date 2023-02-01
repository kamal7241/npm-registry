<template>
  <section>
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
        <div class="field primary d-flex align-center">
          <label-and-value
            preview
            :is-loading="isLoading"
            :label="enhancedColumns.primaryColumn.title"
            :value="
              getPrimaryColumnValue(row[enhancedColumns.primaryColumn.field])
            "
          />

          <template v-if="onClick">
            <v-spacer />

            <v-icon
              :id="clickPrimaryFieldAction"
              medium
              color="primary"
              class="'arrow bold mr-5"
              @click="onClick(row)"
            >
              mdi-arrow-left
            </v-icon>
          </template>
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
            styles="field"
          >
            <label-and-value
              preview
              class="field"
              :label="column.title"
              :is-loading="isLoading"
              :value="row[column.field] || '---'"
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
      default: () => [],
    },

    rows: {
      type: Array,
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
      default: () => {},
    },

    primaryFieldValueEnhancer: {
      type: Function,
      default: () => {},
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
    getPrimaryColumnValue(value) {
      const { primaryFieldValueEnhancer } = this;
      const columnValue = primaryFieldValueEnhancer
        ? primaryFieldValueEnhancer(value)
        : value;

      return columnValue || "---";
    },
  },
};
</script>
