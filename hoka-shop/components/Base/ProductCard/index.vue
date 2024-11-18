<template>
  <div
    :class="[
      'product__card',
      {
        dark: darkModeStore.isDarkMode,
      },
    ]"
  >
    <template v-if="props.isLoading">
      <BaseProductCardSkeleton />
    </template>

    <template v-else>
      <div
        v-if="props.products.recommendedSeller"
        class="recommended-badge"
        title="Recommended Seller"
      >
        ★
        <span class="tooltip">Recommended Seller</span>
      </div>

      <img :src="props.products.imgUrl" alt="grid" />
      <p class="product__card--label">{{ props.products.name }}</p>
      <p class="product__card--price">
        {{ convertToRupiah(props.products.price) }}
      </p>
      <p class="product__card--category">
        Category: {{ props.products.category }}
      </p>
      <p class="product__card--seller">Seller: {{ props.products.seller }}</p>
      <p class="product__card--availability">
        Availability:
        <span
          :class="
            props.products.availability === 'Available'
              ? 'available'
              : 'out-of-stock'
          "
        >
          {{ props.products.availability }}
        </span>
      </p>
      <p class="product__card--rating">
        Rating: {{ props.products.rating }} / 5
      </p>

      <div class="product__card--footer">
        <div class="product__card--actions">
          <div>
            <BaseButton
              label="See Details"
              @click="goToTheDetailPage(props.products.id)"
            />

            <BaseButton
              label="Add to Cart"
              style="margin-top: 10px"
              :disabled="props.products.availability === 'Out of Stock'"
              @click="addToCart"
            />
          </div>

          <div class="quantity-control">
            <button @click="decrementQuantity">-</button>
            <span>{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
        </div>

        <button class="favorite-button" @click="toggleFavorite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :class="{ 'favorite-icon': true, active: isFavorite }"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { convertToRupiah } from '@/utils'
  import { useRouter } from 'vue-router'
  import type { Products } from '@/types'

  const props = defineProps<{
    products: Products
    isLoading: boolean
  }>()

  const favoriteStore = useFavoriteStore()
  const cartStore = useCartStore()
  const toastStore = useToastStore()
  const router = useRouter()
  const darkModeStore = useDarkModeStore()

  onMounted(() => {
    darkModeStore.loadDarkModeFromCookie()
  })

  const quantity = ref(1)

  const isFavorite = computed(() => favoriteStore.isFavorite(props.products.id))

  const toggleFavorite = () => {
    if (isFavorite.value) {
      favoriteStore.removeFromFavorites(props.products.id)
    } else {
      favoriteStore.addToFavorites(props.products)
    }
  }

  const incrementQuantity = () => {
    quantity.value++
  }

  const decrementQuantity = () => {
    if (quantity.value > 1) quantity.value--
  }

  const addToCart = () => {
    toastStore.addToast('Added to cart!', 'success')
    cartStore.addToCart({ ...props.products, quantity: quantity.value })
  }

  const goToTheDetailPage = (id: number) => {
    router.push(`/catalog/${id}`)
  }
</script>

<style lang="scss" scoped>
  .product__card {
    position: relative; /* For positioning the badge */
    border: black 1px solid;
    border-radius: 1rem;
    padding: 20px;
    transition: transform 0.2s ease;
    color: black;

    &:hover {
      animation: wiggle 0.3s ease;
      transform: scale(1.05);
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 1rem;
      display: block;
    }

    &--label {
      font-size: 1.2rem;
      margin-top: 1rem;
      color: black;
    }

    &--price {
      font-size: 1.2rem;
      margin-top: 0.5rem;
      color: black;
    }

    &--category,
    &--seller,
    &--availability,
    &--rating {
      font-size: 1rem;
      margin-top: 0.3rem;
      color: black;
    }

    &--availability {
      .available {
        color: green;
      }

      .out-of-stock {
        color: red;
      }
    }

    &--footer {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &--actions {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .quantity-control {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;

        button {
          background-color: vars.$secondary-color;
          color: #fff;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        span {
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }

    .favorite-button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      outline: none;
    }

    .favorite-icon {
      width: 24px;
      height: 24px;
      fill: #aaa;
      transition:
        transform 0.2s ease,
        fill 0.3s ease;

      &.active {
        fill: vars.$secondary-color;
        transform: scale(1.2);
        animation: heartbeat 0.6s ease;
      }
    }

    .recommended-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: gold;
      color: white;
      padding: 5px 10px;
      border-radius: 50%;
      font-size: 1rem;
      font-weight: bold;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;

      .tooltip {
        position: absolute;
        top: 110%;
        right: 0;
        background-color: vars.$secondary-color;
        padding: 5px;
        font-size: 0.8rem;
        border-radius: 3px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s;
        visibility: hidden;
      }

      &:hover .tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    &.dark {
      border: white 1px solid;
      color: white;
      .product__card {
        &--label {
          color: white;
        }
        &--price {
          color: white;
        }
        &--category,
        &--seller,
        &--availability,
        &--rating {
          color: white;
        }
      }
    }
  }
</style>
