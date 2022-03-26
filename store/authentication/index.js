export const getters = {
  isUserLoggedIn(state, getters, rootState) {
    if (rootState.auth && rootState.auth.user) {
      return true;
    } else {
      return false;
    }
  },
  isAlreadyProfileSet(state, getters, rootState) {
    if (
      rootState.auth &&
      rootState.auth.user &&
      rootState.auth.user.nickname &&
      rootState.auth.user.career &&
      rootState.auth.user.job
    ) {
      return true;
    } else {
      return false;
    }
  },
};
