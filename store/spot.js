import { firestore } from '~/plugins/firebase'

export const state = () => {

}

export const mutations = {

}

export const actions = {
  async registerSpot({commit}, spot) {
    return await firestore.collection('spots').add(spot)
  }
}

export const getters = {
  
}
