<template>
  <div class="login-page">
    <app-alert-box
      v-for="(alert, index) in getAlerts"
      :alertMsg="alert.msg"
      color="alert-danger"
      :key="index"
    ></app-alert-box>
    <div class="form">
      <form class="login-form">
        <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <button @click="onSubmit">login</button>
        <p class="message">
          Not registered?
          <router-link :to="{ name: 'SignUp' }">Create an account</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import AlertBox from "./AlertBox";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["removeAlert"]),
    async onSubmit(e) {
      e.preventDefault();

      const formData = {
        username: this.username,
        password: this.password,
      };

      await this.$store.dispatch("login", formData);
      if (this.isAuthenticated) {
        this.$router.push("/dashboard");
      }
    },
  },

  computed: {
    ...mapGetters(["getAlerts"]),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

  components: {
    appAlertBox: AlertBox,
  },

  watch: {
    getAlerts(val) {
      setTimeout(() => {
        if (val.length !== 0) this.removeAlert();
      }, 2000);
    },
  },
};
</script>

<style scoped>
@import "../shared-styles.scss";
</style>
