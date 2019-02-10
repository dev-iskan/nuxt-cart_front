<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="{name: 'index'}" class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28">
        </nuxt-link>
        <div class="navbar-burger burger" data-target="nav">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <template v-for="category in categories">
          <template v-if="category.children.length">
            <div :key="category.slug" class="navbar-item is-hoverable has-dropdown">
              <nuxt-link
                :to="{name: 'categories-slug', params: {slug:category.slug}}"
                class="navbar-link"
              >
                {{ category.name }}
              </nuxt-link>

              <div class="navbar-dropdown">
                <nuxt-link
                  v-for="child in category.children"
                  :key="child.slug"
                  :to="{name: 'categories-slug', params: {slug:child.slug}}"
                  class="navbar-item"
                >
                  {{ child.name }}
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-else>
            <nuxt-link :key="category.slug" :to="{name: 'categories-slug', params: {slug:category.slug}}" class="navbar-item">
              {{ category.name }}
            </nuxt-link>
          </template>
        </template>
      </div>

      <div id="nav" class="navbar-menu">
        <div class="navbar-end">
          <template v-if="!$auth.loggedIn">
            <nuxt-link :to="{name: 'auth-signin'}" class="navbar-item">
              Sign in
            </nuxt-link>
          </template>
          <template v-else>
            <a href="" class="navbar-item">
              {{ $auth.user.name }}
            </a>
            <a href="" class="navbar-item">
              Orders
            </a>
            <a href="" class="navbar-item">
              Cart (0)
            </a>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      categories: 'categories'
    })
  }
}
</script>

<style scoped>

</style>
