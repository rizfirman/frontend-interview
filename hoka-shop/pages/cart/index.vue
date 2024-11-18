<template>
  <div
    :class="[
      `cart-page`,
      {
        dark: darkModeStore.isDarkMode,
      },
    ]"
  >
    <p class="cart-page__header">Your Cart</p>

    <div class="cart-page__content">
      <div class="cart-page__items">
        <div v-if="cartStore.cart.length === 0" class="empty-message">
          <p>Your cart is empty.</p>
        </div>

        <div v-else>
          <div v-for="item in cartStore.cart" :key="item.id" class="cart-item">
            <img :src="item.imgUrl" alt="product image" />
            <div class="cart-item__details">
              <p>{{ item.name }}</p>
              <p>Price: {{ convertToRupiah(item.price) }}</p>
              <div class="quantity-control">
                <button
                  :disabled="item.quantity <= 1"
                  @click="decreaseQuantity(item.id)"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item.id)">+</button>
              </div>
              <p>Total: {{ convertToRupiah(item.price * item.quantity) }}</p>
            </div>

            <BaseButton label="Remove" @click="removeFromCart(item.id)" />
          </div>
        </div>
      </div>

      <div class="cart-page__checkout">
        <div class="checkout-card">
          <h2>Order Summary</h2>
          <p>Total Items: {{ totalItems }}</p>
          <p>Total Price: {{ convertToRupiah(totalPrice) }}</p>
          <BaseButton label="Checkout" @click="handleCheckout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'main-layout',
  })

  const cartStore = useCartStore()
  const toastStore = useToastStore()
  const darkModeStore = useDarkModeStore()

  onMounted(() => {
    darkModeStore.loadDarkModeFromCookie()
  })

  onMounted(() => {
    cartStore.loadCartFromCookie()
  })

  const removeFromCart = (id: number) => {
    cartStore.removeFromCart(id)
  }

  const increaseQuantity = (id: number) => {
    cartStore.increaseQuantity(id)
  }

  const decreaseQuantity = (id: number) => {
    cartStore.decreaseQuantity(id)
  }

  const totalItems = computed(() =>
    cartStore.cart.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const handleCheckout = () => {
    cartStore.resetCart()
    toastStore.addToast('Checkout successful!', 'success')
  }
</script>

<style lang="scss" scoped>
  .cart-page {
    color: #000000;
    &__header {
      font-size: 2rem;
      text-align: center;
      padding-top: 100px;
      margin-bottom: 2rem;
    }

    &__content {
      display: flex;
      gap: 20px;
      height: 100vh;

      @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
      }
    }

    &__items {
      flex: 2;
      overflow-y: auto;
      padding-right: 10px;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 5px;
      }
    }

    &__checkout {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: sticky;
      top: 20px;
      height: fit-content;
    }

    .cart-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      padding: 10px;
      border: 1px solid black;
      border-radius: 5px;

      img {
        width: 100px;
        height: auto;
        margin-right: 20px;
      }

      &__details {
        flex-grow: 1;

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;

          button {
            width: 30px;
            height: 30px;
            background-color: vars.$secondary-color;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;

            &:disabled {
              background-color: #ccc;
              cursor: not-allowed;
            }
          }

          span {
            display: inline-block;
            width: 30px;
            text-align: center;
            font-weight: bold;
          }
        }
      }

      .remove-button {
        background-color: #ff4d4d;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .checkout-card {
      border: 1px solid black;
      border-radius: 10px;
      padding: 20px;

      text-align: center;

      h2 {
        margin-bottom: 15px;
      }

      p {
        margin: 10px 0;
        font-size: 1rem;
      }

      .checkout-button {
        margin-top: 20px;
        background-color: vars.$secondary-color;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #218838;
        }
      }
    }
    &.dark {
      background-color: black;
      color: vars.$primary-color;
      .cart-item {
        border: 1px solid vars.$primary-color;
      }
      .checkout-card {
        border: 1px solid vars.$primary-color;
      }
    }
  }
</style>
