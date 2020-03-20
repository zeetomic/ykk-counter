import Cookie from 'js-cookie';

export const state = () => ({
  token: '',
  res_msg: {
    msg: '',
    type: ''
  },
  qr: ''
})

export const mutations = {
  set_token(state, token) {
    state.token = token;
  },
  set_msg(state, msg) {
    state.res_msg.msg = msg;
  },
  set_type(state, type) {
    state.res_msg.type = type;
  },
  set_qr(state, qr) {
    state.qr = qr;
  }
}

export const actions = {
  async handleLogin({commit}, data) {
    await this.$axios.post(process.env.baseUrl + '/loginbyemail', {
      email: data.email,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.token) {
        const token = await res.data.token;
        await commit('set_token', token);
        await commit('set_type', 'success');
        Cookie.set('jwt', token);
        this.$router.push('/');
      } else if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
  async handleSetQR({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post(process.env.baseUrl + '/set-qr', {
      location: data.location,
      approval_code: data.approval_code,
      receipt_no: data.receipt_no,
      amount: data.amount
    }, config)
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_qr', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
  handleLogout({commit}) {
    Cookie.remove('jwt');
    commit('set_token', '');
    this.$router.push('/login');
  }
}