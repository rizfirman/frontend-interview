export const useToastStore = defineStore('toastStore', {
  state: () => ({
    toasts: [] as Array<{ id: number; message: string; type: string }>,
  }),
  actions: {
    addToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
      const id = Date.now()
      this.toasts.push({ id, message, type })
      setTimeout(() => this.removeToast(id), 5000) // Auto-remove after 5 seconds
    },
    removeToast(id: number) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
  },
})
