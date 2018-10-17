<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="/">ランチキメる君</b-navbar-brand>
    
    <template v-if="isAuthenticated">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <b-img :src="user.iconURL" rounded />
          </template>
          <b-dropdown-item :href="`/user/${user.userId}`">マイページ</b-dropdown-item>
          <!-- <b-dropdown-item href="#">行き先リスト一覧</b-dropdown-item>
          <b-dropdown-item href="#">行き先一覧</b-dropdown-item> -->
          <b-dropdown-item @click="logout">ログアウト</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </template>    
    <template v-else>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button variant="primary" @click="login">Twitterで登録/ログイン</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: [
    'isAuthenticated',
    'user'
  ],
  methods: {
    login () {
      this.$emit('login')
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

