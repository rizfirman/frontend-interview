<template>
  <div>
    <HomeParallaxContainer />
    <div :class="['content', { dark: darkModeStore.isDarkMode }]">
      <HomeProductGallery />
      <HomeAbout />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'main-layout',
  })

  const darkModeStore = useDarkModeStore()

  onMounted(() => {
    darkModeStore.loadDarkModeFromCookie()
  })
</script>

<style lang="scss" scoped>
  .content {
    min-height: 125vh;
    background-color: white;
    display: grid;
    place-content: center;
    &.dark {
      background-color: #000000;
    }
  }
</style>
