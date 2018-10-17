import { auth, firestore }  from '~/plugins/firebase'

  /** ユーザの認証状態を確認し、認証済であればユーザIDをストアに格納します */
const checkAuth = function () {
  return new Promise(resolve => {
    auth.onAuthStateChanged(auth => {
      resolve(auth)
    })
  })
}

export const state = () => ({
  /** ユーザ情報 */
  user: {
    userId: null,
    name: '',
    iconURL: ''
  }
})

export const mutations = {
  /** ユーザ情報設定 */
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  /** ユーザドキュメントを取得してストアに格納します */
  async loginCheck ({ commit, state }) {
    let auth = await checkAuth()
    if (!auth) return
    let userDocRef = await firestore.collection('users').doc(auth.uid)
    let doc
    if (userDocRef.exists) {
      let userDoc = await userDocRef.get()
      let data = userDoc.data()
      doc = {
        userId: data['userId'],
        name: data['name'],
        iconURL: data['iconURL']
      }
    } else {
      doc = {
        userId: auth.uid,
        name: auth.displayName,
        iconURL: auth.photoURL
      }
      await userDocRef.set(doc)
    }
    commit('setUser', doc)
  },
  async logout ({ commit }) {
    commit('setUser', {
      userId: null,
      name: '',
      iconURL: ''
    })
  }
}

export const getters = {
  isAuthenticated (state) { return state.user.userId !== null },
  user (state) { return state.user }
}
