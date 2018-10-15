<template>
  <div>
    <navbar />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import navbar from '~/components/navbar.vue'

export default {
  components: {
    navbar
  }
}
</script>
