<template>
  <meal-component></meal-component>
</template>

<script>
import MealComponent from './MealComponent';
import { mapActions } from 'vuex';
export default {
  components: {
    MealComponent,
  },
  methods: {
    ...mapActions(['fetchMealsData']),
  },

  created() {
    this.fetchMealsData();
  },
};
</script>
