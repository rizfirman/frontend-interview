<template>
  <div class="catalog">
    <p class="catalog__header">Catalog</p>
    <div class="catalog__gallery">
      <div
        v-for="(product, index) in productStore.products.slice(0, 4)"
        :key="index"
      >
        <BaseProductCard
          :products="product"
          :is-loading="productStore.isLoading"
        />
      </div>
    </div>
    <div class="catalog__footer">
      <BaseButton label="See More" @click="goToTheCatalogPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const productStore = useProductStore()

  const router = useRouter()

  const goToTheCatalogPage = () => {
    router.push(`/catalog`)
  }

  onMounted(() => {
    productStore.loadProductList()
  })
</script>

<style lang="scss" scoped>
  .catalog {
    &__header {
      font-size: 2rem;
      text-align: center;
      margin-top: 5rem;
    }
    &__gallery {
      max-width: 1200px;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 3rem;
      padding: 20px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
    &__card {
      border: white 1px solid;
      border-radius: 1rem;
      padding: 20px;
      img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        display: block;
      }
      &--label {
        font-size: 1.2rem;
        margin-top: 1rem;
      }
      &--price {
        font-size: 1.2rem;
        margin-top: 0.5rem;
      }
      &--footer {
        margin-top: 1rem;
        display: flex;
        justify-content: end;
      }
    }
    &__footer {
      max-width: 1200px;
      margin: auto;
      margin-top: 2rem;
      text-align: center;
    }
  }
</style>
