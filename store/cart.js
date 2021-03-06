export const state = () => ({
  products: [],
  empty: true,
  subtotal: null,
  total: null,
  changed: false
})

export const getters = {
  products(state) {
    return state.products
  },

  count(state) {
    return state.products.length
  },

  empty(state) {
    return state.empty
  },

  subtotal(state) {
    return state.subtotal
  },

  total(state) {
    return state.total
  },

  changed(state) {
    return state.changed
  }
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_EMPTY(state, empty) {
    state.empty = empty
  },

  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_SUBTOTAL(state, subtotal) {
    state.subtotal = subtotal
  },
  SET_CHANGED(state, changed) {
    state.changed = changed
  }
}

export const actions = {
  async getCart({ commit }) {
    const response = await this.$axios.get('cart')
    commit('SET_PRODUCTS', response.data.data.products)
    commit('SET_EMPTY', response.data.meta.empty)
    commit('SET_SUBTOTAL', response.data.meta.subtotal)
    commit('SET_TOTAL', response.data.meta.total)
    commit('SET_CHANGED', response.data.meta.changed)

    return response
  },

  async destroy({ dispatch }, productId) {
    const response = await this.$axios.delete(`cart/${productId}`)

    dispatch('getCart')
    return response
  },

  async update({ dispatch }, { productId, quantity }) {
    const response = await this.$axios.patch(`cart/${productId}`, {
      quantity
    })

    dispatch('getCart')
    return response
  },

  async store({ dispatch }, products) {
    const response = await this.$axios.post(`cart`, {
      products
    })

    dispatch('getCart')
    return response
  }
}
