<template>
  <div class="catalog-sort">
    <label for="sort">Sort by:</label>
    <select id="sort" v-model="sortOption" class="catalog-sort__select">
      <option value="lowest">Price: Low to High</option>
      <option value="highest">Price: High to Low</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  const sortOption = defineModel('sortOption', {
    type: String,
    default: 'lowest',
  })
</script>

<style lang="scss" scoped>
  .catalog-sort {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;

    &__select {
      margin-left: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
    }
  }
</style>
