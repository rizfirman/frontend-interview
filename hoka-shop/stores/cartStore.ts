import type { Products } from '@/types'
export const useCartStore = defineStore('useCartStore', () => {
  // Initialize the cart with a type
  const cart = ref<Products[]>([])

  // Use cookies for cart persistence
  const cartCookie = useCookie<Products[]>('cart')

  // Load cart from cookies
  const loadCartFromCookie = () => {
    if (cartCookie.value) {
      cart.value = cartCookie.value
    }
  }

  // Add product to cart
  const addToCart = (product: Products) => {
    const existingProduct = cart.value.find((item) => item.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += product.quantity
    } else {
      cart.value.push(product)
    }

    saveCartToCookie()
  }

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.id !== productId)
    saveCartToCookie()
  }

  // Save cart to cookies
  const saveCartToCookie = () => {
    cartCookie.value = cart.value
  }
  const increaseQuantity = (id: number) => {
    const item = cart.value.find((product) => product.id === id)
    if (item) {
      item.quantity += 1
      saveCartToCookie()
    }
  }

  // Decrease quantity of a product
  const decreaseQuantity = (id: number) => {
    const item = cart.value.find((product) => product.id === id)
    if (item && item.quantity > 1) {
      item.quantity -= 1
      saveCartToCookie()
    }
  }

  const resetCart = () => {
    cart.value = []
    saveCartToCookie()
  }

  return {
    cart,
    loadCartFromCookie,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    resetCart,
  }
})
