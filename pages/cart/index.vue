<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <h1 class="title is-4">
            Your cart
          </h1>

          <article v-if="products.length" class="message">
            <cart-overview />
          </article>
          <p v-else>
            Your cart is empty
          </p>
          <nuxt-link
            v-if="!empty"
            :to="{name: 'checkout'}"
            class="button is-fullwidth is-info is-medium"
          >
            Checkout
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartOverview from '@/components/cart/CartOverview'
import { mapGetters } from 'vuex'
export default {
  components: {
    CartOverview
  },
  computed: {
    ...mapGetters({
      empty: 'cart/empty',
      products: 'cart/products',
      changed: 'cart/changed'
    })
  }
}
</script>

<style scoped>

</style>
