import LoginPage from './components/LoginPage.vue';
import SignUpPage from './components/SignUpPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import AddMeal from './components/AddMeal.vue';
import { store } from './store/store';

export const routes = [
  { path: '/sign-up', component: SignUpPage },

  {
    path: '/login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      const { isAuthenticated } = store.state.auth;
      isAuthenticated ? next('/dashboard') : next();
    },
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter: (to, from, next) => {
      const { isAuthenticated } = store.state.auth;

      isAuthenticated ? next() : next('/login');
    },
  },
  {
    path: '/add-meal',
    component: AddMeal,
    beforeEnter: (to, from, next) => {
      const { isAuthenticated } = store.state.auth;
      isAuthenticated ? next() : next('/login');
    },
  },
];
