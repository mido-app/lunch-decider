<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>{{ spotList.name }}</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'

export default {
  async fetch ({ store, params }) {
    await store.dispatch('spot-list/fetchSpotListById', params.spotListId)
  },
  computed: {
    spotList () { return this.$store.getters['spot-list/spotList'] }
  }
}
</script>

