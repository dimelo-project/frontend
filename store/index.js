export const state = () => ({
  isCurrentPageOnLecture: false,
  q1score: null,
  q2score: null,
  q3score: null,
  q4score: null,
  q5pros: "",
  q5cons: "",
  currentStep: 0,
  progressWidth: 33,

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
  // multip-step
  next(state) {
    if (state.currentStep === 3) {
      state.progressWidth = state.progressWidth + 33;
    } else {
      state.progressWidth = state.progressWidth + 66;
    }
    state.currentStep += 1;
  },
  previous(state) {
    if (state.currentStep === 4) {
      state.progressWidth = state.progressWidth - 33;
    } else {
      state.progressWidth = state.progressWidth - 66;
    }
    state.currentStep -= 1;
  },
  changeQ1score(state, value) {
    state.q1score = value;
  },
  changeQ2score(state, value) {
    state.q2score = value;
  },
  changeQ3score(state, value) {
    state.q3score = value;
  },
  changeQ4score(state, value) {
    state.q4score = value;
  },
  changeQ5pros(state, value) {
    state.q5pros = value;
  },
  changeQ5cons(state, value) {
    state.q5cons = value;
  },
  changeCurrentStep(state, value) {
    state.currentStep = value;
  },
  changeProgressWidth(state, value) {
    state.progressWidth = value;
  },
  showHeaderSearchInput(state) {
    state.isCurrentPageOnLecture = true;
  },
  hideHeaderSearchInput(state) {
    state.isCurrentPageOnLecture = false;
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
    this.$store.commit("auth/SET", { key: "loggedIn", value: true });
  },
};
