<template>
  <div class="empty-state">
    <p v-if="searchQuery">No products found for "{{ props.searchQuery }}"</p>
    <p v-else>{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    searchQuery: {
      type: String,
      required: false,
      default: '',
    },
    message: {
      type: String,
      required: false,
      default: 'No products found.',
    },
  })
</script>

<style lang="scss" scoped>
  .empty-state {
    text-align: center;
    padding: 2rem;
    font-size: 1.25rem;
    color: #888;
  }
</style>
