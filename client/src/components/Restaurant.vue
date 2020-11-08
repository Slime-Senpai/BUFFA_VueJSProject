<template>
  <v-container>
    <v-row class="text-center row-1">
      <v-card max-width="375" class="mx-auto">
        <v-img
          src="https://axwwgrkdco.cloudimg.io/v7/mtp-cf-images.s3-eu-west-1.amazonaws.com/images/max/6b230120-a430-4b9d-81e5-550e51b2f64d.jpg?width=1000"
          height="300px"
          dark>
          <v-row class="fill-height">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-4">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
    
              <v-btn dark icon></v-btn>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-12 pt-12">
              <div class="display-1 pl-12 pt-12">{{restaurant.name}}</div>
            </v-card-title>
          </v-row>
        </v-img>
    
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-silverware
              </v-icon>
            </v-list-item-icon>
    
            <v-list-item-content>
              <v-list-item-title>Cuisine</v-list-item-title>
              <v-list-item-subtitle>{{restaurant.cuisine}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
    
          <v-divider inset></v-divider>
    
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-star
              </v-icon>
            </v-list-item-icon>
    
            <v-list-item-content v-for="(score, index) in restaurant.grades" :key="index">
              <v-list-item-title>{{score.score}}{{score.grade}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
    
          <v-divider inset></v-divider>
    
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>
      
            <v-list-item-content>
              <v-list-item-title>{{restaurant.address.street}}</v-list-item-title>
              <v-list-item-subtitle>{{restaurant.borough}} , {{restaurant.address.zipcode}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>

    <v-row class="text-center row-2"><p></p></v-row>

    <v-row class="text-center row-3">
      <v-card tile>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Entrée</v-list-item-title>
            <v-list-item-subtitle>{{menu.entree}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Plat</v-list-item-title>
            <v-list-item-subtitle>
              {{menu.plat_1}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{menu.plat_2}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Dessert</v-list-item-title>
            <v-list-item-subtitle>{{menu.dessert}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row class="text-center row-4">
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker :lat-lng="getLatLng()">
        </l-marker>
      </l-map>
    </v-row>
          
  </v-container>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
  import { latLng } from "leaflet";

  export default {
    name: 'Restaurant',
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },

    data: () => ({
      restaurant: 
        {
          restaurant_id: "4555", 
          name: "Chez Mopolo",
          borough: "Cote d'Ivoire",
          cuisine: "Africaine",
          address:{
            coord:{
              0: -73.98242,
              1: 40.579505,
            },
            building:"Immeuble 1",
            street: "11 rue du poulet",
            zipcode: "89 881"
          },
          grades:{
            date: "10/11/2020",
            grade: "5",
            score: "5"
          }
        },
      menu:[],
      center: null,
      showMap: false,
      zoom: 13,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      currentCenter: null,
      currentZoom: 11.5,
    }),
    mounted() {
      this.getRestaurant(this.$route.params.id);
    },
    methods: {
      async getRestaurant (id) {
        const url = `http://localhost:4000/restaurants/get/${id}`;
        const data = await (await fetch(url)).json();
        this.restaurant = data;
        this.generateMenu();
        this.center = this.getLatLng();
        this.currentCenter = this.getLatLng();
        this.showMap = true;
      },
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      generateMenu(){
        var entree = ["Blinis","Velouté de champignons","Soufflé au fromage","Salade","Melon"];
        var plat_1 = ["Steak","Poulet","Veaux","Mouton"];
        var plat_2 = ["Frites","Salade","Poireau","Harricot","Soupe","Tomate"];
        var dessert = ["Fraises","Glaces","Fruits sec"];

        this.menu = {
          "entree": entree[this.getRandomInt(entree.length)],
          "plat_1": plat_1[this.getRandomInt(plat_1.length)],
          "plat_2": plat_2[this.getRandomInt(plat_2.length)],
          "dessert": dessert[this.getRandomInt(dessert.length)],
        }
      },
      getLatLng(){
        return latLng(this.restaurant.address.coord[1], this.restaurant.address.coord[0]);
      },
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      showLongText() {
        this.showParagraph = !this.showParagraph;
      },
      innerClick() {
        alert("Click!");
      }
    }
  }
</script>

<style>

.row-1 {
  margin-top: 18px;
  width: 30%;
  float: left;
}

.display-1 {
  word-break: normal;
}

.row-2{
  width: 1%;
}

.row-3{
  float: left;
  height: 535px;
  width:10%;
}

.row-4 {
  width: 60%;
  height: 670px;
  float: right;
}
</style>
