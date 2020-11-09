import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';
import CreateRestaurant from './components/CreateRestaurant';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/create',
      component: CreateRestaurant
    },
    {
      path: '/restaurants/update/:id',
      component: CreateRestaurant
    },
    {
      path: '/restaurants/get/:id',
      component: Restaurant
    }
  ],
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
