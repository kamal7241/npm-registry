<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <DataTable
      :rows="rows"
      :columns="columns"
      :config="config"
      :classes="classes"
      :total_rows="rows.length"
      @on-change-page="onChangePage"
      @on-change-query="onChangeQuery"
      @on-change-per-page="onChangePerPage"
    >
      <template slot="id" slot-scope="props">
        <div class="inquery-item-id">
          <a :href="props.row.name.last_name">
            <span class="inqiery-link-info">
              <span class="inquery-item-info-t">{{props.column.label}}</span>
              <span class="inquery-item-info-v">{{props.row.id}}</span>
            </span>
            <span class="servicesButton__seeMore"></span>
          </a>
        </div>
      </template>
      <template slot="country" slot-scope="props">
        <router-link :to="'/ViewRealEstateDeed/'+props.row.deedNumber">
          <a :href="props.row.name.last_name">
            رابط
          </a>
        </router-link>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";

export default {
  name: "app",
  components: {
    DataTable
  },
  data() {
    return {
      classes: {
        table: "table-bordered table-striped"
      },
      rows: [
                {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
               {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
               {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
               {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
               {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
               {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
               {
          id: 1,
          name: {
            first_name: "2019-07-24T11:39:00",
            last_name: "Nitzsche"
          },
          address: {
            country: "Mayotte"
          },
          email: "franecki.anastasia@gmail.com",
          date: "2019-07-21T11:39:00"
        },
        {
          id: 1,
          name: {
            first_name: "2019-07-25T11:39:00",
            last_name: "Bayer"
          },
          age: 23,
          address: {
            country: "Guernsey"
          },
          email: "rlittle@macejkovic.biz",
          date: "2019-07-30T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
        {
          id: 2,
          name: {
            first_name: "2019-07-30T11:39:00",
            last_name: "Herman"
          },
          address: {
            country: "Papua New Guinea"
          },
          email: "delia.becker@cormier.com",
          date: "2019-07-10T11:39:00"
        },
      ],
      columns: [
        {
          label: "id",
          name: "id",
          filter: {
            type: "select",
            placeholder: "id",
            filterOn: "row"
          }
          // sort: true
        },
        {
          label: "First Name",
          name: "name.first_name",
          filter: {
            type: "date",
            isHijri: true,
            Start: "1950",
            End: "2020",
            isRange: true,
            gregorianFieldName: "date"
          },
          sort: true
        },
        {
          label: "Email",
          name: "email",
          sort: true
        },
        {
          label: "Country",
          name: "country",
          filter: {
            type: "simple",
            placeholder: "Enter country"
          },
          visible: (row) => {
                    debugger;
                    return row.address.country === 'Mayotte';
          },
        }
      ],
      config: {
        card_mode: false,
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "Vue Bootsrap 4 advanced table",
        dir: "rtl",
        per_page_options: [3, 4, 10, 14],
        per_page: 4,
      }
    };
  },
  methods: {
    onChangePage(val) {
      console.log("page changed: ", val);
    },
    onChangeQuery(val) {
      console.log("query changed: ", val);
    },
    onChangePerPage(val) {
      console.log("per page changed: ", val);
    }
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
