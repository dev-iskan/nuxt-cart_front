<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-half">
          <img src="http://via.placeholder.com/620x620" alt="Product name">
        </div>
        <div class="column is-half">
          <section class="section">
            <h1 class="title is-4">
              {{ product.name }}
            </h1>
            <p v-if="product.description">
              {{ product.description }}
            </p>

            <hr>

            <span v-if="!product.in_stock" class="tag is-rounded is-medium is-dark">
              Out of stock
            </span>

            <span class="tag is-rounded is-medium">
              {{ product.price }}
            </span>
          </section>

          <section class="section">
            <form action="" @submit.prevent="add">
              <product-variation
                v-for="(variation, type) in product.variations"
                :key="type"
                v-model="form.variation"
                :type="type"
                :variations="variation"
              />
              <div v-if="form.variation" class="field has-addons">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select id="" name="">
                      <option v-for="x in parseInt(form.variation.stock_count)" :key="x" :value="x">
                        {{ x }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button type="submit" class="button is-info">
                    Add to cart
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductVariation from '@/components/products/ProductVariation'
import { mapActions } from 'vuex'
export default {
  components: {
    ProductVariation
  },
  data() {
    return {
      product: null,
      form: {
        // in vue if we assign init value for <select> as '' (empty string) then by default it will choose option with empty value
        variation: '',
        quantity: 1
      }
    }
  },
  watch: {
    'form.variation'() {
      this.form.quantity = 1
    }
  },
  async asyncData({ params, app }) {
    const response = await app.$axios.get(`products/${params.slug}`)

    return {
      product: response.data.data
    }
  },
  methods: {
    ...mapActions({
      store: 'cart/store'
    }),

    add() {
      this.store([{
        id: this.form.variation.id,
        quantity: this.form.quantity
      }])

      this.form = {
        variation: '',
        quantity: 1
      }

      this.$router.replace({ name: 'cart' })
    }
  }
}
</script>

<style scoped>

</style>
