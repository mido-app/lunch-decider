//TODO firebase初期化のplugin との重複の共通化
import { firestore } from '~/plugins/firebase'

export const state = () => {
}

export const mutations = {
}

export const actions = {
    registerSpot({commit}, spot) {
        return firestore.collection('spots').add(spot)
    }
}

export const getters = {
}
