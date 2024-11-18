<template>
  <div class="product-detail">
    <div v-if="productStore.isLoading" class="loading">
      <p>Loading product details...</p>
    </div>

    <div v-else-if="product" class="product-detail__content">
      <img
        :src="product.imgUrl"
        :alt="product.name"
        class="product-detail__image"
      />
      <h1 class="product-detail__title">{{ product.name }}</h1>
      <p class="product-detail__price">{{ convertToRupiah(product.price) }}</p>
      <div class="product-detail__info">
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Seller:</strong> {{ product.seller }}</p>
        <p><strong>Availability:</strong> {{ product.availability }}</p>
        <p><strong>Rating:</strong> {{ product.rating }}</p>
        <p>
          <strong>Recommended Seller:</strong>
          {{ product.recommendedSeller ? 'Yes' : 'No' }}
        </p>
      </div>
      <p class="product-detail__description">{{ product.description }}</p>
      <BaseButton class="back-button" label="Back" @click="goBack" />
    </div>

    <div v-else class="error">
      <p>Product not found.</p>
      <BaseButton class="back-button" label="Back" @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'main-layout',
  })

  const route = useRoute()
  const router = useRouter()
  const productStore = useProductStore()
  const productId = Number(route.params.id)

  onMounted(() => {
    productStore.loadProductDetail(productId)
  })

  const product = computed(() => productStore.productDetail)

  const goBack = () => {
    router.back()
  }
</script>

<style lang="scss" scoped>
  .product-detail {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 100vh;

    &__content {
      max-width: 700px;
      margin-top: 2rem;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }

    &__image {
      width: 100%;
      height: auto;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      object-fit: cover;
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #333;
    }

    &__price {
      font-size: 1.8rem;
      color: #ff9800;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    &__info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      font-size: 1rem;
      color: #666;
      margin-bottom: 1.5rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      p {
        margin: 0;
        line-height: 1.5;
      }

      strong {
        color: #333;
      }
    }

    &__description {
      font-size: 1.2rem;
      color: #555;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .loading {
      font-size: 1.5rem;
      color: #555;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #888;
      min-height: 100vh;
      text-align: center;
    }

    .back-button {
      margin-top: 1rem;
      background-color: #ff9800;
      color: #fff;
      padding: 0.5rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e68900;
      }
    }
  }
</style>
