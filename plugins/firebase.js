import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import config from '../firebase.config'

export default (context) => {
  // Firebaseの初期化
  if(firebase.apps.length === 0) {
    firebase.initializeApp(config)
  }

  // Firebase Authenticationの初期化
  let auth = firebase.auth()
  auth.useDeviceLanguage()

  // 全Vueコンポーネントからfirebaseを使えるようにする
  Vue.use({
    install: function (Vue, options) {
      Vue.prototype.$auth = auth
    }
  })

  // コンテキストからfirebaseを使えるようにする
  context.$auth = auth
}
