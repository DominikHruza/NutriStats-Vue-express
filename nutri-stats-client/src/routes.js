import LoginPage from './components/LoginPage.vue';
import SignUpPage from './components/SignUpPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import AddMeal from './components/AddMeal.vue';
import { store } from './store/store';

export const routes = [
  { 
    path: '/sign-up', 
    name: 'SignUp',
    component: () => import (/*webpackChunkName: "signup-page"*/'./components/SignUpPage.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import (/*webpackChunkName: "login-page"*/'./components/LoginPage.vue'),
    
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import (/*webpackChunkName: "dashboard"*/'./components/DashboardPage.vue'),
  },

  {
    path: '/add-meal',
    name: 'AddMeal',
    component: () => import (/*webpackChunkName: "add-meal"*/'./components/AddMeal.vue'),
  },
  {
    path: '/saved-meals',
    name: 'SavedMeals',
    component: () => import (/*webpackChunkName: "saved-meals"*/'./components/SavedMealsPage.vue'),
  }
];
