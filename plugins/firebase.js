import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../firebase.config'

export default (context) => {
  // Firebaseの初期化
  if(firebase.apps.length === 0) {
    firebase.initializeApp(config)
  }

  // Firebase Authenticationの初期化
  let auth = firebase.auth()
  auth.useDeviceLanguage()

  // Firestoreの初期化
  let firestore = firebase.firestore()
  firestore.settings({ timestampsInSnapshots: true })

  // 全Vueコンポーネントからfirebaseを使えるようにする
  Vue.use({
    install: function (Vue, options) {
      Vue.prototype.$auth = auth
      Vue.prototype.$firestore = firestore
    }
  })

  // コンテキストからfirebaseを使えるようにする
  context.$auth = auth
  context.$firestore = firestore
}
