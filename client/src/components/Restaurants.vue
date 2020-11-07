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
        ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="restaurants" hide-default-footer :loading="loading"></v-data-table>
        <v-pagination v-model="page" :length="length" circle @input="getRestaurants"></v-pagination>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    name: 'Restaurants',

    data: () => ({
      headers: [
        {
          text: 'Nom du Restaurants',
          align: 'start',
          value: 'name',
        },
        { text: 'Ville', value: 'borough' },
        { text: 'Cuisine', value: 'cuisine' }
      ],
      restaurants: [],
      length: 1,
      page: 1,
      loading: true
    }),
    mounted() {
      this.getRestaurants(1);
    },
    methods: {
      async getRestaurants (page) {
        this.page = page;
        const url = `http://localhost:4000/restaurants/getPage?page=${page}`;
        const data = await (await fetch(url)).json();
        console.log(data);
        this.restaurants = data.restaurants;
        this.length = data.count;
        this.loading = false;
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
