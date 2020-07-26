<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pg-blue">
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
      <li class="page-item date">
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
    ...mapActions([
      "incrementSelectedDate",
      "decrementSelectedDate",
      "fetchMealsData",
    ]),

    async handleIncrement() {
      this.$store.dispatch("setLoading", true);
      await this.incrementSelectedDate();
      await this.fetchMealsData();
      this.$store.dispatch("setLoading", false);
    },

    async handleDecrement() {
      this.$store.dispatch("setLoading", true);
      await this.decrementSelectedDate();
      await this.fetchMealsData();
      this.$store.dispatch("setLoading", false);
    },
  },
};
</script>

<style scoped>
pagination-outer {
  text-align: center;
}
.pagination {
  font-family: "Roboto", sans-serif;
  padding: 20px 30px;
  display: inline-flex;
  border-radius: 50px;
  position: relative;
}
.pagination li a.page-link {
  color: #140536;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 45px;
  height: 45px;
  width: 45px;
  padding: 0;
  margin: 0 12px 0 0;
  border: none;
  border-radius: 0;
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
}

.pagination li.date a.page-link {
  color: #140536;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 45px;
  height: 45px;
  width: 150px;
  padding: 0;
  margin: 0 12px 0 0;
  border: none;
  border-radius: 0;
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
}
.pagination li.active a.page-link,
.pagination li a.page-link:hover,
.pagination li.active a.page-link:hover {
  color: #fff;
  border: none;
}
.pagination li:first-child a.page-link {
  border-radius: 40px 0 0 40px;
}
.pagination li:last-child a.page-link {
  margin-right: 0;
  border-radius: 0 40px 40px 0;
}
.pagination li a.page-link:before {
  content: "";
  background-color: #007bff;
  height: 0;
  width: 100%;
  filter: blur(10px);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transition: all 0.3s;
}
.pagination li.active a.page-link:before,
.pagination li a.page-link:hover:before,
.pagination li.active a.page-link:hover:before {
  height: 100%;
  filter: blur(0);
}
</style>
