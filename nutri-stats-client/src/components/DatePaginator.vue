<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a @click="decrementSelectedDate" class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">{{date.toISOString().slice(0,10)}}</a></li>
                <li class="page-item">
                <a @click="incrementSelectedDate" class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span  class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>



<script>
import {mapActions} from 'vuex'
export default {
    props: ['date'],


    methods: {
        ...mapActions(['incrementSelectedDate', 'decrementSelectedDate'])
    }
};
</script>


<style scoped>
</style>
