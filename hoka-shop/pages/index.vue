<template>
  <SplashScreen />
</template>

<script setup lang="ts">
  const router = useRouter()

  onMounted(() => {
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  })
</script>
