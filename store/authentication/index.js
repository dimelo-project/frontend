export const getters = {
  isUserLoggedIn(state, getters, rootState) {
    if (rootState.auth && rootState.auth.user) {
      return true;
    } else {
      return false;
    }
  },
};
