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
    let result = await context.$auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return context.$auth.getRedirectResult()
    })
    if (result.user) {
      let userDocRef = await context.$firestore.collection('users').doc(result.user.uid)
      let userDoc = await userDocRef.get()
      let doc = {}
      if (!userDoc.exists) {
        doc = {
          userId: result.user.uid,
          name: result.user.displayName,
          iconURL: result.user.photoURL
        }
        await userDocRef.set(doc)
      } else {
        let data = userDoc.data()
        doc = {
          userId: data['userId'],
          name: data['name'],
          iconURL: data['iconURL']
        }
      }
      context.redirect(`/${doc.userId}`)
    }
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
