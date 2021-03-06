import { firebase, firestore } from '~/plugins/firebase'

export const state = () => ({
  /** 行き先リスト一覧 */
  spotLists: [],
  /** 行き先リスト */
  spotList: null
})

export const mutations = {
  /** 行き先リスト一覧を設定します */  
  setSpotLists (state, spotLists) {
    state.spotLists = spotLists
  },
  /** リストの先頭に要素を追加します */
  addSpotListOnTop (state, spotList) {
    state.spotLists.unshift(spotList)
  },
  /** 行き先リストを設定します */
  setSpotList (state, spotList) {
    state.spotList = spotList
  },
  /** 行き先リストに行き先を追加します */
  addSpotToSpotList (state, spot) {
    state.spotList.spots.push(spot)
  }
}

export const actions = {
  /** 行き先リストを登録します */
  async registerSpotList({ commit }, spotListInput) {    
    // 時刻フィールドをセット
    spotListInput.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    spotListInput.updatedAt = firebase.firestore.FieldValue.serverTimestamp()

    // 新しい行き先リストをFirestoreに作成
    await firestore.collection('spot-lists').add(spotListInput)

    // 画面表示用のリストに追加
    commit('addSpotListOnTop', spotListInput)
  },
  /** ユーザが定義した行き先リストを一覧取得します */
  async fetchUserDefinedSpotList({ commit }, userId) {
    // Firestoreからユーザに紐づく行き先リストのみ取得
    let snapshot = await firestore.collection('spot-lists')
      .where('ownerId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get()

    // ストアに格納
    let spotLists = []
    snapshot.forEach(doc => {
      let data = doc.data()
      spotLists.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        spots: data.spots,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      })
    })
    commit('setSpotLists', spotLists)
  },
  /** 行き先リストIDから行き先リストを1件取得します */
  async fetchSpotListById({ commit }, spotListId) {
    let doc = await firestore.collection('spot-lists').doc(spotListId).get()
    if (!doc.exists) commit('setSpotList', null)
    let data = doc.data()
    commit('setSpotList', {
      id: doc.id,
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
      spots: data.spots,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    })
  },
  /** 行き先リストに行き先を登録します */
  async registerSpot ({ commit, state }, spot) {
    commit('addSpotToSpotList', spot)
    await firestore.collection('spot-lists').doc(state.spotList.id).set(state.spotList)
  }
}

export const getters = {
  spotLists (state) { return state.spotLists },
  spotList (state) { return state.spotList }
}
