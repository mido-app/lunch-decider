<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="/">ランチキメる君</b-navbar-brand>
    
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    
    <b-collapse is-nav id="nav_collapse" v-if="user !== null">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <b-img :src="user.iconURL" rounded />
          </template>
          <b-dropdown-item :href="`/user/${user.userId}`">マイページ</b-dropdown-item>
          <b-dropdown-item href="#">行き先リスト一覧</b-dropdown-item>
          <b-dropdown-item href="#">行き先一覧</b-dropdown-item>
          <b-dropdown-item @click="logout">ログアウト</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    user () { return this.$store.getters['auth/user'] || {} }
  },
  methods: {
    async logout () {
      await this.$auth.signOut()
      this.$store.commit('auth/setUser', null)
      this.router.push('/')
    }
  }
}
</script>

