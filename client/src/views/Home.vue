<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Restaurants/>
  </div>
</template>

<script>
// @ is an alias to /src
import Restaurants from '@/components/Restaurants.vue'

export default {
  name: 'Home',
  components: {
    Restaurants
  }
}
</script>
