<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <h2>Create an account</h2>
        <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <input
          type="password"
          placeholder="confirm password"
          v-model="confirmedPassword"
        />
        <button @click="onSubmit">Sign Up</button>
        <p class="message">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../axios-config';
//import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmedPassword: '',
    };
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const formData = {
        username: this.username,
        password: this.password,
      };

      this.$store.dispatch('signIn', formData);
    },
  },
};
</script>

<style scoped>
@import '../shared-styles.scss';
</style>
