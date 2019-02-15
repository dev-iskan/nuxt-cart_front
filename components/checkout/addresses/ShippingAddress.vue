<template>
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">
        Ship to
      </h1>
      <template v-if="selecting">
        <shipping-address-selector
          :addresses="addresses"
          :selected-address="selectedAddress"
          @click="addressSelected"
        />
      </template>
      <template v-else-if="creating">
        <shipping-address-creator
          @created="created"
          @cancel="creating = false"
        />
      </template>
      <template v-else>
        <template v-if="selectedAddress">
          <p>
            {{ selectedAddress.name }} <br>
            {{ selectedAddress.address_1 }} <br>
            {{ selectedAddress.city }} <br>
            {{ selectedAddress.postal_code }} <br>
            {{ selectedAddress.country.name }} <br>
          </p>
          <br>
        </template>

        <div class="field is-grouped">
          <p class="control">
            <a href="#" class="button is-info" @click.prevent="selecting = true">
              Change shipping address
            </a>
          </p>
          <p class="control">
            <a href="#" class="button is-info" @click.prevent="creating = true">
              Add an address
            </a>
          </p>
        </div>
      </template>
    </div>
  </article>
</template>

<script>
import ShippingAddressSelector from '@/components/checkout/addresses/ShippingAddressSelector'
import ShippingAddressCreator from '@/components/checkout/addresses/ShippingAddressCreator'
export default {
  components: {
    ShippingAddressSelector,
    ShippingAddressCreator
  },
  props: {
    addresses: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      creating: false,
      selecting: false,
      localAddresses: this.addresses,
      selectedAddress: null
    }
  },
  computed: {
    defaultAddress() {
      return this.localAddresses.find(address => address.default === true)
    }
  },

  created() {
    if (this.addresses.length) {
      this.switchAddress(this.defaultAddress)
    }
  },

  methods: {
    switchAddress(address) {
      this.selectedAddress = address
    },

    addressSelected(address) {
      this.switchAddress(address)
      this.selecting = false
    },

    created(address) {
      this.localAddresses.push(address)
      this.creating = false
      this.switchAddress(address)
    }
  }
}
</script>

<style scoped>

</style>
