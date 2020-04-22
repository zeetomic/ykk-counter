<template>
  <v-app class="app" id="application">
    <v-app-bar
      dense
    >
      <div style="padding-top: 5px"></div>
      <router-link to="/" exact>
        <img class="logoY" src="~/assets/yingkok.png" alt="logo">
      </router-link>
      <span class="font-weight-thin white--text">YINKOK</span>
      <v-spacer></v-spacer>
      <v-btn text @click="handleClick">
        <v-icon>mdi-brightness-6</v-icon>
        <span id="mode">nightmode</span>
      </v-btn>
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
    },
    async handleClick() {
      if(!this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = await true;
        document.querySelector('input').style.border = await "1px solid #fafafa";
        document.getElementById('mode').innerHTML = await "daymode";
      }else if(this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = await false;
        document.querySelector('input').style.border = await "1px solid grey";
        document.getElementById('mode').innerHTML = await "nightmode";
      }
    }
  }
}
</script>

<style>
.logoY {
  width: 46px;
  margin-top: 10px;
}
.v-app-bar {
  background: linear-gradient(120deg, #3498db, #8e44ad)!important;
}
</style>