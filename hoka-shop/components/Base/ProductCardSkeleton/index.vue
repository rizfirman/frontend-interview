<template>
  <div class="skeleton skeleton-img"></div>
  <div class="skeleton skeleton-text skeleton-label"></div>
  <div class="skeleton skeleton-text skeleton-price"></div>
  <div class="skeleton skeleton-button"></div>
</template>

<style lang="scss" scoped>
  .skeleton {
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .skeleton::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(224, 224, 224, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(224, 224, 224, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(150%);
    }
  }

  .skeleton-img {
    width: 200px;
    height: 200px;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  .skeleton-text {
    height: 20px;
    margin-bottom: 0.5rem;
  }

  .skeleton-label {
    width: 70%;
  }

  .skeleton-price {
    width: 50%;
  }

  .skeleton-button {
    width: 100px;
    height: 36px;
    margin-top: 1rem;
    border-radius: 8px;
  }
</style>
