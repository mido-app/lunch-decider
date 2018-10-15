<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">ランチキメる君</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button variant="primary" @click="login">Twitterで登録/ログイン</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  layout: 'no-nav',
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
      context.redirect(`/user/${doc.userId}`)
    }
  },
  methods: {
    login () {
      this.$auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    }
  }
}
</script>
