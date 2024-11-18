<template>
  <div>
    <div
      :class="[
        'catalog-page',
        {
          dark: darkModeStore.isDarkMode,
        },
      ]"
    >
      <p class="catalog-page__header">Catalog</p>

      <CatalogFilter
        v-model:search-query="searchQuery"
        v-model:sort-option="sortOption"
        v-model:selected-category="selectedCategory"
        v-model:selected-seller="selectedSeller"
        v-model:selected-availability="selectedAvailability"
        v-model:selected-recommended="selectedRecommended"
        v-model:minimum-rating="minimumRating"
        v-model:price-range="priceRange"
        :min-price="minPrice"
        :max-price="maxPrice"
      />

      <BaseEmptyState
        v-if="productStore.products.length === 0 && !productStore.isLoading"
        message="No products available at the moment."
      />
      <BaseEmptyState
        v-else-if="sortedAndFilteredProducts.length === 0 && searchQueryActive"
        :search-query="searchQuery"
      />

      <div v-else class="catalog-page__gallery">
        <div
          v-for="(product, index) in visibleProducts"
          :key="`${product.id}-${index}`"
        >
          <BaseProductCard
            :products="product"
            :is-loading="productStore.isLoading"
          />
        </div>
      </div>

      <div v-if="isLoadingMore" class="catalog-page__loading">
        <p>Loading more products...</p>
      </div>

      <div v-else-if="!hasMore" class="catalog-page__end">
        <p>No more products to display.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import debounce from 'lodash/debounce'

  definePageMeta({
    layout: 'main-layout',
  })

  const productStore = useProductStore()
  const darkModeStore = useDarkModeStore()

  onMounted(() => {
    darkModeStore.loadDarkModeFromCookie()
  })

  const itemsPerPage = 8
  const currentPage = ref(1)
  const searchQuery = ref('')
  const searchQueryActive = ref(false)
  const sortOption = ref('lowest')
  const isLoadingMore = ref(false)

  const selectedCategory = ref('')
  const selectedSeller = ref('')
  const priceRange = ref({ min: 0, max: Infinity })
  const selectedAvailability = ref('')
  const minimumRating = ref(0)
  const selectedRecommended = ref('')

  const maxPrice = computed(() =>
    Math.max(...productStore.products.map((p) => p.price)),
  )
  const minPrice = computed(() =>
    Math.min(...productStore.products.map((p) => p.price)),
  )

  // Debounced filters and sorting
  const debouncedUpdateFilteredProducts = debounce(() => {
    searchQueryActive.value = !!searchQuery.value
    currentPage.value = 1 // Reset pagination on filter changes
  }, 300)

  watch(
    [
      searchQuery,
      sortOption,
      selectedCategory,
      selectedSeller,
      selectedAvailability,
      selectedRecommended,
      minimumRating,
      () => priceRange.value.min,
      () => priceRange.value.max,
    ],
    debouncedUpdateFilteredProducts,
    { immediate: true },
  )

  onMounted(() => {
    productStore.loadProductList().then(() => {
      // Set default price range based on the data
      priceRange.value.min = minPrice.value
      priceRange.value.max = maxPrice.value
    })
  })

  const filteredProducts = computed(() => {
    return productStore.products.filter((product) => {
      // Check category match
      const matchesCategory =
        !selectedCategory.value || product.category === selectedCategory.value

      // Check seller match
      const matchesSeller =
        !selectedSeller.value || product.seller === selectedSeller.value

      // Check price range match
      const matchesPrice =
        product.price >= priceRange.value.min &&
        product.price <= priceRange.value.max

      // Check availability match
      const matchesAvailability =
        !selectedAvailability.value ||
        product.availability === selectedAvailability.value

      // Check minimum rating match
      const matchesRating = product.rating >= minimumRating.value

      // Check recommended seller match
      const matchesRecommended =
        !selectedRecommended.value ||
        (selectedRecommended.value === 'true'
          ? product.recommendedSeller
          : !product.recommendedSeller)

      // Check search query match
      const matchesSearch =
        !searchQuery.value ||
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      // Return true only if all conditions match
      return (
        matchesCategory &&
        matchesSeller &&
        matchesPrice &&
        matchesAvailability &&
        matchesRating &&
        matchesRecommended &&
        matchesSearch
      )
    })
  })

  const sortedAndFilteredProducts = computed(() => {
    const products = [...filteredProducts.value]
    if (sortOption.value === 'lowest') {
      products.sort((a, b) => a.price - b.price)
    } else if (sortOption.value === 'highest') {
      products.sort((a, b) => b.price - a.price)
    }
    return products
  })

  const visibleProducts = computed(() => {
    const end = currentPage.value * itemsPerPage
    return sortedAndFilteredProducts.value.slice(0, end)
  })

  const hasMore = computed(() => {
    return visibleProducts.value.length < sortedAndFilteredProducts.value.length
  })

  const loadMore = () => {
    if (isLoadingMore.value || !hasMore.value) return

    isLoadingMore.value = true

    setTimeout(() => {
      currentPage.value += 1
      isLoadingMore.value = false
    }, 1000) // Simulated loading delay
  }

  const onScroll = () => {
    const scrollTop = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMore()
    }
  }

  onMounted(() => {
    productStore.loadProductList()
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style lang="scss" scoped>
  .catalog-page {
    margin: 2rem auto;
    max-width: 1200px;
    padding: 0 1rem;
    &__header {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 2rem;
      margin-top: 100px;
      color: black;
      font-weight: bold;
    }

    &__gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      &::after {
        content: '';
        visibility: hidden;
        height: 0;
        grid-column: span 4;
      }
    }

    &__loading {
      text-align: center;
      font-size: 1.2rem;
      color: #666;
      margin-top: 1rem;
    }

    &__end {
      text-align: center;
      font-size: 1.2rem;
      color: #333;
      margin-top: 1rem;
      font-weight: bold;
    }
    &.dark {
      .catalog-page {
        &__header {
          color: white;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .catalog-page {
      &__filters {
        grid-template-columns: 1fr;
      }

      &__gallery {
        grid-template-columns: repeat(3, 1fr);

        &::after {
          grid-column: span 3;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .catalog-page {
      &__header {
        font-size: 2rem;
      }

      &__gallery {
        grid-template-columns: 1fr;

        &::after {
          grid-column: span 1;
        }
      }

      &__filters {
        .dropdown,
        .filter-range,
        .filter-rating {
          max-width: 100%;
        }
      }
    }
  }
</style>
