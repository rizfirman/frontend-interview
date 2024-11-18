import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useDarkModeStore = defineStore('darkModeStore', () => {
  const darkModeCookie = useCookie<boolean>('darkMode', {
    default: () => true,
  })

  const isDarkMode = ref<boolean>(darkModeCookie.value)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    darkModeCookie.value = isDarkMode.value // Save state to cookie
    updateDocumentClass()
  }

  const loadDarkModeFromCookie = () => {
    isDarkMode.value = darkModeCookie.value || false
    updateDocumentClass()
  }

  const updateDocumentClass = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDarkMode,
    toggleDarkMode,
    loadDarkModeFromCookie,
  }
})
