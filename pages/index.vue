<template>
  <div>
    TOP
  </div>
</template>

<script>
export default {
  async fetch ({ store }) {
    await store.dispatch('auth/loginCheck')
  }
}
</script>
