<template>
  <v-container>

    <v-row class="text-center searchdiv">
      <v-col
        cols="12">
        <v-card-title>
          Recherche de cas
          <v-spacer></v-spacer>
        </v-card-title>

        <v-text-field
          label="Mot clé"
          outlined
          clearable
        ></v-text-field>

        <v-menu
          ref="menu"
          v-model= "menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model= "date"
              label="Date minimum"
              prepend-icon="mdi-calendar"
              readonly
              v-bind= "attrs"
              v-on= "on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model= "date"
            no-title
            scrollable>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false">
              Annuler
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)">
              Valider
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu
          ref="menu2"
          v-model= "menu2"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model= "date2"
              label="Date maximum"
              prepend-icon="mdi-calendar"
              readonly
              v-bind= "attrs"
              v-on= "on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model= "date2"
            no-title
            scrollable>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu2 = false">
              Annuler
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu2.save(date)">
              Valider
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-select
            :items="items"
            label="Choisir un Département"
            solo
          ></v-select>

          <v-btn
            color="secondary"
            depressed
            elevation="6"
            large
          >Rechercher</v-btn>

      </v-col>
    </v-row>

    <v-row class="text-center emptyrow">
      <v-col cols="12">
      </v-col>
    </v-row>

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
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          class="elevation-1">
          <template v-slot:[`item.classe`]="{ item }">
            <v-chip
              :color="getColor(item.classe)"
              dark>
              {{ item.classe }}
            </v-chip>
          </template>
        </v-data-table> 
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      items: ['Toutes', 'Auvergne', 'Aquitaine', 'Lorraine'],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      date2: new Date().toISOString().substr(0, 10),
      menu2: false,
      search: '',
      headers: [
        {
          text: 'Nom du cas',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Obs.', value: 'obs' },
        { text: 'Département', value: 'dep' },
        { text: 'Classe', value: 'classe' },
        { text: 'Mise a Jour', value: 'maj' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          obs: 159,
          dep: 6.0,
          classe: "A",
          maj: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          obs: 237,
          dep: 9.0,
          classe: "B",
          maj: 4.3,
        },
        {
          name: 'Eclair',
          obs: 262,
          dep: 16.0,
          classe: "C",
          maj: 6.0,
        },
        {
          name: 'Cupcake',
          obs: 305,
          dep: 3.7,
          classe: "D",
          maj: 4.3,
        },
        {
          name: 'Gingerbread',
          obs: 356,
          dep: 16.0,
          classe: "D1",
          maj: 3.9,
        },
        {
          name: 'Jelly bean',
          obs: 375,
          dep: 0.0,
          classe: "D2",
          maj: 0.0,
        },
        {
          name: 'Lollipop',
          obs: 392,
          dep: 0.2,
          classe: 98,
          maj: 0,
        },
        {
          name: 'Honeycomb',
          obs: 408,
          dep: 3.2,
          classe: 87,
          maj: 6.5,
        },
        {
          name: 'Donut',
          obs: 452,
          dep: 25.0,
          classe: 51,
          maj: 4.9,
        },
        {
          name: 'KitKat',
          obs: 518,
          dep: 26.0,
          classe: 65,
          maj: 7,
        },
        {
          name: 'KitKat2',
          obs: 518,
          dep: 26.0,
          classe: 65,
          maj: 7,
        },
      ],
    }),
    methods: {
      getColor (classe) {
        if (classe == "A") return 'green'
        else if (classe == "B") return '#B2A219'
        else if (classe == "C") return 'orange'
        else if (classe == "D") return 'red'
        else if (classe == "D1") return '#640D0D'
        else if (classe == "D2") return 'black'
        else return 'grey'
      },
    }
  }
</script>

<style>
.searchdiv{
  width: 25%;
  margin-right: 30px;
  border-style: solid;
  border-radius: 20px;
  border-color: darkgray;
  float: left;
}
.emptyrow{
  width: 3%;
  float: left;
}

.resultdiv{
  width: 74%;
  margin-left: 30px;
  border-style: solid;
  border-radius: 20px;
  border-color: darkgray;
}
</style>
