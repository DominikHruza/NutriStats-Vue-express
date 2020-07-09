<template>
<div>
    <table class="table">
    <thead class="meal-table-head">
        <tr>
        <th scope="col">{{mealType}}</th>
        <th scope="col">Carbs</th>
        <th scope="col">Fats</th>
        <th scope="col">Protein</th>
        <th scope="col">Total kcal</th>
        </tr>
    </thead>
    <tbody class="meal-table-body">
        <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        </tr>
        <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        </tr>
        <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        </tr>
    </tbody>
    </table>
</div>
</template>


<script>
export default {
  props: ['mealType'],
};
</script>

<style scoped>
@import '../shared-styles.scss';
.meal-table-head {
  background-color: #0070bf;
  color: #ffff;
}
</style>