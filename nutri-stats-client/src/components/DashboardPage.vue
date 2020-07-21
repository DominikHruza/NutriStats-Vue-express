<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-3 offset-md-5">
        <date-paginator :date="getDate"></date-paginator>
      </div>
    </div>
     <loading-indicator v-if="isLoading"></loading-indicator> 
    <div v-else class="row ">
      <div  class="col-md-6 offset-md-3">
        <meal-component 
        :mealItems="getBreakfastItems" 
        :mealTotals="getBreakfastTotals"
        mealType="breakfast"
        
        ></meal-component>
        <meal-component :mealItems="getLunchItems" :mealTotals="getLunchTotals" mealType="lunch" ></meal-component>
        <meal-component :mealItems="getDinnerItems" :mealTotals="getDinnerTotals" mealType="dinner" ></meal-component>
        <meal-component :mealItems="getSnackItems" :mealTotals="getSnackTotals" mealType="snacks" ></meal-component>
      </div>
      <add-food-modal></add-food-modal>
    </div>
  </div>
</template>


<script>
import LoadingIndicator from './LoadingIndicator'
import MealComponent from './MealComponent';
import DatePaginator from './DatePaginator';
import AddFoodModal from './AddFoodModal';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import date from '../store/modules/date';
export default {
  
  components: {
    MealComponent,
    DatePaginator,
    AddFoodModal,
    LoadingIndicator
  },

  methods: {
    ...mapActions(['fetchMealsData', 'setTodayDate']),
    ...mapGetters(['isLoading'])
  },

  computed: {
    ...mapGetters([
      'getDate',
      'getBreakfastItems',
      'getLunchItems',
      'getDinnerItems',
      'getSnackItems',
      'getBreakfastTotals',
      'getLunchTotals',
      'getDinnerTotals',
      'getSnackTotals',
      'isLoading'
    ]),
  },

  async created() {
    this.$store.dispatch('setLoading', true)
    this.setTodayDate();
    const date = this.$store.dispatch('getDate');
    await this.fetchMealsData(date);
    this.$store.dispatch('setLoading', false)
  },
};
</script>

<style scoped>
@import '../shared-styles.scss';
</style>
