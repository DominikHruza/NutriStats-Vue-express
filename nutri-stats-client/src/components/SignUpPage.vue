<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <h2>Create an account</h2>
        <input
          type="text"
          placeholder="username"
          v-model="username"
          @blur="$v.username.$touch()"
          :class="{ invalid: $v.username.$error }"
        />
        <p v-if="$v.username.$error" class="small">
          Username must be between 4 and 20 charachters long
        </p>
        <input
          type="password"
          placeholder="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :class="{ invalid: $v.password.$error }"
        />
        <p v-if="$v.password.$error" class="small">
          Password must be minimum of 8 charachters long
        </p>
        <input
          type="password"
          placeholder="confirm password"
          v-model="confirmedPassword"
          @blur="$v.passwordConfirmed.$touch()"
          :class="{ invalid: $v.passwordConfirmed.$error }"
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
import {
  required,
  maxLength,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators';

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

  validations: {
    username: {
      required,
      minLen: minLength(4),
      maxLen: maxLength(20),
    },
    password: {
      required,
      minLen: minLength(8),
    },
    passwordConfirmed: {
      sameAs: sameAs('password'),
    },
  },
};
</script>

<style scoped>
@import '../shared-styles.scss';
.invalid {
  color: red;
  background-color: #ffc9aa;
}
</style>
