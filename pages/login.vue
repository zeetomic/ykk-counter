<template>
  <div class="app">
    <div class="container">
      <div>
      <h2>Login To YINGKOK</h2>
      <div>
        <label>Email: </label>
        <input type="email" v-model="email">
      </div>
      <div>
        <label>Password: </label>
        <input type="password" v-model="password">
      </div>
      <v-btn class="btn-login" :loading="loading" @click="handleLogin()">Login</v-btn>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',

      loading:false
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store.dispatch('users/handleLogin', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
  .app {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(120deg, #3498db, #8e44ad);
  }
  label {
    display: block;
    padding: 1rem 0;
  }
  input {
    border: 1px solid grey;
    border-radius: 4px;
    width: 200px;
    height: 40px;
    background: #fafafa;
    padding: 0 6px;
  }
  input:focus {
    outline: none;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50% ;
  }
  .container > div {
    padding: 1rem 3rem;
    text-align: center;
    background: #fafafa;
    border-radius: 4px;
  }
  .btn-login {
    margin: 1.5rem 0;
    width: 100%;
    height: 30px;
    border: 1px solid grey;
    border-radius: 4px;
    background: linear-gradient(120deg, #3498db, #8e44ad);
    color: #fafafa;
  }
</style>