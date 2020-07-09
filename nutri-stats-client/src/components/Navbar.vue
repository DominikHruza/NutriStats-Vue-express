<template>
 <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
    <a class="navbar-brand" href="#">NutriStats</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li v-if="isAuthenticated" class="nav-item active">
          <router-link :to="{name: 'Dashboard'}" class="nav-link" href="#"
            >Dashboard <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link :to="{name: 'SavedMeals'}" class="nav-link" href="#">Saved Meals</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-collapse collapse order-2 order-md-2">
    <ul class=" navbar-nav ml-auto text-center">
        <li v-if="isAuthenticated" class="nav-item" @click="handleLogout">
            <router-link :to="{name: 'Login'}" class="nav-link"><i class="fas fa-user"></i><span>  Logout</span></router-link>
        </li>
    </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    handleLogout() {
      this.$store.dispatch('logout');
      this.$router.replace('/login');
    },
  },
  computed: mapGetters(['isAuthenticated']),
};
</script>

<style scoped>
.navbar-custom {
  background-color: #0070bf !important;
  color: white !important;
}
</style>
