<template>
  <div
    :class="[
      'about-page',
      {
        dark: darkModeStore.isDarkMode,
      },
    ]"
  >
    <div class="about-page__slider">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="about-page__slide"
        :style="{ backgroundImage: `url(${image})` }"
        :class="{ 'about-page__slide--active': index === activeSlide }"
      ></div>
    </div>

    <div class="about-page__content-wrapper">
      <div class="about-page__about-content">
        <h2 class="about-page__title">About Hoka</h2>
        <p class="about-page__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum
          facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla,
          orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin
          sapien justo in libero. Vestibulum mollis mauris enim.
        </p>
        <ul class="about-page__social-media-list">
          <li>
            <a href="https://www.facebook.com/hoka" target="_blank">Facebook</a>
          </li>
          <li>
            <a href="https://www.instagram.com/hoka" target="_blank"
              >Instagram</a
            >
          </li>
          <li>
            <a href="https://twitter.com/hoka" target="_blank">Twitter</a>
          </li>
          <li>
            <a href="https://www.youtube.com/@HOKA_TV" target="_blank"
              >YouTube</a
            >
          </li>
        </ul>
      </div>

      <div class="about-page__video-section">
        <video
          controls
          :poster="videoThumbnail"
          class="about-page__video-player"
        >
          <source :src="videoUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
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

  const images = [
    'https://res.cloudinary.com/rizfirman/image/upload/v1731599114/8556_1559699864_bpglsy.webp',
    'https://res.cloudinary.com/rizfirman/image/upload/v1731599114/https___hypebeast.com_image_2021_02_hoka-one-one-tennine-hike-boot-black-colorway-gore-tex-vibram-7_xr8vyh.avif',
    'https://res.cloudinary.com/rizfirman/image/upload/v1731599115/hoka_speedgoat5_content_width3-min_1320x717_crop_center_fonck1.webp',
  ]

  const videoUrl =
    'https://res.cloudinary.com/rizfirman/video/upload/v1731598890/FLY_HUMAN_FLY___BIRD_S_EYE_Full_Film_jemmak.mp4'
  const videoThumbnail =
    'https://res.cloudinary.com/rizfirman/image/upload/v1731599114/8556_1559699864_bpglsy.webp'

  const activeSlide = ref(0)
  let sliderInterval: ReturnType<typeof setInterval> | null = null

  const changeSlide = () => {
    activeSlide.value = (activeSlide.value + 1) % images.length
  }

  onMounted(() => {
    sliderInterval = setInterval(changeSlide, 3000)
  })

  onUnmounted(() => {
    if (sliderInterval) clearInterval(sliderInterval)
  })
</script>

<style lang="scss" scoped>
  .about-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    color: #000000;
    &__slider {
      width: 100%;
      height: 700px;
      position: relative;
      overflow: hidden;
    }
    &__slide {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    &__slide--active {
      opacity: 1;
    }
    &__content-wrapper {
      display: flex;
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
      justify-content: space-between;
      align-items: flex-start;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }
    &__video-section {
      width: 100%;
      max-width: 600px;
    }
    &__video-player {
      width: 100%;
      border-radius: 8px;
    }
    &__about-content {
      text-align: center;
      max-width: 600px;
    }
    &__title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    &__description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      @media (max-width: 768px) {
        padding: 20px;
      }
    }

    &__social-media-list {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      list-style: none;
      padding: 0;

      a {
        color: vars.$primary-color;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s;

        &:hover {
          color: vars.$secondary-color;
        }
      }

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
    &.dark {
      background-color: #000000;
      color: #ffffff;
    }
  }
</style>
