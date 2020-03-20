<template>
  <div class="app">
    <div class="container">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <h2>Login To YINGKOK</h2>
          <br>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="phone"
              v-model="phone"
              type="tel"
              :rules="phoneRule"
              outlined
              dense
              dark
            >
            </v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              :rules="passwordRule"
              outlined
              dense
              dark
            ></v-text-field>
          </v-form>
          <v-btn class="btn-login" :loading="loading" @click="handleLogin()">Login</v-btn>
          <v-row>
            <v-col></v-col>
            <v-col class="d-flex justify-end">
              <v-btn dark text nuxt to="login">Login By Email</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="pa-6">
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { validateLoginPhone } from '~/utils/Mixin/validateLoginPhone.js';
import { message } from '~/utils/Mixin/message';
export default {
  layout: 'login',
  mixins: [validateLoginPhone, message],
  data() {
    return {
      phone: '+855',
      password: '',

      loading:false
    }
  },
  methods: {
    handleLogin() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleLoginbyphone', {
          phone: this.phone,
          password: this.password
        })
        .then(() => {
          this.loading = false;
          if(this.type !== 'error') {
            this.$toast.success("Login Successfully"); 
          } else {
            this.$toast.error(this.msg); 
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    color: #fafafa;
  }
  .app {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(120deg, #3498db, #8e44ad);
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100vh;
  }
  .btn-login {
    width: 100%;
    height: 30px;
    border: .5px solid #fafafa;
    border-radius: 4px;
    background: linear-gradient(120deg, #3498db, #8e44ad);
    color: #fafafa;
  }
</style>