<template>
  <div>
    <div class="catalog-page">
      <p class="catalog-page__header">Catalog</p>

      <div>
        <BaseSearch v-model:search-query="searchQuery" />
        <BaseSort v-model:sort-option="sortOption" />

        <!-- Filters -->
        <div class="catalog-page__filters">
          <div class="filter-rating">
            <label>
              Minimum Rating:
              <input
                v-model.number="minimumRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
              />
            </label>
          </div>
          <div class="dropdown">
            <label for="category">Category:</label>
            <select id="category" v-model="selectedCategory">
              <option value="">All Categories</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <div class="dropdown">
            <label for="seller">Seller:</label>
            <select id="seller" v-model="selectedSeller">
              <option value="">All Sellers</option>
              <option v-for="seller in sellers" :key="seller" :value="seller">
                {{ seller }}
              </option>
            </select>
          </div>

          <div class="dropdown">
            <label for="availability">Availability:</label>
            <select id="availability" v-model="selectedAvailability">
              <option value="">All Availability</option>
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div class="dropdown">
            <label for="recommended">Recommended Seller:</label>
            <select id="recommended" v-model="selectedRecommended">
              <option value="">All Sellers</option>
              <option value="true">Recommended</option>
              <option value="false">Not Recommended</option>
            </select>
          </div>
          <div class="filter-range">
            <label for="price-slider">Price Range</label>
            <div class="range-slider">
              <input
                id="min-price"
                v-model.number="priceRange.min"
                type="range"
                :min="minPrice"
                :max="maxPrice"
              />
              <input
                id="max-price"
                v-model.number="priceRange.max"
                type="range"
                :min="minPrice"
                :max="maxPrice"
              />
              <div class="price-values">
                <span>{{ convertToRupiah(priceRange.min) }}</span>
                <span>-</span>
                <span>{{ convertToRupiah(priceRange.max) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BaseEmptyState
        v-if="productStore.products.length === 0 && !productStore.isLoading"
        message="No products available at the moment."
      />
      <BaseEmptyState
        v-else-if="sortedAndFilteredProducts.length === 0 && searchQueryActive"
        :search-query="searchQuery"
      />

      <!-- Product Gallery -->
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

      <!-- Loading and End Indicators -->
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
  import { useProductStore } from '@/stores/productStore'
  import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
  import { convertToRupiah } from '@/utils'
  import debounce from 'lodash/debounce'

  definePageMeta({
    layout: 'main-layout',
  })

  const productStore = useProductStore()

  const itemsPerPage = 8
  const currentPage = ref(1)
  const searchQuery = ref('')
  const searchQueryActive = ref(false)
  const sortOption = ref('lowest')
  const isLoadingMore = ref(false)

  // Filters
  const selectedCategory = ref('')
  const selectedSeller = ref('')
  const priceRange = ref({ min: 0, max: Infinity })
  const selectedAvailability = ref('')
  const minimumRating = ref(0)
  const selectedRecommended = ref('') // Filter for recommended seller

  const maxPrice = computed(() =>
    Math.max(...productStore.products.map((p) => p.price)),
  )
  const minPrice = computed(() =>
    Math.min(...productStore.products.map((p) => p.price)),
  )

  // Extract unique filter values
  const categories = computed(() => [
    ...new Set(productStore.products.map((p) => p.category)),
  ])
  const sellers = computed(() => [
    ...new Set(productStore.products.map((p) => p.seller)),
  ])

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

      font-weight: bold;
      text-transform: uppercase;
    }

    &__filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
      justify-items: center;

      .dropdown,
      .filter-range,
      .filter-rating {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        height: fit-content;
        max-width: 250px;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;

        &:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        label {
          font-size: 1rem;
          font-weight: bold;
          color: #555;
          margin-bottom: 0.5rem;
        }

        select,
        input {
          width: 100%;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          background-color: #f9f9f9;
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #ff9800;
            outline: none;
          }
        }
      }

      .filter-range {
        .range-slider {
          width: 100%;

          input[type='range'] {
            width: 100%;
            height: 6px;
            margin: 0.5rem 0;
            background: #ddd;
            border-radius: 5px;

            &::-webkit-slider-thumb {
              width: 16px;
              height: 16px;
              background-color: #ff9800;
              border-radius: 50%;
              cursor: pointer;
            }

            &::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background-color: #ff9800;
              border-radius: 50%;
              cursor: pointer;
            }
          }

          .price-values {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            color: #555;
          }
        }
      }

      .filter-rating {
        input[type='number'] {
          text-align: center;
        }
      }
    }

    &__gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      /* Force 4 columns for small results */
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
  }

  /* Media Queries */
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
