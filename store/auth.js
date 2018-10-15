export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {

}

export const getters = {
  isAuthenticated (state) { return state.user !== null },
  user (state) { return state.user }
}
