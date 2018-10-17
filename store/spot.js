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
