import cookieparser from "cookieparser";

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if(!req.headers.cookie) return;

    const parsed = await cookieparser.parse(req.headers.cookie);
    const token = await parsed.jwt;

    if(!token) return;
    await commit('users/set_token', token);
  }
}