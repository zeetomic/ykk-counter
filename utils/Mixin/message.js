import { mapState } from "vuex";

export const message = {
  computed: {
    ...mapState({
      msg: state => state.users.res_msg.msg,
      type: state => state.users.res_msg.type
    }),
  }
}