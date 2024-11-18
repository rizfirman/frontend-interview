export function useProductApi() {
  const fetchProductList = async () => {
    try {
      const data = await $fetch('/api/products')
      return data
    } catch (error) {
      console.error('Error fetching product list:', error)
      throw error
    }
  }

  const fetchProductDetail = async (id: number) => {
    try {
      const data = await $fetch(`/api/products/${id}`)
      return data
    } catch (error) {
      console.error(`Error fetching product detail for ID ${id}:`, error)
      throw error
    }
  }

  return { fetchProductList, fetchProductDetail }
}
