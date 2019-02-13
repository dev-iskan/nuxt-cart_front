<template>
  <table class="table is-hover is-fullwidth">
    <tbody>
      <cart-overview-product
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <tr>
        <td />
        <td />
        <td>
          <p class="has-text-weight-bold">
            Subtotal
          </p>
        </td>
        <td>{{ subtotal }}</td>
        <td />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import CartOverviewProduct from './CartOverviewProduct.vue'
export default {
  components: {
    CartOverviewProduct
  },
  computed: {
    ...mapGetters({
      products: 'cart/products',
      subtotal: 'cart/subtotal',
      total: 'cart/total'
    })
  }
}
</script>

<style scoped>

</style>
