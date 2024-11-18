<template>
  <div class="toast-container">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :class="['toast', toast.type]"
    >
      <p>{{ toast.message }}</p>
      <button style="margin-left: 20px" @click="removeToast(toast.id)">
        ✖
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const toastStore = useToastStore()

  const removeToast = (id: number) => {
    toastStore.removeToast(id)
  }
</script>

<style scoped>
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
  }

  .toast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    animation: fadeIn 0.5s ease;
  }

  .toast.success {
    background-color: #4caf50;
  }

  .toast.error {
    background-color: #f44336;
  }

  .toast.info {
    background-color: #2196f3;
  }

  .toast.warning {
    background-color: #ff9800;
  }

  .toast button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
</style>
