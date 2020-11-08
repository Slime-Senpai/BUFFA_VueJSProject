import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Restaurants from './components/Restaurants';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Restaurants
    }
  ],
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
