<template>
  <v-app class="app">
    <v-app-bar
      dense
      color="#0B9C9C"
    >
      <div style="padding-top: 5px"></div>
      <router-link to="/" exact>
        <img class="logoY" src="~/assets/yingkok.png" alt="logo">
      </router-link>
      <span class="font-weight-thin white--text">YINGKOK</span>
      <v-spacer></v-spacer>
      <v-btn text @click="logout" class="white--text">Sign Out</v-btn>
    </v-app-bar>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('users/handleLogout')
    }
  }
}
</script>

<style>
.app {
  font-family: 'Titillium Web'!important;
}
.logoY {
  width: 46px;
  margin-top: 10px;
}
</style>