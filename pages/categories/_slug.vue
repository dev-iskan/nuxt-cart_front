<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div v-for="product in products" :key="product.slug" class="column is-3">
          <product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/products/Product'
export default {
  components: {
    Product
  },
  data() {
    return {
      products: []
    }
  },
  async asyncData({ params, app }) {
    const response = await app.$axios.get(`products?category=${params.slug}`)

    return {
      products: response.data.data
    }
  }
}
</script>
