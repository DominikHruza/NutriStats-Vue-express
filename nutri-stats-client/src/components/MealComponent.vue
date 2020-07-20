<template>
  <div>
    <table class="table">
      <thead class="meal-table-head">
        <tr>
          <th scope="col">{{mealType.toUpperCase()}}</th>
          <th scope="col">Carbs</th>
          <th scope="col">Fats</th>
          <th scope="col">Protein</th>
          <th scope="col">Calories</th>
          <th scope="col">
            <button @click="setMealTypeModal" type="button" class="btn add-btn" data-toggle="modal" data-target="#exampleModal" :data-mealType="mealType">
              <i class="fa fa-plus" aria-hidden="true" :data-mealType="mealType"></i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="meal-table-body">
        <tr v-for="(item, idx) in mealItems" :key="idx">
          <th scope="row">{{item.name}}</th>
          <td>{{item.carbs}}</td>
          <td>{{item.fats}}</td>
          <td>{{item.protein}}</td>
          <td>{{item.calories}}</td>  
          <td>
              <button @click="handleDelClick" type="button" class="btn del-btn" data-target="#exampleModal" :data-mealType="mealType" :data-itemId="item._id">
              <i class="fa fa-minus" aria-hidden="true" :data-mealType="mealType" :data-itemId="item._id"></i>
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">TOTALS</th>
          <td>{{mealTotals.carbs}}</td>
          <td>{{mealTotals.fats}}</td>
          <td>{{mealTotals.protein}}</td>
          <td>{{mealTotals.calories}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import {mapActions} from 'vuex';
export default {
  props: ['mealType', 'mealItems', 'mealTotals'],
  methods: {

    ...mapActions(['deleteMealItem']),
    setMealTypeModal(e) {
      e.preventDefault();
      const modalType = e.target.getAttribute('data-mealType');
      this.$store.dispatch('setModalType', modalType);
    },

    handleDelClick(e){
    e.preventDefault();
    const mealType = e.target.getAttribute('data-mealType');
    const itemId = e.target.getAttribute('data-itemId');
    this.deleteMealItem({mealType, itemId});
  }
  },

  
};
</script>

<style scoped>
@import '../shared-styles.scss';
.meal-table-head {
  background-color: #0070bf;
  color: #ffff;
}

.add-btn {
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 4px 9px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}

.del-btn {
background-color: #d11a2a;
  border-radius: 20px;
  border: 1px solid #d11a2a;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 10px;
  padding: 2px 4px ;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}

.add-btn:hover {
  background-color: #5cbf2a;
}
.add-btn:active {
  position: relative;
  top: 1px;
}
</style>