<template>
  <div class="modal" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Search Food</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <nav class="navbar navbar-light bg-light">
              <form class="form-inline">
                <input
                  v-model="searchTerm"
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  @click="searchFood"
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </nav>
          </div>
          <hr />
          <ul class="list-group">
            <food-list-item 
                v-for="(result, idx) in searchResults" :key="idx" 
                :foodItemData="result" 
                @addClicked="addFoodToMeal">
            </food-list-item>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Add</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FoodListItem from './FoodListItem';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    foodListItem: FoodListItem,
  },
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      inputQty: null,
    };
  },

  methods: {
    ...mapActions(['addItemToMeal']),
    ...mapGetters(['getModalType']),
    async searchFood(e) {
      e.preventDefault();
      try {
        const result = await axios.get(
          `https://api.edamam.com/api/food-database/parser?ingr=${
            this.searchTerm
          }&category=generic-foods&app_id=a94e3122&app_key=dbd53702847dea2cfaba020bf85a225d`
        );
        this.searchResults = result.data.hints;
      } catch (error) {
        console.log(error);
      }
    },

    async addFoodToMeal(event) {
      const mealType = this.getModalType();
      const { qty, foodId, itemName } = event;

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = {
        ingredients: [
          {
            quantity: parseInt(qty),
            measureURI:
              'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
            foodId: `${foodId}`,
          },
        ],
      };
      const result = await axios.post(
        `https://api.edamam.com/api/food-database/v2/nutrients?app_id=a94e3122&app_key=dbd53702847dea2cfaba020bf85a225d`,
        JSON.stringify(body),
        config
      );

      const { ENERC_KCAL, CHOCDF, FAT, PROCNT } = result.data.totalNutrients;
      const foodItemData = {
        mealType,
        foodItem: {
          itemName,
          ENERC_KCAL: ENERC_KCAL.quantity,
          CHOCDF: CHOCDF.quantity,
          FAT: FAT.quantity,
          PROCNT: PROCNT.quantity,
        },
      };

      await this.addItemToMeal(foodItemData);
    },
  },
};
</script>

<style scoped>
</style>
