export const state = () => ({
  // mypage layout
  cntCategoryIdx: 0,

  // home layout
  headerBgColor: "rgba(255, 255, 255, 1)",
});

export const mutations = {
  // home layout
  changeHeaerBgColor(state, value) {
    state.headerBgColor = value;
  },
  // mypage layout
  changeCntCategoryIdx(state, value) {
    state.cntCategoryIdx = value;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let auth = null;
    if (req.headers.cookie) {
      try {
        const res = await this.$axios.get("/api/users/me");
        // console.log("@@@@@@@", res.data);
        auth = res.data;
      } catch (err) {
        auth = null;
      }
    }
    this.$auth.setUser(auth);
  },
};
