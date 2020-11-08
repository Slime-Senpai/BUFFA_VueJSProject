<template>
  <v-app>
    <v-app-bar
      app
      color="#3d2fff"
      dark
    >
      <div class="d-flex align-left">
        <router-link :to="'/'">
        <v-img
          alt="Restaurant Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="80"
        />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.youtube.com/watch?v=YFNsRogBqb0"
        target="_blank"
        text
        color="#3d1fff"
      >
        <span class="mr-2">Tuto informaticien</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
