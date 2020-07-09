<template>
    <div>
        <date-paginator :date="getDate"></date-paginator>
        <meal-component></meal-component>
    </div>
</template>


<script>
import MealComponent from './MealComponent';
import DatePaginator from './DatePaginator';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    MealComponent,
    DatePaginator,
  },
  methods: {
    ...mapActions(['fetchMealsData', 'setTodayDate']),
  },

  computed: {
    ...mapGetters(['getDate'])
  },

  created() {
    this.setTodayDate();
    this.fetchMealsData();
  },
};
</script>
