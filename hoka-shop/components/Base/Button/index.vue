<template>
  <button class="btn" @click="emit('click')">{{ props.label }}</button>
</template>

<script setup lang="ts">
  const emit = defineEmits(['click'])

  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
  })
</script>

<style lang="scss" scoped>
  .btn {
    font-size: 1rem;
    font-weight: 600;
    outline: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: vars.$secondary-color;
    }
  }
</style>
