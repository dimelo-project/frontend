<template>
  <div
    style="width: 786px"
    class="relative border-b border-gray2"
    @mouseover="mouseoverHandle"
    @mouseleave="mouseleaveHandle"
  >
    <!-- contents -->
    <div style="width: 786px; height: 347px" class="relative overflow-hidden">
      <transition-group tag="div" :name="transitionName">
        <div
          v-if="show"
          :key="current"
          class="absolute top-0 left-0 w-full h-full p-2"
        >
          <!-- lecture info -->
          <div
            v-for="(lecture, lectureIdx) in slides[current].tutorLectureData"
            :key="lectureIdx"
            class="flex"
          >
            <!-- site logo -->
            <div class="bg-gray1 rounded-8px" style="width: 69px; height: 69px">
              <img
                class="max-w-none"
                :src="$getLectureBrandLogo(lecture['course_platform'])"
                alt="강의사이트"
              />
            </div>

            <div class="flex-grow">
              <!-- first line -->
              <div class="flex justify-between flex-grow mt-1 ml-6">
                <span class="txt-base-bold" style="width: 375px">{{
                  lecture["course_title"]
                }}</span>
                <div class="flex items-center">
                  <StarRate :score="lecture['course_avg']" />
                  <span class="ml-1 txt-base-bold"
                    >{{ lecture["course_avg"] }}
                  </span>
                  <span class="txt-mini">({{ lecture["num_review"] }})</span>
                </div>
              </div>
              <!-- second line -->
              <div
                class="flex justify-between items-center flex-grow ml-6 mt-1.5"
              >
                <div>
                  <!-- <span class="underline txt-sub-bold text-orange2">김지원</span> -->
                  <span class="text-gray1 txt-sub">
                    {{ lecture["course_platform"] }}
                  </span>
                  <span class="ml-0.5 text-gray1 txt-sub">{{
                    `${Number(lecture["course_price"]).toLocaleString()}원`
                  }}</span>
                  <span class="ml-1 underline text-gray1 txt-sub">
                    <a :href="lecture['course_siteUrl']" target="_blank">
                      보러가기
                    </a>
                  </span>
                </div>

                <div class="flex items-center">
                  <NuxtLink :to="`/review/${lecture['course_id']}`">
                    <ButtonGeneral
                      class="ml-3 text-white bg-orange1 rounded-4px hover:bg-orange2"
                      style="width: 172px; height: 32px"
                    >
                      <span>{{ lecture["num_review"] }}개의 리뷰 보기</span>
                    </ButtonGeneral>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- divider -->
          <div class="mt-6 border-t" style="border-color: #e9ecef"></div>

          <!-- review info -->
          <div
            class="flex mt-8"
            v-for="review in slides[current].reviewData"
            :key="review['user_nickname']"
          >
            <!-- user profile & user review rate -->
            <div class="flex flex-col flex-shrink-0">
              <!-- user profile -->
              <div class="flex">
                <profileImageAvatar
                  :url="review['user_imageUrl']"
                  :imgSize="48"
                />
                <div class="ml-2.5">
                  <div>
                    <span class="txt-sub-bold">{{
                      review["user_nickname"]
                    }}</span>
                  </div>
                  <div class="mt-1">
                    <span class="txt-sub">{{ review["user_job"] }}</span>
                  </div>
                  <div>
                    <span class="txt-sub">{{ review["user_career"] }}</span>
                  </div>
                </div>
              </div>
              <!-- user review rate -->
              <div class="flex mt-6">
                <StarRate :size="20" :score="review['review_avg']" />
                <span class="ml-1 txt-base-bold">{{
                  review["review_avg"]
                }}</span>
              </div>
            </div>
            <!-- pros and cons -->
            <div class="flex flex-col ml-10">
              <div class="flex-grow">
                <span class="text-orange2 txt-sub-bold">장점</span>
                <p class="txt-sub mt-0.5">
                  {{ review["review_pros"] }}
                </p>
              </div>
              <div class="flex-grow mt-4">
                <span class="text-orange2 txt-sub-bold">단점</span>
                <p class="txt-sub mt-0.5">
                  {{ review["review_cons"] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- buttons -->
    <div
      class="absolute z-20"
      style="left: -25px; top: calc(50% - 25px)"
      @click="slide(-1)"
    >
      <div
        class="flex items-center justify-center bg-white border rounded-full cursor-pointer bg-opacity-60 border-gray2"
        style="width: 50px; height: 50px"
      >
        <img src="~/assets/imgs/icon/leftarrow.png" alt="왼쪽" />
      </div>
    </div>
    <div
      class="absolute z-20"
      style="right: -25px; top: calc(50% - 25px)"
      @click="slide(1)"
    >
      <div
        class="flex items-center justify-center bg-white border rounded-full cursor-pointer bg-opacity-60 border-gray2"
        style="width: 50px; height: 50px"
      >
        <img src="~/assets/imgs/icon/rightarrow.png" alt="왼쪽" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: null,
      current: 0,
      direction: 1,
      transitionName: "fade",
      show: false,
      slides: [
        {
          tutorLectureData: [
            {
              course_id: 212,
              course_title: "SVG 마스터",
              course_platform: "인프런",
              course_price: 27500,
              instructor_id: 18,
              instructor_name: "1분코딩",
              course_siteUrl: "https://inf.run/KdBw",
              course_createdAt: "2022-03-22",
              num_review: "1",
              course_avg: "5.0",
            },
          ],
          reviewData: [
            {
              review_id: 17,
              review_avg: "5.0",
              review_pros:
                "1분코딩님 강의는 모두 좋습니다. 인터랙티브 ui 강의자료가 원체 없어서 정말 소중한 강의입니다. 그리고 너무 재밋어요! 항상 나오는 캐릭터들도 귀엽고 코딩할맛납니다. 만드는 주제들도 너무 신선해요 ㅎㅎ",
              review_cons: "없어용",
              user_id: 7,
              user_nickname: "3dman",
              user_job: "웹 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-23",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1648031317320-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png",
              num_help: "1",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 60,
              course_title:
                "작정하고 장고! Django로 Pinterest 따라만들기 : 바닥부터 배포까지",
              course_platform: "인프런",
              course_price: 77000,
              instructor_id: 31,
              instructor_name: "Hyong Sok Park",
              course_siteUrl: "https://inf.run/KGoE",
              course_createdAt: "2022-02-03",
              num_review: "3",
              course_avg: "4.9",
            },
          ],
          reviewData: [
            {
              review_id: 10,
              review_avg: "5.0",
              review_pros:
                "설명을 참 쉽게해주셔서 초심자도 이해하기 편함.\n" +
                "배포까지 하는 간단한 사이클 경험도 할수있음.\n" +
                "강사님 키보드 소리가 좋음. + 기타도 잘치심",
              review_cons:
                "단점은 딱히 없음.\n이강의듣고 react까지 학습하면 토이프로젝트 충분히 가능.",
              user_id: 11,
              user_nickname: "장고에몽",
              user_job: "백엔드 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-23",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1648011928008-Doraemon.png",
              num_help: "1",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 43,
              course_title: "CSS Flex와 Grid 제대로 익히기",
              course_platform: "인프런",
              course_price: 49500,
              instructor_id: 18,
              instructor_name: "1분코딩",
              course_siteUrl: "https://inf.run/9WQq",
              course_createdAt: "2022-02-03",
              num_review: "2",
              course_avg: "4.9",
            },
          ],
          reviewData: [
            {
              review_id: 28,
              review_avg: "4.8",
              review_pros:
                "flex와 grid에 대해서 항상 헷갈리고 고통받고 계시다면 이강의를 통해 고민끝!!",
              review_cons: "조금 비싸요  ㅜ",
              user_id: 5,
              user_nickname: "코딩하는고양이",
              user_job: "개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-24",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1648146358798-cat.jpg",
              num_help: "0",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 219,
              course_title:
                "Node.js, Express, MongoDB & More: The Complete Bootcamp 2022",
              course_platform: "유데미",
              course_price: 179000,
              instructor_id: 106,
              instructor_name: "Jonas Schmedtmann",
              course_siteUrl: "https://www.udemy.com/share/101Wv63@BDLgeWNfw",
              course_createdAt: "2022-03-22",
              num_review: "1",
              course_avg: "4.5",
            },
          ],
          reviewData: [
            {
              review_id: 4,
              review_avg: "4.5",
              review_pros:
                "Jonas의 강의는 다 좋다..역시 Jonas답게 node.js강의도 마음에 들었다. Jonas는 역시 개념을 잘 가르친다. node.js동작 원리 부분도 정말 이해가 잘됐다. ppt도 역시 최고! 여러가지 기능을 만들어 볼 수 있어서 좋았다. 특히 mongoose를 배우는데 도움이 많이 됐다.",
              review_cons:
                "강의가 너무 길어서 끝부분은 듣지 못했는데.. 서버사이드 랜더링으로 pug로 가르치시는데.. 너무 길어서 듣지 못했다 ㅠㅠ(pug만 무려 5시간..)",
              user_id: 3,
              user_nickname: "Avery",
              user_job: "백엔드 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-22",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1647666791368-liveforever.jpeg",
              num_help: "0",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 179,
              course_title: "UXUI 프로페셔널",
              course_platform: "리메인",
              course_price: 920000,
              instructor_id: 98,
              instructor_name: "정다운/실비아",
              course_siteUrl: "https://remain.co.kr/shop/item_class.php?it_i",
              course_createdAt: "2022-03-14",
              num_review: "1",
              course_avg: "3.5",
              course_liked: "true",
            },
          ],
          reviewData: [
            {
              review_id: 40,
              review_avg: "3.5",
              review_pros:
                "최근은 아니고 좀 전에 수강했던 강의인데 강사님, 커리큘럼이 예전과 같아서 리뷰 남겨봅니다. 일단 리메인 건물이 깔끔하고 좋았어요. 강사님 이력도 좋아보였고 다른 학생들과 서로 설문하고 교류할 기회가 생겼던 점이 참 좋았습니다!",
              review_cons:
                "강사님의 적극성이 좀 부족하다는 느낌..? 중간에 프로젝트 방향을 잃으시는 분들을 꽤 많이 봤는데 별다른 조언 없이 그냥 알아서 해야 하는 느낌이었어요. 현장강의고 강의료도 꽤 비쌌던지라 그런 피드백이 어느정도는 있어야 할 것 같다고 생각했었는데 강의 취지는 달랐던 것 같습니다!",
              user_id: 17,
              user_nickname: "김사막",
              user_job: "UI/UX 디자이너",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-26",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1648299524761-818kxf41u9L.jpg",
              num_help: "1",
            },
          ],
        },

        {
          tutorLectureData: [
            {
              course_id: 222,
              course_title:
                "The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert",
              course_platform: "유데미",
              course_price: 95000,
              instructor_id: 105,
              instructor_name: "Colt Steele",
              course_siteUrl: "https://www.udemy.com/share/101Wiw/",
              course_createdAt: "2022-03-22",
              num_review: "1",
              course_avg: "4.8",
            },
          ],
          reviewData: [
            {
              review_id: 13,
              review_avg: "4.8",
              review_pros:
                "처음 SQL을 배울 때 좋았다. 퀴즈형식으로 먼저 혼자 해보고 답을 가르쳐 주는 것이 좋았다. 초보자도 쉽게 따라갈 수 있다.",
              review_cons:
                "사전식? 강의라서 조금 루즈할 수 있다. 그리고 기초적인 부분만 가르치는 것 같아서 조금 아쉽다. subquery같은 것도 가르쳐주면 좋겠다..",
              user_id: 1,
              user_nickname: "펭수",
              user_job: "백엔드 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-23",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1647598687250-%E1%84%91%E1%85%A6%E1%86%BC%E1%84%89%E1%85%AE.png",
              num_help: "0",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 33,
              course_title: "Vue.js + TypeScript 완벽 가이드",
              course_platform: "인프런",
              course_price: 88000,
              instructor_id: 6,
              instructor_name: "장기효(캡틴판교)",
              course_siteUrl: "https://inf.run/1wXy",
              course_createdAt: "2022-02-03",
              num_review: "1",
              course_avg: "4.5",
            },
          ],
          reviewData: [
            {
              review_id: 6,
              review_avg: "4.5",
              review_pros:
                "1. 목소리도 정말 좋으시고 설명을 굉장히 잘하십니다. \n\n2. 강의 교안이 웹상에 잘 정리되어있어서 보기 좋습니다.",
              review_cons:
                "배우는 내용의 양에 비해 강의가 너무 길게 구성되있다는 느낌이 듭니다. 난이도가 그렇게 높지도 않은데 강의가 너무 잘게 쪼개져 있어 루즈한 경향이 있습니다. 덤으로 조금 더 다른 내용까지 제공되면 좋겠다는 생각이 드네요. ",
              user_id: 10,
              user_nickname: "choi2mj",
              user_job: "프론트엔드  개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-03-23",
              user_imageUrl:
                "https://dimelo-project.s3.ap-northeast-2.amazonaws.com/1648010959056-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg",
              num_help: "0",
            },
          ],
        },
      ],
      tutorLectureData: [
        {
          course_id: 8,
          course_title: "실전! 스프링 데이터 JPA",
          course_platform: "클래스101",
          course_price: 88000,
          instructor_id: 2,
          instructor_name: "김영한",
          course_siteUrl: "https://www.inflearn.com/course/%EC%8A%A4%ED%",
          course_createdAt: "2022-02-02",
          num_review: "2",
          course_avg: "3.0",
          course_liked: "true",
        },
      ],
      reviewData: [
        {
          review_id: 11,
          review_avg: "4.3",
          review_pros: "WOWOWOW...O.O",
          review_cons: "a little outdated",
          user_id: 35,
          user_nickname: "펭수연",
          user_job: "백엔드 개발자",
          user_career: "2~3년차",
          review_createdAt: "2022-02-07",
          user_imageUrl:
            "https://dimelo-project.s3.amazonaws.com/1644251181632-inu.png",
          num_help: "0",
          review_helped: "false",
        },
      ],
    };
  },
  methods: {
    slide(dir) {
      this.direction = dir;
      dir === 1
        ? (this.transitionName = "slide-next")
        : (this.transitionName = "slide-prev");
      const len = this.slides.length;
      this.current = (this.current + (dir % len) + len) % len;
    },
    autoNext() {
      this.time = setInterval(() => {
        this.slide(1);
      }, 2200);
    },

    mouseoverHandle() {
      clearInterval(this.time);
    },

    mouseleaveHandle() {
      this.autoNext();
    },
  },
  mounted() {
    this.show = true;
    this.autoNext();
  },
  destroyed() {
    clearInterval(this.time);
  },
};
</script>

<style lang="postcss" scoped>
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}

.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 1.1s ease-in-out, opacity 1.1s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
  opacity: 1;
}
.slide-next-leave-to {
  transform: translate(-100%);
  opacity: 0;
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 1.1s ease-in-out, opacity 1.1s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
  opacity: 1;
}
.slide-prev-leave-to {
  transform: translate(100%);
  opacity: 0;
}
</style>
