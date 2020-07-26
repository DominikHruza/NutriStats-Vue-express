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
];
