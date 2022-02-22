export const state = () => ({
  // 강의 추가 모달
  newLectureUrl: "",
  isAddLectureModalOpened: false,
  // 리뷰 생성 모달
  isCreateReviewModalOpened: false,
});

export const mutations = {
  // 강의 추가 모달
  changeNewLectureUrl(state, value) {
    state.newLectureUrl = value;
  },
  changeIsAddLectureModalOpened(state, value) {
    state.isAddLectureModalOpened = value;
  },
  changeIsCreateReviewModalOpened(state, value) {
    state.isCreateReviewModalOpened = value;
  },
};
