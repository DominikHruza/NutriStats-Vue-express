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
            <li
              class="list-group-item"
              v-for="(result, idx) in searchResults"
              :key="idx"
            >
              <div class="row">
                <span class="col-sm-4 my-auto">
                  <img
                    class="food-img  rounded-circle"
                    :src="result.food.image"
                    alt="Food img"
                  />
                </span>
                <span class="food-name col-sm-4 my-auto">{{
                  result.food.label.toUpperCase()
                }}</span>
              </div>
              <div class="row">
                <table class="table table-borderless col-4 offset-5 m-0 p-1">
                  <thead>
                    <tr>
                      <th scope="col">Carbs</th>
                      <th scope="col">Protein</th>
                      <th scope="col">Fats</th>
                      <th scope="col">Calories</th>
                      <th scope="col">(100g)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ result.food.nutrients.CHOCDF }}</td>
                      <td>{{ result.food.nutrients.PROCNT }}</td>
                      <td>{{ result.food.nutrients.FAT }}</td>
                      <td>{{ result.food.nutrients.ENERC_KCAL }}</td>
                    </tr>
                  </tbody>
                </table>

                <form class="form-inline">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Portion Size(grams)"
                    aria-label="Search"
                  />
                  <button
                    type="button"
                    class="btn add-btn m-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </li>
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
import axios from 'axios';
export default {
  data() {
    return {
      searchTerm: '',
      addedItem: null,
      searchResults: [],
    };
  },

  methods: {
    async searchFood(e) {
      e.preventDefault();
      console.log('uso');
      try {
        const result = await axios.get(
          `https://api.edamam.com/api/food-database/parser?ingr=${this.searchTerm}&category=generic-foods&app_id=a94e3122&app_key=dbd53702847dea2cfaba020bf85a225d`
        );
        this.searchResults = result.data.hints;
        console.log(this.searchResults);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import '../shared-styles.scss';
.food-img {
  width: 80px;
  height: 80px;
}

.food-name {
  font-weight: bold;
}
</style>
