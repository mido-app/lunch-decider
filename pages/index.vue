<template>
  <div>
    <h1>ログイン状態 : {{ isAuthenticated }}</h1>
    <b-button variant="primary" v-if="!isAuthenticated" @click="login">Twitterで登録/ログイン</b-button>
    <b-button v-if="isAuthenticated" @click="logout">ログアウト</b-button>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {  
  data () {
    return {
    }
  },
  computed: {
    isAuthenticated () { return this.$store.getters['auth/isAuthenticated'] }
  },
  async fetch (context) {
    // Twitter認証してリダイレクト後、ユーザデータをstoreに詰め込む
    let result = await context.$auth.getRedirectResult()
    context.store.commit('auth/setUser', result.user)
  },
  methods: {
    login () {
      this.$auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    },
    async logout () {
      await this.$auth.signOut()
      this.$store.commit('auth/setUser', null)
    }
  }
}
</script>
