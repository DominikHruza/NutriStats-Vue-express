<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { store } from './store/store';
import Navbar from './components/Navbar';
export default {
  components: {
    appNavbar: Navbar,
  },

  created() {
    this.$store.dispatch('checkAuth');
  },
};
</script>
