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
                :src="cardImageLogo(lecture['course_platform'])"
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
                  <ButtonGeneral
                    class="ml-3 text-white bg-orange2 rounded-4px"
                    style="width: 172px; height: 32px"
                  >
                    <NuxtLink :to="`/review/${lecture['course_id']}`">
                      <span>{{ lecture["num_review"] }}개의 리뷰 보기</span>
                    </NuxtLink>
                  </ButtonGeneral>
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
                <img
                  v-if="review['user_imageUrl']"
                  :src="review['user_imageUrl']"
                  alt=""
                  class="object-contain rounded-full"
                  style="width: 48px; height: 48px"
                />
                <div
                  v-else
                  class="rounded-full bg-gray1"
                  style="width: 48px; height: 48px"
                ></div>
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
              course_id: 8,
              course_title: "실전! 스프링 데이터 JPA",
              course_platform: "유데미",
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
        },
        {
          tutorLectureData: [
            {
              course_id: 15,
              course_title: "Vue.js 시작하기 - Age of Vue.js",
              course_platform: "인프런",
              course_price: 44000,
              instructor_id: 6,
              instructor_name: "장기효(캡틴판교)",
              course_siteUrl: "https://www.inflearn.com/course/age-of-vuejs",
              course_createdAt: "2022-02-02",
              num_review: "3",
              course_avg: "3.3",
              course_liked: "false",
            },
          ],
          reviewData: [
            {
              review_id: 32,
              review_avg: "3.3",
              review_pros: "He has a very good teaching skill",
              review_cons: "a little outdated",
              user_id: 1,
              user_nickname: "핑구",
              user_job: "백엔드 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-02-08",
              user_imageUrl: null,
              num_help: "0",
              review_helped: "false",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 15,
              course_title: "Vue.js 시작하기 - Age of Vue.js",
              course_platform: "클래스101",
              course_price: 44000,
              instructor_id: 6,
              instructor_name: "장기효(캡틴판교)",
              course_siteUrl: "https://www.inflearn.com/course/age-of-vuejs",
              course_createdAt: "2022-02-02",
              num_review: "3",
              course_avg: "3.3",
              course_liked: "false",
            },
          ],
          reviewData: [
            {
              review_id: 32,
              review_avg: "3.3",
              review_pros: "He has a very good teaching skill",
              review_cons: "a little outdated",
              user_id: 1,
              user_nickname: "핑구",
              user_job: "백엔드 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-02-08",
              user_imageUrl: null,
              num_help: "0",
              review_helped: "false",
            },
          ],
        },
        {
          tutorLectureData: [
            {
              course_id: 8,
              course_title: "실전! 스프링 데이터 JPA",
              course_platform: "프로그래머스",
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
        },
        {
          tutorLectureData: [
            {
              course_id: 8,
              course_title: "실전! 스프링 데이터 JPA",
              course_platform: "리메인",
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
              review_id: 6,
              review_avg: "4.0",
              review_pros: "He has a very good teaching skill",
              review_cons: "a little outdated",
              user_id: 33,
              user_nickname: "죠르디",
              user_job: "백엔드 개발자",
              user_career: "1년차 이하",
              review_createdAt: "2022-02-04",
              user_imageUrl: null,
              num_help: "1",
              review_helped: "true",
            },
          ],
        },

        {
          tutorLectureData: [
            {
              course_id: 8,
              course_title: "실전! 스프링 데이터 JPA",
              course_platform: "코드잇",
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
        },
        {
          tutorLectureData: [
            {
              course_id: 8,
              course_title: "실전! 스프링 데이터 JPA",
              course_platform: "패스트캠퍼스",
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
    cardImageLogo(siteName) {
      let imgName = "";

      if (siteName === "탈잉") {
        imgName = "taling";
      } else if (siteName === "인프런") {
        imgName = "inflearn";
      } else if (siteName === "유데미") {
        imgName = "udemy";
      } else if (siteName === "클래스101") {
        imgName = "class101";
      } else if (siteName === "리메인") {
        imgName = "remain";
      } else if (siteName === "패스트캠퍼스") {
        imgName = "fastcampus";
      } else if (siteName === "프로그래머스") {
        imgName = "programmers";
      } else if (siteName === "코드잇") {
        imgName = "codeit";
      } else {
        imgName = "etc";
      }

      return require(`assets/imgs/logo/lecturesite/${imgName}.png`);
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
