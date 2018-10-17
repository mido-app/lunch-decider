import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../firebase.config'

// Initialize Firebase
if(firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

// Firebase Authentication Settings
const auth = firebase.auth()
auth.useDeviceLanguage()
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// Firestore Settings
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export {
  firebase,
  auth,
  firestore
}
