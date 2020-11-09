<template>
  <v-container>
    <v-text-field
      v-model="restaurant.name"
      label="Nom du Restaurant"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>

    <v-text-field
      v-model="restaurant.cuisine"
      label="Type de Cuisine"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>

    <v-text-field
      v-model="restaurant.address.building"
      label="Batiment"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>
    <v-text-field
      v-model="restaurant.address.street"
      label="Rue"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>
    <v-text-field
      v-model="restaurant.address.zipcode"
      label="Code Postal"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>

    <v-text-field
      v-model="restaurant.borough"
      label="Ville"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>

    <v-text-field
      v-model="restaurant.address.coord[1]"
      label="Latitude"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>

    <v-text-field
      v-model="restaurant.address.coord[0]"
      label="Longitude"
      single-line
      hide-details
      class="formtext"
    ></v-text-field>

    <v-btn block @click="sendRestaurants">
      ENREGISTER<v-icon>mdi-check</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'CreateRestaurant',

  data: () => ({ // address (building, coord, street, zipcode), borough, cuisine, grades (object(date, grade, score)), name, restaurant_id
      _id: null,
      restaurant: {
        address: {
          building: '',
          coord: {
            0: '',
            1: ''
          },
          street: '',
          zipcode: ''
        },
        borough: '',
        cuisine: '',
        grades: {},
        name: ''
      }
    }),
    mounted() {
      this._id = this.$route.params.id ? this.$route.params.id : null;
      if (this._id) {
        this.getRestaurant(this._id);
      }
    },
    methods: {
      async getRestaurant (id) {
        const url = `http://localhost:4000/restaurants/get/${id}`;
        const data = await (await fetch(url)).json();
        this.restaurant = data;
        delete this.restaurant._id;
      },
      async sendRestaurants () {
        this.restaurant.address.coord[0] = Number(this.restaurant.address.coord[0]);
        this.restaurant.address.coord[1] = Number(this.restaurant.address.coord[1]);
        const url = 'http://localhost:4000/restaurants/create';
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ id: this._id, restaurant: this.restaurant }),
          headers: {
            'Content-type': 'application/json'
          }
        });

        this.$router.push('/');
      },
    }

}
</script>

<style>
.formtext {
  margin-bottom: 20px;
}
</style>