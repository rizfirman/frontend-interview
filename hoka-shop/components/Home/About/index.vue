<template>
  <div>
    <div
      :class="[
        'details',
        {
          dark: darkModeStore.isDarkMode,
        },
      ]"
    >
      <div class="details__header">
        <p>About</p>
      </div>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
        voluptate, deserunt veniam iste non facere aspernatur ad atque labore
        doloribus eum expedita molestiae, nemo eligendi odit iusto cupiditate
        aut aliquid.
      </p>
    </div>
    <div class="footer__btn">
      <BaseButton label="Learn More" @click="goToTheAboutPage()" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
  const darkModeStore = useDarkModeStore()

  onMounted(() => {
    darkModeStore.loadDarkModeFromCookie()
  })

  const goToTheAboutPage = () => {
    router.push('/about')
  }
</script>

<style lang="scss" scoped>
  .details {
    max-width: 800px;
    margin: auto;
    margin-top: 5rem;
    color: black;
    font-size: 1.2rem;
    line-height: 2rem;
    text-align: center;
    &__header {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    &.dark {
      color: white;
      .details__header {
        color: black;
      }
    }
  }

  .footer__btn {
    max-width: 800px;
    margin: 2rem auto;
    text-align: center;
  }
</style>
