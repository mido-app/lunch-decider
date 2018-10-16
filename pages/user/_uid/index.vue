<template>
  <article>
    <b-container>
      <b-row align-h="center">
        <h2 class="my-5">今日のランチをキメる！</h2>
        <b-form-select class="my-3" v-model="selectedSpotList" :options="spotListOptions" size="lg" />
        <b-button class="my-3" variant="primary" size="lg" @click="decideSpot">今日はここだ！</b-button>
      </b-row>
    </b-container>
  </article>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data () {
    return {
      spotLists: [],
      spotListRegisterModalIsVisible: false,
      spotListInput: {
        name: '',
        description: ''
      },
      selectedSpotList: null
    }
  },
  computed: {
    user () { return this.$store.getters['auth/user'] || {} },
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
    async onRegisterSpotList () {
      // バリデーション
      if (!this.spotListNameIsValid) {
        return
      }

      // 新しい行き先リストをFirestoreに作成
      let docRef = await this.$firestore.collection('spot-list').add({
        name: this.spotListInput.name,
        description: this.spotListInput.description,
        ownerId: this.user.userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      let docSnapShot = await docRef.get()

      // 画面表示用のリストに追加
      let data = docSnapShot.data()
      this.spotLists.push({
        id: docSnapShot.id,
        name: data['name'],
        description: data['description'],
        ownerId: data['ownerId'],
        createdAt: data['createdAt'],
        updatedAt: data['updatedAt']
      })

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

