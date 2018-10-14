<template>
  <div>
    <h1>{{ userId }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: null
    }
  },
  async asyncData (context) {
    return {
      userId: context.params.uid
    }    
  }
}
</script>

