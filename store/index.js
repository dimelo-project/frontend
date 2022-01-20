export const state = () => ({
  isCurrentPageOnLecture: false,
});

export const mutations = {
  showHeaderSearchInput(state) {
    state.isCurrentPageOnLecture = true;
  },
  hideHeaderSearchInput(state) {
    state.isCurrentPageOnLecture = false;
  },
};
