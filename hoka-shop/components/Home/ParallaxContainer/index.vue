<template>
  <div class="parallax">
    <div class="parallax__container">
      <img
        src="https://res.cloudinary.com/rizfirman/image/upload/v1731514948/hoka.jpg"
        alt="parallax"
        class="parallax__background"
        width="1920"
        height="1080"
      />

      <img
        id="logo"
        src="https://res.cloudinary.com/rizfirman/image/upload/v1731514941/hoka-seeklogo.png"
        alt="Logo"
        width="500"
        height="300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const logo = ref<HTMLElement | null>(null)

  const handleScroll = () => {
    const positionY = window.scrollY

    if (logo.value) {
      const initialScale = 0.5
      const maxScale = 1.5
      const scaleValue = Math.min(initialScale + positionY * 0.001, maxScale)

      logo.value.style.transform = `translate(-50%, -50%) scale(${scaleValue})`
    }
  }

  onMounted(() => {
    logo.value = document.getElementById('logo')
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style lang="scss" scoped>
  .parallax {
    position: relative;
  }

  .parallax__container {
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #000000;
  }

  .parallax__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    max-width: 90vw;
    max-height: 40vh;
  }
</style>
