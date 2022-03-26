export const state = () => ({
  isModalOpened: false,
});

export const mutations = {
  changeIsModalOpened(state, payload) {
    state.isModalOpened = payload;
  },
};
