<template>
  <div class="pagination">
    <button
      v-for="page in props.totalPages"
      :key="page"
      :class="{ active: page === props.currentPage }"
      @click="emit('click', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  })

  const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .pagination button {
    padding: 0.5rem 0.75rem;
    background-color: vars.$primary-color;
    color: vars.$secondary-color;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .pagination button.active,
  .pagination button:hover {
    background-color: vars.$secondary-color;
    color: black;
  }
</style>
