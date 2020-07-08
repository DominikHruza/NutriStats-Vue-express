<template>
    <div>
        <date-paginator></date-paginator>
        <meal-component></meal-component>
    </div>
</template>


<script>
import MealComponent from './MealComponent';
import DatePaginator from './DatePaginator';
import { mapActions } from 'vuex';
export default {
  components: {
    MealComponent,
    DatePaginator,
  },
  methods: {
    ...mapActions(['fetchMealsData', 'setTodayDate']),
  },

  created() {
    this.setTodayDate();
    this.fetchMealsData();
  },
};
</script>
