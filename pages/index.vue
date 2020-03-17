<template>
  <div class="app">
    <div class="container">
      <div class="search">
        <br>
        <input type="text" placeholder="Search" class="input" v-model="location">
      </div>
      <transition name="slide-fade">
        <div class="result">
          <v-card elevation="6">
          <div class="table" id="TagName"  v-for="(item, index) in handleSearch" :key="item.branches_name" @click="handleSelect(index)">
            <v-row class="d-flex justify-center">
              <img :src="item.logo_uri" alt="logo" class="logo">
            </v-row>
            <div class="body-2"><span class="subtitle-1 my-title">Location: </span> {{ item.branches_name }} </div>
            <div class="body-2"><span class="subtitle-1 my-title">Asset Code: </span> {{ item.asset_code }} </div>
            <div class="body-2"><span class="subtitle-1 my-title">Reward Rate: </span> {{ item.reward_rates }} </div>
            <div class="body-2"><span class="subtitle-1 my-title">Minimum Spend: </span> {{ item.minimum_spend }} </div>
          </div>
          </v-card>
        </div>
      </transition>
    </div>
  <!-- dialog -->
    <v-dialog
      v-model="dialogSelect"
      width="90%"
    >
      <v-sheet>
        <div class="container">
          <span class="font-weight-thin headline">Please Enter The Information:</span>
          <div class="modal-header">
            <!-- <slot name="header">
              <div class="card">
                <p><span>Location: </span> {{ data.branches_name }}</p>
                <p><span>Asset Code: </span>{{ data.asset_code }}</p>
                <p><span>Reward Rate: </span>{{ data.reward_rates }}</p>
                <p><span>Minimum spend: </span>{{ data.minimum_spend }}</p>
              </div>
            </slot> -->
          </div>
          <div style="padding: 3rem 3%">
            <v-form
              ref="form1"
              lazy-validation
            >
              <v-text-field
                label="Receipt NO"
                outlined
                dense
                v-model="receipt_no"
              ></v-text-field>
              <v-text-field
                label="Amount"
                outlined
                dense
                v-model="amount"
              ></v-text-field>
              <v-text-field
                label="Approval Code"
                outlined
                dense
                v-model="approval_code"
              ></v-text-field>
              <v-btn color="#415593" style="width: 100%" :loading="loading" @click="handleNext()">
                <span style="color: #fafafa">Next</span>
              </v-btn>
            </v-form>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  <!-- dialog QR -->
    <v-dialog
      v-model="dialogQR"
    >
      <v-card>
        <div class="container">
          <span class="font-weight-thin headline">QR Code:</span>
          <div class="qr_code">
            <v-row class="d-flex justify-center"> 
              <client-only>
                <vue-qr 
                  class="qr"
                  alt="qr-code"
                  :text="qr"
                >
                </vue-qr>
              </client-only>
            </v-row> 
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { branch } from '~/utils/get-branch.js';

export default {
  middleware: ['auth'],
  asyncData: branch,
  data() {
    return {
      dialogSelect: false,
      dialogQR: false,
      loading: false,
      data: null,

      location: '',
      receipt_no: '1',
      amount: '1',
      approval_code: 'ABCDEF',
      qr: ''
    }
  },
  computed: {
    handleSearch() {
      return this.merchant.filter(post => {
        return post.branches_name.toLowerCase().includes(this.location.toLowerCase())
      })
    }
  },
  methods: {
    handleSelect(index) {
      this.dialogSelect = true;
      this.data = this.merchant[index];
      this.location = this.merchant[index].branches_name
    },
    handleNext() {
      this.loading = true;
      this.$store.dispatch('users/handleSetQR', {
        location: this.location,
        receipt_no: this.receipt_no,
        amount: this.amount,
        approval_code: this.approval_code
      })
      .then(()=> {
        this.qr = this.$store.state.users.qr;
        this.dialogQR = true;
        this.loading = false;
      })
    },
  }
}
</script>

<style scoped>
  input:focus,
  .btn-search:focus {
    outline: none;
    padding: 0 6px;
  }
  input:focus {
    font-size: 16px;
  }
  .logo {
    width: 40px;
    border: 1px solid grey;
    border-radius: 6px;
  }
  .qr_code {
    padding: 2rem 0;
  }
  .qr_code img {
    border: 1px solid grey;
    border-radius: 6px;
  }
  .app {
    padding: 0 24%;
  }
  .container {
    min-height: 93vh;
    /* background: #FF5733; */
    border: 1px;
    border-radius: 4px;
  }
  .search {
    text-align: center;
    padding: 1rem 0;
  }
  .input {
    width: 240px;
    height: 40px;
    border: 1px solid grey;
    border-radius: 4px;
  }
  .btn-search {
    width: 80px;
    height: 30px;
    border: 1px solid grey;
    border-radius: 4px;
    margin: 1rem;
  }
  .btn-search:hover {
    background: #900C3F;
    color: #fafafa
  }
  .table {
    cursor: pointer;
    background: linear-gradient(120deg, #3498db, #8e44ad);
    border: 1px solid grey;
    border-radius: 6px;
    margin: 5px 0;
    color: #fafafa;
    padding: 0;
  }
  .my-title {
    color: #2E4053;
    margin-left: 20px;
  }
  .logo {
    display: flex;
    justify-content: center;
  }
  .result {
    text-align:center;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  /* SmartPhone */
  @media only screen and (max-width: 500px) {
    .app {
      padding: 0 1rem;
    }
  }
  /* Tablet */
  @media only screen and (min-width: 501px) and (max-width: 767px) {
      
  }
  /* Normal */
  @media only screen and (min-width: 768px) and (max-width: 1199px){
      
  }
  /* Large monitor */
  @media only screen and (min-width: 1200px) and (max-width: 1919px) {
        
  }
  /* Landscape */
  @media only screen and (max-height: 500px) {
      
  }
  /* Widescreen */
  @media only screen and (min-width: 1920px) {
      
  }
</style>