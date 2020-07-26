<template>
  <div>
    <li class="list-group-item">
      <div v-if="addClicked">
        <alert-box
          v-for="(alert, index) in getAlerts"
          :alertMsg="alert"
          color="alert-danger"
          :key="index"
        ></alert-box>
      </div>
      <div class="row">
        <span class="col-sm-4 my-auto">
          <img
            class="food-img rounded-circle"
            :src="foodItemData.food.image"
            alt="Food img"
          />
        </span>
        <span class="food-name col-sm-4 my-auto">
          {{ foodItemData.food.label.toUpperCase() }}
        </span>
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
              <td>
                {{ parseFloat(foodItemData.food.nutrients.CHOCDF.toFixed(2)) }}
              </td>
              <td>
                {{ parseFloat(foodItemData.food.nutrients.PROCNT.toFixed(2)) }}
              </td>
              <td>
                {{ parseFloat(foodItemData.food.nutrients.FAT.toFixed(2)) }}
              </td>
              <td>
                {{
                  parseFloat(foodItemData.food.nutrients.ENERC_KCAL.toFixed(2))
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Portion Size (grams)"
            aria-label="Search"
            v-model="inputQty"
          />
          <button
            @click="addItemClicked"
            class="btn add-btn m-2"
            :data-itemName="foodItemData.food.label"
            :data-itemId="foodItemData.food.foodId"
            data-dismiss="modal"
          >
            <i
              class="fa fa-plus"
              aria-hidden="true"
              :data-itemName="foodItemData.food.label"
              :data-itemId="foodItemData.food.foodId"
            ></i>
          </button>
        </form>
      </div>
    </li>
  </div>
</template>

<script>
import AlertBox from "./AlertBox";
import { numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["foodItemData", "mealType"],
  data() {
    return {
      inputQty: null,
      addClicked: false,
    };
  },

  methods: {
    ...mapActions(["removeAlert"]),

    addItemClicked(e) {
      e.preventDefault();
      this.addClicked = true;
      const foodId = event.target.getAttribute("data-itemId");
      const itemName = event.target.getAttribute("data-itemName");

      if (this.$v.$invalid) {
        this.$store.commit("SET_ALERTS", "Invalid portion size!");
        return;
      }
      this.$emit("addClicked", {
        qty: this.inputQty,
        foodId: foodId,
        itemName: itemName,
      });
    },
  },

  computed: {
    ...mapGetters(["getAlerts"]),
  },

  validations: {
    inputQty: {
      numeric,
      required,
    },
  },

  watch: {
    getAlerts(val) {
      setTimeout(() => {
        if (val.length !== 0) this.removeAlert();
      }, 2000);
    },
  },

  components: {
    AlertBox,
  },
};
</script>

<style scoped>
@import "../shared-styles.scss";
.food-img {
  width: 80px;
  height: 80px;
}

.food-name {
  font-weight: bold;
}
</style>
