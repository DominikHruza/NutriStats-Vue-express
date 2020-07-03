import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuelidate);

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
