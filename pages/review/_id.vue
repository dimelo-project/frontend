<template>
  <div>
    <!-- top -- lecture info -->
    <div class="flex justify-center">
      <div class="flex items-center test" style="width: 990px; height: 149px">
        <!-- left content -->
        <div
          class="text-white bg-black rounded-8px"
          style="width: 69px; height: 69px"
        >
          img
        </div>
        <!-- right content -->
        <div class="ml-8">
          <div>
            <span class="txt-mid-bold">
              파이썬입문과 크롤링기초 부트캠프 (2021 업데이트) [쉽게! 견고한
              자료까지!]
            </span>
          </div>
          <div class="flex items-center mt-2.5">
            <!-- star rate -->
            <div class="flex items-center">
              <starRate :score="`3`" />
              <span class="ml-1 txt-base-bold">3.5</span>
              <span class="txt-mini">(4)</span>
            </div>
            <!-- tutor name -->
            <span class="ml-6 txt-sub-bold">강사</span>
            <span class="ml-1 underline txt-sub-bold">김댕댕</span>
            <!-- lecture site name -->
            <span class="ml-5 txt-sub text-gray1">강의사이트명</span>
            <!-- lecture price -->
            <span class="ml-1 txt-usb text-gray1">00,000원</span>
          </div>
        </div>
      </div>
    </div>
    <!-- divider -->
    <div class="border border-gray2"></div>
    <!-- wrap -->
    <div class="flex justify-center">
      <div style="width: 990px" class="flex justify-between test">
        <div style="width: 684px" class="flex-shrink-0">
          <!-- review analysis -->
          <div class="mt-12">
            <span class="txt-base-bold">
              총 <span class="text-orange2">4개</span>의 리뷰가 있습니다.
            </span>

            <div class="border mt-7 border-yellow1 rounded-4px py-7">
              <div class="flex">
                <div class="text-center mx-9">
                  <span class="txt-sub-bold">항목별 평점</span>
                </div>

                <div class="flex-shrink-0">
                  <div v-for="i in 4" :key="i" class="flex items-center mb-3">
                    <div>
                      <img
                        src="~/assets/imgs/icon/ellipse.png"
                        style="width: 6px; height: 6px"
                        alt=""
                      />
                    </div>
                    <div style="width: 96px" class="ml-2 txt-sub">
                      강의소개와 일치
                    </div>
                    <div>
                      <img
                        class="ml-3 border border-black"
                        src="~/assets/imgs/icon/progressbar.png"
                        style="width: 172px"
                        alt=""
                      />
                    </div>
                    <SvgReviewStar class="ml-1" />
                    <span class="ml-1 txt-sub-bold">3.4</span>
                  </div>
                </div>

                <div
                  class="flex flex-col items-center justify-center flex-grow"
                >
                  <SvgReviewStar />
                  <div class="text-gray1">평균</div>
                  <div class="txt-heading3">3.5</div>
                </div>
              </div>
            </div>
          </div>

          <!-- review contents -->
          <div>
            <!-- review filtering butotn -->
            <div class="flex justify-between mt-13">
              <span class="txt-mid-bold"
                >상세 리뷰<span class="ml-1 txt-mini">(4)</span></span
              >
              <div>
                <span v-for="i in 4" :key="i" class="ml-2 text-gray1"
                  >추천순</span
                >
              </div>
            </div>
            <!-- review card data list -->
            <div v-for="i in 10" :key="i">
              <!-- divider -->
              <div class="mt-4 border border-gray2"></div>
              <!-- card data -->
              <div class="flex mt-4">
                <!-- user profile & user review rate -->
                <div class="flex flex-col flex-shrink-0">
                  <!-- user profile -->
                  <div class="flex">
                    <div
                      class="rounded-full bg-gray1"
                      style="width: 48px; height: 48px"
                    ></div>
                    <div class="ml-2.5">
                      <div>
                        <span class="txt-sub-bold">닉네임</span>
                      </div>
                      <div class="mt-1">
                        <span class="txt-sub">안드로이드 개발자</span>
                      </div>
                      <div>
                        <span class="txt-sub">8년차</span>
                      </div>
                    </div>
                  </div>
                  <!-- user review rate -->
                  <div class="flex mt-6">
                    <StarRate :size="20" :score="`5`" />
                    <span class="ml-1 txt-base-bold">5.0</span>
                  </div>
                </div>
                <!-- pros and cons -->
                <div class="ml-10">
                  <div>
                    <span class="text-orange2 txt-sub-bold">장점</span>
                    <p class="txt-sub mt-0.5">
                      실무와 연관이 깊고, 실용적이고 실무에서 쓰일법한 지식들을
                      골라서 강의해주신게 인상적이었습니다. 또한 강의를 함께
                      듣는 수강생끼리 협업이나 소통을 하도록 분위기를
                      만들어주셔서 공부할 때 도움을 많이 받았습니다
                    </p>
                  </div>
                  <div class="mt-4">
                    <span class="text-orange2 txt-sub-bold">단점</span>
                    <p class="txt-sub mt-0.5">
                      강의 전체 횟수와 시간이 조금 루즈했던 것 같습니다.
                      어느정도 공부를 해본 사람보다는 아예 입문자가 수강하면
                      괜찮을 것 같습니다. 그리고 자료를 공유해주셨는데 그 자료가
                      좀 오래된 버전이었다는 사실을 뒤늦게 알았습니다. 아마
                      강사님도 모르셨던 것 같았습니다.
                    </p>
                  </div>
                </div>
              </div>
              <!-- udpate & remove button & date & recommend button -->
              <div class="flex items-center justify-end mt-5">
                <span class="underline text-gray1 txt-sub">수정</span>
                <span class="ml-4 underline text-gray1 txt-sub">삭제</span>
                <span class="ml-8 text-gray1 txt-sub">2022-01-26</span>
                <button
                  class="flex items-center px-3 ml-3 border border-gray2 rounded-4px py-7px txt-sub"
                >
                  이 리뷰가 도움됨 <span class="ml-1 txt-sub-bold">5</span>
                  <img
                    src="~/assets/imgs/icon/check.png"
                    class="ml-2"
                    alt="확인"
                  />
                </button>
              </div>
            </div>

            <!-- see more button -->
            <ButtonGeneral
              :large="true"
              class="w-full py-4 mt-4 border-none text-gray1 rounded-8px bg-gray3 mb-14"
            >
              <span>더보기</span>
            </ButtonGeneral>
          </div>
        </div>

        <!-- right side panel -->
        <div style="width: 200px" class="flex-shrink-0">
          <div class="sticky top-30">
            <!-- lecture info & link -->
            <div
              class="px-3 py-5 mt-12 border border-gray2 bg-gray4 rounded-8px"
              style="width: 200px"
            >
              <div class="flex items-start">
                <img
                  src="~/assets/imgs/icon/info.png"
                  alt="강의"
                  style="width: 24px; height: 24px"
                />
                <div class="flex flex-col ml-2">
                  <span>패스트캠퍼스</span>
                  <span>40,000원</span>
                </div>
              </div>
              <ButtonGeneral
                class="py-2.5 px-9 txt-base-bold bg-black1 text-white mt-5 rounded-8px"
              >
                <span>강의 보러가기</span>
              </ButtonGeneral>
            </div>
            <!-- create review button -->
            <ButtonGeneral
              :color="`orange1`"
              class="text-white px-9 py-2.5 mt-7 txt-base-bold rounded-4px bg-orange2"
              @click="isModalOpened = !isModalOpened"
            >
              <span>리뷰 작성</span>
            </ButtonGeneral>
            <!-- bookmark lecture button -->
            <ButtonGeneral
              :width="200"
              class="py-2.5 mt-2 text-gray1 rounded-4px border border-gray2"
              @click="hearted = !hearted"
            >
              <span v-if="!hearted">관심강의 추가</span>
              <span v-else>관심강의 해제</span>
              <SvgHeartOutline
                class="ml-1"
                :fill="hearted ? '#FF6B6B' : `white`"
                :color="hearted ? 'none' : '#868E96'"
              />
            </ButtonGeneral>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Review Modal -->
    <MultiSteps
      :isModalOpened="isModalOpened"
      @modalClose="isModalOpened = false"
    />
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      hearted: true,
      isModalOpened: false,
    };
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border border-orange2; */
}
</style>
