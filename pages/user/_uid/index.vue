<template>
  <article>
    <b-container>
      <b-row align-h="center">
        <h2 class="my-5">今日のランチをキメる！</h2>
        <b-form-select class="my-3" v-model="selectedSpotList" :options="spotListOptions" size="lg" />
        <b-button class="my-3" variant="primary" size="lg" @click="decideSpot">今日はここだ！</b-button>
      </b-row>
      <!-- <section>
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
      </section>
      <b-modal v-model="spotListRegisterModalIsVisible"
              @ok="onRegisterSpotList"
              lazy>
        <template>
          <p>新しい行き先リストの名前を入力してください。</p>
          <b-form-group id="a" label="名前"
                        label-for="spotListName"
                        :state="spotListNameIsValid"
                        :invalid-feedback="spotListNameFeedback">
            <b-form-input id="spotListName"
                          type="text"
                          v-model="spotListInput.name" />
          </b-form-group>
          <b-form-group label="説明"
                        label-for="spotListDescription">
            <b-form-input id="spotListDescription"
                          type="text"
                          v-model="spotListInput.description" />
          </b-form-group>
        </template>
        <template slot="modal-footer">
          <b-button variant="primary" @click="onRegisterSpotList" :disabled="!spotListNameIsValid">登録</b-button>
          <b-button @click="closeModal">キャンセル</b-button>
        </template>
      </b-modal> -->
    </b-container>
  </article>
</template>

<script>
import firebase from 'firebase/app'

export default {
  async asyncData (context) {
    let snapshot = await context.$firestore.collection('spot-list').where('ownerId', '==', context.params.uid).get()
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

