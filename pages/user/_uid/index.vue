<template>
  <article>
    <b-container>
      <!-- <b-row align-h="center">
        <h2 class="my-5">今日のランチをキメる！</h2>
        <b-form-select class="my-3" v-model="selectedSpotList" :options="spotListOptions" size="lg" />
        <b-button class="my-3" variant="primary" size="lg" @click="decideSpot">今日はここだ！</b-button>
      </b-row> -->
      <b-row>
        <b-col>
          <h2>行き先リスト設定</h2>
        </b-col>
      </b-row>      
      <b-row>
        <b-col class="text-right">
          <b-button @click="onClickAddSpotListButton">行き先リストを追加</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="my-2" v-for="spotList in spotLists" :key="spotList.id" :cols="12">
          <b-card>
            <b-container fluid>
              <b-row align-v="center">
                <b-col>
                  <h4>{{ spotList.name }}</h4>
                  <p class="card-text">{{ spotList.description }}</p>
                </b-col>
                <b-col cols="2">
                  <b-button variant="primary">Go!</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <spot-list-upsert-modal description="行き先リストの名前・説明を入れてね"
                            okBtnName="登録"
                            :visible.sync="spotListRegisterModalIsVisible"
                            @ok="onRegisterSpotList"
                            @cancel="closeModal" />
  </article>
</template>

<script>
import { firebase } from '~/plugins/firebase'
import spotListUpsertModal from '~/components/spotListUpsertModal.vue'

export default {
  components: {
    spotListUpsertModal
  },
  async fetch ({ store, params }) {
    await store.dispatch('spot-list/fetchUserDefinedSpotList', params.uid)
  },
  data () {
    return {
      spotListRegisterModalIsVisible: false,
      selectedSpotList: null
    }
  },
  computed: {
    user () { return this.$store.getters['auth/user'] },
    spotLists () { return this.$store.getters['spot-list/spotLists'] },
    spotListNameIsValid () {
      if (this.spotListInput.name) return true
      else return false
    },
    spotListNameFeedback () {
      if (this.spotListInput.name) return '名前は必須です'
      else return null
    },
    spotListOptions () {
      let options = this.spotLists.map(spotList => { 
        return { value: spotList.id, text: spotList.name }
      })
      return [
        { value: null, text: '行き先リスト選択してください' },
        ...options
      ]
    }
  },
  methods: {
    onClickAddSpotListButton () {
      this.spotListRegisterModalIsVisible = true
    },
    async onRegisterSpotList (spotListInput) {
      // 登録処理
      console.log(spotListInput)
      spotListInput.ownerId = this.user.userId
      await this.$store.dispatch('spot-list/registerSpotList', spotListInput)

      // モーダルを閉じる
      this.closeModal()
    },
    closeModal () {
      this.spotListRegisterModalIsVisible = false
    },
    decideSpot () {
      alert('Sorry, this feature is under development')
    }
  }
}
</script>

