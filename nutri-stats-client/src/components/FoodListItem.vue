<template>
    <div>
        <li
            class="list-group-item"
        >
            <div class="row">
            <span class="col-sm-4 my-auto">
                <img
                class="food-img  rounded-circle"
                :src="foodItemData.food.image"
                alt="Food img"
                />
            </span>
            <span class="food-name col-sm-4 my-auto">{{
                foodItemData.food.label.toUpperCase()
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
                    <td>{{ foodItemData.food.nutrients.CHOCDF }}</td>
                    <td>{{ foodItemData.food.nutrients.PROCNT }}</td>
                    <td>{{ foodItemData.food.nutrients.FAT }}</td>
                    <td>{{ foodItemData.food.nutrients.ENERC_KCAL }}</td>
                </tr>
                </tbody>
            </table>

            <form class="form-inline" >
                <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Portion Size(grams)"
                aria-label="Search"
                v-model="inputQty"
                />
                <button
                @click="addItemClicked"
                class="btn add-btn m-2"
                :data-itemName = "foodItemData.food.label"
                data-toggle="modal"
                data-target="#exampleModal"
                :data-itemId = "foodItemData.food.foodId"
                >
                <i class="fa fa-plus" aria-hidden="true" 
                :data-itemName = "foodItemData.food.label" 
                :data-itemId = "foodItemData.food.foodId"></i>
                </button>
            </form>
            </div>
        </li>
    </div>
</template>

<script>
export default {
  props: ['foodItemData', 'mealType'],
  data() {
    return {
      inputQty: null,
    };
  },
  methods: {
    addItemClicked(e) {
      e.preventDefault();
      const foodId = event.target.getAttribute('data-itemId');
      const itemName = event.target.getAttribute('data-itemName');

      console.log(itemName);
      this.$emit('addClicked', {
        qty: this.inputQty,
        foodId: foodId,
        itemName: itemName,
      });
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
