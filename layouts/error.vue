<template>
  <div class="container">
    <h1>エラーです</h1>
    <h2>エラー内容</h2>
    <p>{{ error }}</p>
    <nuxt-link to="/">ホーム</nuxt-link>
  </div>
</template>

<script>
export default {
  props: [ 'error' ],
  layout: 'custom'
}
</script>