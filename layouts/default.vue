<template>
  <div>
    <navbar :isAuthenticated="isAuthenticated" 
            :user="user"
            @login="login"
            @logout="logout" />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import { firebase, auth } from '~/plugins/firebase'
import navbar from '~/components/navbar.vue'

export default {
  components: {
    navbar
  },
  computed: {
    isAuthenticated () { return this.$store.getters['auth/isAuthenticated'] },
    user () { return this.$store.getters['auth/user'] }
  },
  methods: {
    login () {
      auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    },
    async logout () {
      await auth.signOut()
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }}
</script>
