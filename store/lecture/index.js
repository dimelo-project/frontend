export const state = () => ({
  // 강의 추가 모달
  newLectureUrl: "",
  isAddLectureModalOpened: false,
  // 리뷰 생성 모달
  isCreateReviewModalOpened: false,
  // 첫 리뷰 작성 의도 모달
  isAskToBeFirstReviewerModalOpened: false,
  selectedCourseIdx: "",
});

export const mutations = {
  // 강의 추가 모달
  changeNewLectureUrl(state, value) {
    state.newLectureUrl = value;
  },
  changeIsAddLectureModalOpened(state, value) {
    state.isAddLectureModalOpened = value;
  },
  // 리뷰 생성 모달
  changeIsCreateReviewModalOpened(state, value) {
    state.isCreateReviewModalOpened = value;
  },
  // 첫 리뷰 작성 의도 모달
  changeIsAskToBeFirstReviewerModalOpened(state, value) {
    state.isAskToBeFirstReviewerModalOpened = value;
  },
  changeSelectedCourseIdx(state, value) {
    state.selectedCourseIdx = value;
  },
};
