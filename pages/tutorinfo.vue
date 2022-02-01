<template>
  <div class="flex justify-center select-none bg-gray4">
    <div>
      <!-- tutor name & rate -->
      <div
        style="width: 828px"
        class="flex justify-between pt-10 pb-12 mt-10 bg-white px-18 clex test rounded-8px"
      >
        <!-- left side box -->
        <div class="" style="width: 240px">
          <div>
            <span class="txt-sub">강사</span>
          </div>
          <div class="mt-1">
            <span class="txt-heading3">Hwang Tae-hyun</span>
          </div>
          <div class="flex items-center mt-6">
            <StarRate class="mr-1" :score="3.6" />
            <span class="txt-mid-bold"
              >3.6<span class="txt-mini">(4)</span></span
            >
          </div>
        </div>
        <!-- right side box -->
        <div class="flex items-center" style="width: 365px">
          <div>
            <div
              v-for="i in 4"
              :key="i"
              class="flex items-center"
              :class="{ 'mb-2': i !== 4 }"
            >
              <img
                src="~/assets/imgs/icon/ellipse.png"
                style="width: 6px; height: 6px"
                draggable="false"
              />
              <span class="ml-2 txt-sub">강의소개와 일치</span>
              <div
                class="ml-3 rounded-8px bg-yellow1"
                style="width: 170px; height: 6px"
              ></div>
              <SvgReviewStar class="ml-1" />
              <span class="ml-1 txt-sub-bold">5.0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- tutor's lectures -->
      <div class="mt-3 bg-white rounded-8px py-14 px-18 test">
        <span class="txt-mid-bold">
          등록된 강의
          <span class="text-orange2">4개</span></span
        >
        <!-- lecture card data -->
        <div v-for="i in 3" :key="i" class="flex mt-10" style="width: 684px">
          <!-- site logo -->
          <div class="bg-black1 rounded-8px" style="width: 69px; height: 69px">
            <span class="p-3 text-white txt-mini"> 사이트 로고 이미지 </span>
          </div>

          <div class="flex-grow">
            <!-- first line -->
            <div
              class="flex justify-between flex-grow mt-1 ml-6"
              style="height: 25px"
            >
              <span class="txt-base-bold">강의명</span>
              <div class="flex items-center">
                <StarRate :score="3.6" />
                <span class="ml-1 txt-base-bold">3.6</span>
                <span class="txt-mini">(4)</span>
              </div>
            </div>
            <!-- second line -->
            <div
              class="flex justify-between items-center flex-grow ml-6 mt-1.5"
            >
              <div>
                <span class="underline txt-sub-bold text-orange2">김지원</span>
                <span class="ml-4 text-gray1 txt-sub">강의사이트명</span>
                <span class="ml-0.5 text-gray1 txt-sub">00,000원</span>
                <span class="ml-1 underline text-gray1 txt-sub">보러가기</span>
              </div>

              <div class="flex items-center">
                <SvgHeartOutline :color="`#868296`" />
                <ButtonGeneral
                  class="ml-3 text-white bg-orange2 rounded-4px"
                  style="width: 172px; height: 32px"
                >
                  <span>4개의 리뷰 보기</span>
                </ButtonGeneral>
              </div>
            </div>
          </div>
        </div>

        <!-- see more button -->
        <ButtonGeneral
          class="w-full mt-8 rounded-4px bg-gray3 text-gray1"
          style="width: 684px; height: 56px"
        >
          <span>더보기</span>
        </ButtonGeneral>
      </div>

      <!-- tutor's reviews -->
      <div
        class="pb-8 mt-3 bg-white rounded-8px pt-14 px-18 test mb-14"
        style="width: 828px"
      >
        <!-- number of reviews & filtering buttons -->
        <div class="flex items-center justify-between">
          <span class="txt-mid-bold">
            받은 리뷰
            <span class="text-orange2">6개</span></span
          >
          <div class="txt-sub">
            <span class="cursor-pointer txt-sub-bold text-orange2">추천순</span>
            <span class="ml-2 cursor-pointer text-gray1">추천순</span>
            <span class="ml-2 cursor-pointer text-gray1">추천순</span>
            <span class="ml-2 cursor-pointer text-gray1">추천순</span>
          </div>
        </div>

        <!-- divider -->
        <div class="mt-4 border-t border-gray2"></div>

        <div v-for="i in 4" :key="i">
          <!-- review card data -->
          <div class="flex justify-between mt-8">
            <!-- left side -->
            <div class="flex-shrink-0">
              <div class="flex">
                <div
                  class="rounded-full bg-gray1"
                  style="width: 48px; height: 48px"
                ></div>

                <div class="ml-2.5 flex flex-col">
                  <span class="txt-sub-bold">닉네임</span>
                  <span class="mt-1 txt-sub">UX 디자이너</span>
                  <span class="txt-sub">2~3년차</span>
                </div>
              </div>

              <div class="flex mt-5">
                <StarRate :size="20" :score="5.0" />
                <span class="ml-1 txt-base-bold">5.0</span>
              </div>
            </div>
            <!-- right side -->
            <div style="width: 480px">
              <!-- title -->
              <span class="underline txt-sub text-gray1">
                파이썬입문과 크롤링기초 부트캠프 (2021 업데이트) [쉽게! 견고한
                자료까지!]
              </span>

              <!-- pros -->
              <div class="mt-4">
                <span class="txt-sub-bold text-orange2">장점</span>
                <p class="txt-sub">
                  실무와 연관이 깊고, 실용적이고 실무에서 쓰일법한 지식들을
                  골라서 강의해주신게 인상적이었습니다. 또한 강의를 함께 듣는
                  수강생끼리 협업이나 소통을 하도록 분위기를 만들어주셔서 공부할
                  때 도움을 많이 받았습니다
                </p>
              </div>

              <!-- cons -->
              <div class="mt-4">
                <span class="txt-sub-bold text-orange2">단점</span>
                <p class="txt-sub">
                  강의 전체 횟수와 시간이 조금 루즈했던 것 같습니다. 어느정도
                  공부를 해본 사람보다는 아예 입문자가 수강하면 괜찮을 것
                  같습니다. 그리고 자료를 공유해주셨는데 그 자료가 좀 오래된
                  버전이었다는 사실을 뒤늦게 알았습니다. 아마 강사님도 모르셨던
                  것 같았습니다.
                </p>
              </div>

              <!-- update, delete button & date & recommend button -->
              <div class="flex items-center justify-end mt-4">
                <span class="underline cursor-pointer txt-sub text-gray1">
                  수정
                </span>
                <span class="ml-4 underline cursor-pointer txt-sub text-gray1">
                  삭제
                </span>
                <span class="ml-8 txt-mini text-gray1">2022-01-26</span>
                <ButtonGeneral
                  :width="139"
                  :height="32"
                  class="ml-3 border border-gray2 rounded-4px"
                >
                  <span class="txt-mini">이 리뷰가 도움됨</span>
                  <span class="ml-1 txt-mini-bold">5</span>
                  <img
                    src="~/assets/imgs/icon/check.png"
                    alt="추천"
                    style="width: 14px; height: 10px"
                    draggable="false"
                    class="ml-2"
                  />
                </ButtonGeneral>
              </div>
            </div>
          </div>

          <!-- divider -->
          <div class="mt-4 border-t border-gray2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border-2 border-orange2; */
}
</style>
