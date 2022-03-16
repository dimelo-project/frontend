export const state = () => ({
  isLoginModalOpened: false,
});

export const mutations = {
  changeIsLoginModalOpened(state, payload) {
    state.isLoginModalOpened = payload;
  },
};
