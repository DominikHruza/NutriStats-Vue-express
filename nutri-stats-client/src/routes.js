import { store } from "./store/store";

export const routes = [
  {
    path: "/sign-up",
    name: "SignUp",
    component: () =>
      import(/*webpackChunkName: "signup-page"*/ "./components/SignUpPage.vue"),
  },

  {
    path: "/",
    name: "Login",
    component: () =>
      import(/*webpackChunkName: "login-page"*/ "./components/LoginPage.vue"),
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(
        /*webpackChunkName: "dashboard"*/ "./components/DashboardPage.vue"
      ),
    meta: { requiresAuth: true },
  },

  {
    path: "/add-meal",
    name: "AddMeal",
    component: () =>
      import(/*webpackChunkName: "add-meal"*/ "./components/AddMeal.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/saved-meals",
    name: "SavedMeals",
    component: () =>
      import(
        /*webpackChunkName: "saved-meals"*/ "./components/SavedMealsPage.vue"
      ),
    meta: { requiresAuth: true },
  },
];
