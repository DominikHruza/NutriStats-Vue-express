<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a
          @click="handleDecrement"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">{{ date.toISOString().slice(0, 10) }}</a>
      </li>
      <li class="page-item">
        <a
          @click="handleIncrement"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["date"],

  methods: {
    ...mapActions(["incrementSelectedDate", "decrementSelectedDate", "fetchMealsData"]),

    async handleIncrement(){
        this.$store.dispatch('setLoading', true)
        await this.incrementSelectedDate();
        await this.fetchMealsData();
        this.$store.dispatch('setLoading', false)
    },

    async handleDecrement(){
        this.$store.dispatch('setLoading', true)
        await this.decrementSelectedDate();
        await this.fetchMealsData();
        this.$store.dispatch('setLoading', false)
    }
  },
};
</script>

<style scoped></style>
