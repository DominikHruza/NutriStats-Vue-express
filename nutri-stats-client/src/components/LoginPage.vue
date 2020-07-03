<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <button @click="onSubmit">login</button>
        <p class="message">
          Not registered?
          <router-link to="/sign-up">Create an account</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const formData = {
        username: this.username,
        password: this.password,
      };

      await this.$store.dispatch('login', formData);
      if (this.isAuthenticated) {
        this.$router.push('/dashboard');
      }
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped>
@import '../shared-styles.scss';
</style>
