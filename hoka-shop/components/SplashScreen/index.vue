<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.75s,
      visibility 0.75s;
  }

  .loader::after {
    content: '';
    width: 75px;
    height: 75px;
    border: 15px solid #dddddd;
    border-top-color: vars.$secondary-color;
    border-radius: 50%;
    animation: loading 0.75s ease infinite;
  }
</style>
