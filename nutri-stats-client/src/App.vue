<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {store} from './store/store';
import Navbar from './components/Navbar';
export default {
  components: {
    appNavbar: Navbar,
  },

  methods: {
    checkAuth() {
      const {isAuthenticated} = store.state.auth
     console.log(isAuthenticated)
      if(!isAuthenticated && this.$route.path !== '/login') {
         this.$router.push({name: "Login"}
        );
      }
    },
  },

  created() {
    this.checkAuth()
  }

};
</script>
