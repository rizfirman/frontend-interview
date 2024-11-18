<template>
  <div class="filter-area">
    <BaseSearch v-model:search-query="searchQuery" />
    <BaseSort v-model:sort-option="sortOption" />

    <!-- Filters -->
    <div class="filter-area__filters">
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
            :min="props.minPrice"
            :max="props.maxPrice"
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
</template>

<script setup lang="ts">
  const productStore = useProductStore()
  const searchQuery = defineModel('searchQuery', { type: String })
  const sortOption = defineModel('sortOption', { type: String })
  const minimumRating = defineModel('minimumRating', {
    type: Number,
    default: {
      min: 0,
      max: Infinity,
    },
  })
  const selectedCategory = defineModel('selectedCategory', { type: String })
  const selectedSeller = defineModel('selectedSeller', { type: String })
  const selectedAvailability = defineModel('selectedAvailability', {
    type: String,
  })
  const selectedRecommended = defineModel('selectedRecommended', {
    type: String,
  })
  const priceRange = defineModel('priceRange', {
    type: Object,
    default: {
      min: 0,
      max: Infinity,
    },
  })

  const props = defineProps({
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
  })

  const categories = computed(() => [
    ...new Set(productStore.products.map((p) => p.category)),
  ])
  const sellers = computed(() => [
    ...new Set(productStore.products.map((p) => p.seller)),
  ])
</script>

<style lang="scss">
  .filter-area {
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
        background-color: vars.$primary-color;
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
            border-color: vars.$secondary-color;
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
              background-color: vars.$secondary-color;
              border-radius: 50%;
              cursor: pointer;
            }

            &::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background-color: vars.$secondary-color;
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
  }
</style>
