import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import { routes } from "./routes";
import { store } from "./store/store";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuelidate);

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const now = new Date();

    console.log(router.currentRoute);
    if (!token) {
      try {
        next({
          name: "Login",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default router;
