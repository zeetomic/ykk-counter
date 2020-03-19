<template>
  <div class="app">
    <div class="container">
      <div class="search">
        <input type="text" placeholder="Search" class="input" v-model="location">
      </div>
      <transition name="slide-fade">
        <div class="result">
          <v-card elevation="6">
          <div class="table" id="TagName"  v-for="(item, index) in handleSearch" :key="item.branches_name" @click="handleSelect(index)">
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <img :src="item.logo_uri" alt="logo" class="logo">
              </v-col>
              <v-col>
                <div class="body-2"><span class="subtitle-1 my-title">Location: </span> {{ item.branches_name }} </div>
                <div class="body-2"><span class="subtitle-1 my-title">Asset Code: </span> {{ item.asset_code }} </div>
                <div class="body-2"><span class="subtitle-1 my-title">Reward Rate: </span> {{ item.reward_rates }} </div>
                <div class="body-2"><span class="subtitle-1 my-title">Minimum Spend: </span> {{ item.minimum_spend }} </div>
              </v-col>
            </v-row>
          </div>
          </v-card>
        </div>
      </transition>
    </div>
  <!-- dialog -->
    <v-dialog
      v-model="dialogSelect"
      width="90%"
      persistent
    >
      <v-sheet>
        <div class="dialog_container">
          <span class="font-weight-thin headline pa-4">Please Enter The Information:</span>
          <div class="modal-header">
          </div>
          <div style="padding: 3rem 3rem 0 3rem">
            <v-form
              ref="form"
              lazy-validation
              v-model="valid"
            >
              <v-text-field
                label="Approval Code"
                outlined
                dense
                type="password"
                autocomplete="off"
                id="txtPassword" 
                readonly 
                onfocus="this.removeAttribute('readonly')"
                :rules="approval_codeRule"
                v-model="approval_code"
              ></v-text-field>
              <v-btn color="#415593" style="width: 100%" @click="handleNext()">
                <span style="color: #fafafa">Next</span>
              </v-btn>
            </v-form>
          </div>
        </div>
        <br>
        <v-btn text @click="dialogSelect = false"><span style="color: red">Cancel</span></v-btn>
      </v-sheet>
    </v-dialog>
    <v-dialog
      v-model="dialogNext"
      width="90%"
      persistent
    >
      <v-sheet>
        <div class="dialog_container">
          <span class="font-weight-thin headline pa-4">Please Enter The Information:</span>
          <div class="modal-header">
           
          </div>
          <div style="padding: 3rem 3rem 0 3rem">
            <v-form
              ref="form1"
              lazy-validation
              v-model="valid"
            >
              <v-text-field
                label="Receipt NO"
                outlined
                dense
                type="text"
                :rules="receipt_noRule"
                v-model="receipt_no"
              ></v-text-field>
              <v-text-field
                label="Amount"
                outlined
                dense
                type="number"
                :rules="amountRule"
                v-model="amount"
              ></v-text-field>
              <v-btn class="btn-submit" style="width: 100%" :loading="loading" @click="handleSubmit()">Sumbit</v-btn>
            </v-form>
          </div>
        </div>
        <br>
        <v-btn text @click="dialogNext = false">Back</v-btn>
      </v-sheet>
    </v-dialog>
  <!-- dialog QR -->
    <v-dialog
      v-model="dialogQR"
      persistent
    >
      <v-card>
        <div class="dialog_container">
          <span class="font-weight-thin headline pa-4">QR Code:</span>
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
        <v-btn text @click="dialogQR = false">Finish</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { branch } from '~/utils/get-branch.js';
import { message } from "~/utils/Mixin/message.js";
import { validation } from "~/utils/Mixin/validation.js";
import Cookie from 'js-cookie';

export default {
  middleware: ['auth'],
  mixins: [message, validation],
  asyncData: branch,
  data() {
    return {
      dialogSelect: false,
      dialogQR: false,
      dialogNext: false,
      loading: false,
      data: null,

      location: '',
      receipt_no: '',
      amount: '',
      approval_code: '',
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
      if(Cookie.get('auth') !== '' && Cookie.get('auth')) {
        this.dialogNext = true
      } else {
        this.dialogSelect = true;
      }
      this.data = this.merchant[index];
      this.location = this.merchant[index].branches_name
    },
    handleNext() {
      if(this.$refs.form.validate()) {
        this.dialogNext = true;
      }
    },
    handleSubmit() {
      if(this.$refs.form1.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleSetQR', {
          location: this.location,
          receipt_no: this.receipt_no,
          amount: this.amount,
          approval_code: this.approval_code !== '' ? this.approval_code : Cookie.get('auth')
        })
        .then(async()=> {
          if(this.type !== 'error') {
            if(this.approval_code !== '') {
              await Cookie.set('auth', this.approval_code, { expires: 1 });
            }
            this.qr = await this.$store.state.users.qr;
            this.dialogQR = await true;
            this.dialogSelect = await false;
            this.dialogNext = await false;
          } else {
            await this.$toast.error(this.msg); 
            await Cookie.remove('auth'); 
          }
          this.loading = await false;
          this.receipt_no = '';
          this.amount = '';
        })
      }   
    }
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
  #txtPassword{
    -webkit-text-security:disc;
  }
  .logo {
    max-width: 120px;
    max-height: 120px;
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
  .btn-submit {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    color: #fafafa;
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
  }
  .logo {
    display: flex;
    justify-content: center;
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