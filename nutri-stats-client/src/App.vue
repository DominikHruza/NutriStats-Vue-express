<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { store } from './store/store';
import Navbar from './components/Navbar';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    appNavbar: Navbar,
  },
};
</script>
