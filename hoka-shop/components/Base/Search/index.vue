<template>
  <div class="catalog-search">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by product name..."
      class="catalog-search__input"
    />
  </div>
</template>

<script setup lang="ts">
  const searchQuery = defineModel('searchQuery', {
    type: String,
  })
</script>

<style lang="scss" scoped>
  .catalog-search {
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
    padding: 10px;

    &__input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
    }
  }
</style>
