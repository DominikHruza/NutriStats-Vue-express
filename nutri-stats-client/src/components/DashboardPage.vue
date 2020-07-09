<template>
<div class="container-fluid mt-3">
    <div class="row">
        <div class="col-sm-3 offset-sm-5"> 
            <date-paginator :date="getDate"></date-paginator>  
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6 offset-sm-3"> 
            <meal-component mealType="Breakfast"></meal-component>
            <meal-component mealType="Lunch"></meal-component>
            <meal-component mealType="Dinner"></meal-component>
            <meal-component mealType="Snacks"></meal-component>
        </div>   
    </div>   
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
    ...mapGetters(['getDate']),
  },

  created() {
    this.setTodayDate();
    this.fetchMealsData();
  },
};
</script>

<style scoped>
@import '../shared-styles.scss';
</style>
