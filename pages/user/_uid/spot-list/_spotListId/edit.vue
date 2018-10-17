<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>行き先リスト：{{ spotListId }}</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ params }) {
    return {
      spotListId: params.spotListId
    }
  },
  async fetch () {

  }
}
</script>

