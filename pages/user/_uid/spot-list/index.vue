<template>
  <b-container>
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

    <spot-list-upsert-modal description="行き先リストの名前・説明を入れてね"
                            okBtnName="登録"
                            :visible.sync="spotListRegisterModalIsVisible"
                            @ok="onRegisterSpotList"
                            @cancel="closeModal" />
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
import spotListUpsertModal from '~/components/spotListUpsertModal.vue'

export default {
  components: {
    spotListUpsertModal
  },
  async asyncData (context) {
    let snapshot = await context.$firestore.collection('spot-list').where('ownerId', '==', context.params.uid).orderBy('createdAt', 'desc').get()
    let spotLists = []
    snapshot.forEach(doc => {
      let data = doc.data()
      spotLists.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      })
    })
    return {
      spotLists: spotLists
    }
  },
  data () {
    return {
      spotLists: [],
      spotListRegisterModalIsVisible: false
    }
  },
  computed: {
    user () { return this.$store.getters['auth/user'] || {} },
  },
  methods: {
    onClickAddSpotListButton () {
      this.spotListRegisterModalIsVisible = true
    },
    async onRegisterSpotList (spot) {
      // 新しい行き先リストをFirestoreに作成
      let docRef = await this.$firestore.collection('spot-list').add({
        name: spot.name,
        description: spot.description,
        ownerId: this.user.userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })

      // 画面表示用のリストに追加
      let currentDate = new Date()
      this.spotLists.unshift({
        id: docRef.id,
        name: spot.name,
        description: spot.description,
        ownerId: this.user.userId,
        createdAt: currentDate,
        updatedAt: currentDate
      })

      // モーダルを閉じる
      this.closeModal()
    },
    closeModal () {
      this.spotListRegisterModalIsVisible = false
    }
  }
}
</script>

