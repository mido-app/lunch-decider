//TODO firebase初期化のplugin との重複の共通化
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../firebase.config'


if(firebase.apps.length === 0) {
    firebase.initializeApp(config)
}
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export const state = () => {
}

export const mutations = {
}

export const actions = {
    addSpot({commit}, spot) {
        return firestore.collection("spots").add(spot)
    }
}

export const getters = {
}
  