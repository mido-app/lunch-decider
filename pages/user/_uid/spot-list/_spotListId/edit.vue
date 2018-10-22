<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>{{ spotList.name }}</h2>        
      </b-col>
      <b-col>
        <p>{{ spotList.description }}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right">
        <b-button @click="onClickAddSpotButton">行き先を追加</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-2" v-for="(spot, index) in spotList.spots" :key="index" :cols="12">
        <b-card>
          <b-container fluid>
            <b-row>
              <b-col>
                <h4>{{ spot.name }}</h4>
                <p class="card-text">{{ spot.description }}</p>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>

    <spot-upsert-modal description="行き先リストの名前・説明を入れてね"
                       okBtnName="登録"
                       :visible.sync="spotRegisterModalIsVisible"
                       @ok="onRegisterSpot"
                       @cancel="closeModal" />
  </b-container>
</template>

<script>
import spotUpsertModal from '~/components/spotUpsertModal.vue'

export default {
  components: {
    spotUpsertModal
  },
  async fetch ({ store, params, redirect }) {
    await store.dispatch('spot-list/fetchSpotListById', params.spotListId)
    let spotList = store.getters['spot-list/spotList']
    if (!spotList || spotList.ownerId !== params.uid) redirect(`/user/${params.uid}`)
  },
  data () {
    return {
      spot: {

      },
      spotRegisterModalIsVisible: false
    }
  },
  computed: {
    spotList () { return this.$store.getters['spot-list/spotList'] }
  },
  methods: {
    async onClickAddSpotButton () {
      this.spotRegisterModalIsVisible = true
    },
    async onRegisterSpot (spot) {
      await this.$store.dispatch('spot-list/registerSpot', spot)
      this.closeModal()
    },
    closeModal () {
      this.spotRegisterModalIsVisible = false
    },
  }
}
</script>

