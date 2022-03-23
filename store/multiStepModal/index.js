export const state = () => ({
  isModalOpened: false,

  reviewMode: "",

  q1score: null,
  q2score: null,
  q3score: null,
  q4score: null,
  q5pros: "",
  q5cons: "",
  currentStep: 0,
  progressWidth: 33,
});

export const mutations = {
  changeIsModalOpened(state, payload) {
    state.isModalOpened = payload;
  },
  changeReviewMode(state, payload) {
    state.reviewMode = payload;
  },
  initAllData(state) {
    state.reviewMode = "";
    state.q1score = null;
    state.q2score = null;
    state.q3score = null;
    state.q4score = null;
    state.q5pros = "";
    state.q5cons = "";
    state.currentStep = 0;
    state.progressWidth = 33;
  },
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
};
