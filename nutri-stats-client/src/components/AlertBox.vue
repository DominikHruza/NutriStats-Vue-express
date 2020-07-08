<template>
  <div class="alert" :class="color" role="alert">
    {{ alertMsg }}
  </div>
</template>

<script>
export default {
  props: ['alertMsg', 'color'],
};
</script>
