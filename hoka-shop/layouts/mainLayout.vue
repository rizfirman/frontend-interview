<template>
  <div>
    <nav class="navbar">
      <!-- Hamburger Menu for Small Screens -->
      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">☰</button>
      <div :class="['nav-links', { 'nav-links--open': isMenuOpen }]">
        <!-- Navigation Links -->
        <NuxtLink
          to="/home"
          class="nav-link"
          :class="{ 'exact-active-link': route.path === '/home' }"
          @click="isMenuOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/catalog"
          class="nav-link"
          :class="{ 'active-link': route.path.startsWith('/catalog') }"
          @click="isMenuOpen = false"
        >
          Catalog
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="nav-link"
          :class="{ 'exact-active-link': route.path === '/about' }"
          @click="isMenuOpen = false"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="nav-link"
          :class="{ 'exact-active-link': route.path === '/favorites' }"
          @click="isMenuOpen = false"
        >
          Favorites
        </NuxtLink>
        <!-- Cart Link -->
        <NuxtLink
          to="/cart"
          class="nav-link cart-link"
          :class="{ 'exact-active-link': route.path === '/cart' }"
          @click="isMenuOpen = false"
        >
          Cart
          <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
        </NuxtLink>
      </div>
      <button class="dark-mode-toggle" @click="darkModeStore.toggleDarkMode">
        <span v-if="darkModeStore.isDarkMode">🌙</span>
        <span v-else>☀️</span>
      </button>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const isMenuOpen = ref(false)

  const cartStore = useCartStore()
  const darkModeStore = useDarkModeStore()
  onMounted(() => {
    darkModeStore.loadDarkModeFromCookie()
  })

  onMounted(() => {
    cartStore.loadCartFromCookie()
  })

  const cartCount = computed(() =>
    cartStore.cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
  )
</script>

<style lang="scss" scoped>
  .navbar {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;

    .nav-links {
      display: flex;
      gap: 2rem;
      flex-grow: 1;
      justify-content: center;

      @media (max-width: 768px) {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1rem;
        gap: 1rem;
        align-items: center;
      }

      &.nav-links--open {
        display: flex;
      }
    }

    .nav-link {
      color: #ffffff;
      text-decoration: none;
      font-size: 1.2rem;
      transition: color 0.3s;

      &:hover {
        color: #ff9800;
      }

      &.active-link,
      &.exact-active-link {
        color: #ff9800;
        font-weight: bold;
      }

      &.cart-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .cart-count {
      background-color: #ff9800;
      color: #ffffff;
      border-radius: 50%;
      padding: 0.2rem 0.6rem;
      font-size: 0.9rem;
      font-weight: bold;
    }

    .hamburger {
      display: none;
      font-size: 1.5rem;
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #ff9800;
      }

      @media (max-width: 768px) {
        display: block;
        position: absolute;
        right: 1rem;
      }
    }
    .dark-mode-toggle {
      background: none;
      border: none;
      color: #ffffff;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #ff9800;
      }
    }
  }
</style>
