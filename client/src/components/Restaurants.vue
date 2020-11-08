<template>
  <v-container>
    <v-row class="text-center resultdiv" >
      <v-col
        class="mb-5"
        cols="12">
        <v-card-title>
        Resultats
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche parmis les resultats"
          single-line
          hide-details
          @change="textChange"
        ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="restaurants" hide-default-footer :loading="loading">
          <template v-slot:item="{ item }">
              <router-link :to="'/restaurant/' + item._id" tag="tr">
                <td class="text-start">{{ item.name }}</td>
                <td class="text-start">{{ item.borough }}</td>
                <td class="text-start">{{ item.cuisine }}</td>
              </router-link>
          </template>
          <template slot="no-data">
            <v-alert :value="true">
              Aucun restaurant trouvé !
            </v-alert>
          </template>
        </v-data-table>
        <v-select v-model="pageSize" :items="pageSizes" item-text="text" item-value="nbPages" label="PageSize" persistent-hint single-line></v-select>
        <v-pagination v-model="page" :length="length" total-visible="10" circle @input="getRestaurants"></v-pagination>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    name: 'Restaurants',

    data: () => ({
      search: '',
      headers: [
        {
          text: 'Nom du Restaurants',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Ville', sortable: false, value: 'borough' },
        { text: 'Cuisine', sortable: false, value: 'cuisine' }
      ],
      restaurants: [],
      length: 1,
      page: 1,
      pageSize: 50,
      pageSizes: [
        { nbPages: 10, text: '10 par page' },
        { nbPages: 25, text: '25 par page' },
        { nbPages: 50, text: '50 par page' },
        { nbPages: 100, text: '100 par page' }
      ],
      loading: true
    }),
    mounted() {
      this.getRestaurants(1);
    },
    methods: {
      async getRestaurants (page) {
        this.page = page;
        const url = `http://localhost:4000/restaurants/getPage?page=${this.page}&pageSize=${this.pageSize}` + (this.search ? `&name=${this.search}` : '');
        const data = await (await fetch(url)).json();
        this.restaurants = data.restaurants;
        this.length = data.count;
        this.loading = false;
      },
      textChange (search) {
        this.search = search;
        this.getRestaurants(this.page);
      },
    }
  }
</script>

<style>

.resultdiv {
  border-style: solid;
  border-radius: 20px;
  border-color: darkgray;
}
</style>
