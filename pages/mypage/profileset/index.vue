<template>
  <div class="flex justify-center select-none">
    <div class="flex flex-col test" style="width: 888px">
      <div class="relative">
        <!-- profile image  -->
        <div class="flex items-center">
          <p class="txt-base-bold">프로필 사진</p>

          <div
            class="relative ml-4 cursor-pointer test"
            style="width: 60px; height: 60px"
          >
            <div>
              <img src="~assets/imgs/profile.png" alt="프로필 사진 설정" />
            </div>
            <div class="absolute bottom-0 right-0 rounded-full bg-orange1">
              <svgIconAdd :dark="true" />
            </div>
          </div>
        </div>

        <!-- user ID -->
        <div class="flex items-center mt-6">
          <span class="txt-base-bold">아이디</span>
          <span class="ml-9">testest@naver.com</span>
          <NuxtLink to="/mypage/profileset/passwordchange">
            <ButtonGeneral
              class="border border-orange2 text-orange2 px-4 py-1.5 rounded-8px ml-5 txt-base-bold"
            >
              <span>비밀번호 변경하기</span>
            </ButtonGeneral>
          </NuxtLink>
        </div>

        <!-- profile nickname -->
        <div class="flex items-center mt-7 test">
          <p style="width: 82px" class="txt-base-bold">
            닉네임<span class="text-red1">*</span>
          </p>

          <div>
            <InputGeneral
              v-model="userNickName"
              :type="`text`"
              :width="312"
              :height="44"
              class="txt-sub"
              :class="{ 'border-orange2': userNickName.length > 0 }"
            />
          </div>
        </div>
        <!-- msg box -->
        <div style="margin-left: 82px">
          <span class="txt-mini text-gray1">
            닉네임은 10자 이하로 설정해 주세요.
          </span>
        </div>

        <!-- profile job position -->
        <div class="flex items-start mt-6 test">
          <p style="width: 82px" class="txt-base-bold">
            직무<span class="text-red1">*</span>
          </p>

          <div>
            <!-- select box -->
            <div
              ref="jobmenu"
              class="relative inline-block h-full text-left"
              @click="isJobMenuOpened = !isJobMenuOpened"
            >
              <div class="h-full">
                <!-- current selected job -->
                <div class="flex items-center cursor-pointer test txt-base">
                  <button type="button" class="border-black border-b-1px">
                    {{ currentSelectedJob }}
                  </button>
                  <svgChevronDownOutline style="width: 11px" />
                </div>
                <!-- options -->
                <div
                  v-if="isJobMenuOpened"
                  class="absolute left-0 z-50 bg-white top-full"
                >
                  <div
                    class="w-full p-5 border rounded-md border-gray1"
                    style="width: 144px"
                  >
                    <div
                      v-for="(job, index) in jobPosition"
                      :key="index"
                      @click="selectJob(job.position, index)"
                    >
                      <p
                        class="cursor-pointer hover:font-bold hover:underline"
                        :class="{ 'pt-4': index !== 0 }"
                      >
                        {{ job.position }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- detail job chips -->
        <div class="flex flex-wrap mt-2" style="margin-left: 82px">
          <span v-for="(major, index) in currentMajorField" :key="index">
            <ChipGeneral
              @click="setUserMajor(major)"
              :chipText="major"
              class="px-4 mb-1 mr-1 border py-9px rounded-8px"
              :class="{ 'bg-gray3': major === selectedMajor }"
            />
          </span>
        </div>

        <!-- career period -->
        <div class="flex items-center mt-6">
          <p class="txt-base-bold" style="width: 82px">
            직무경력<span class="text-red1">*</span>
          </p>

          <span v-for="(data, index) in careerPeriod" :key="index">
            <ChipGeneral
              @click="setUserPeriod(data)"
              :chipText="data.period"
              class="px-4 mb-1 mr-1 border py-9px rounded-8px"
              :class="{ 'bg-gray3': data.period === selectedPeriod }"
            />
          </span>
        </div>
      </div>

      <!-- noti box -->
      <div style="margin-left: 82px" class="mt-2">
        <p class="txt-mini text-gray1">
          직무와 경력은 리뷰 게시, 커뮤니티 활동 시 별명 옆에 노출됩니다.
        </p>
      </div>

      <!-- buttons -->
      <div class="flex justify-end mt-13">
        <ButtonGeneral
          :width="200"
          :height="44"
          class="border border-orange2 text-orange2 rounded-4px"
        >
          <span>취소</span>
        </ButtonGeneral>

        <ButtonGeneral
          :width="200"
          :height="44"
          class="ml-2 text-white bg-orange2 rounded-4px"
        >
          <span>프로필 수정</span>
        </ButtonGeneral>
      </div>

      <!-- divider -->
      <div class="mt-12 border-t border-gray1"></div>

      <!-- user withdrawl button -->
      <div class="mt-6">
        <NuxtLink to="/mypage/profileset/accountwithdrawl">
          <span class="underline cursor-pointer text-gray1">회원탈퇴하기</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  data() {
    return {
      userNickName: "",
      currentSelectedJob: "개발자",
      currentSelectedJobIndex: 0,
      isJobMenuOpened: false,
      jobPosition: [
        {
          id: 0,
          position: "개발자",
          major: [
            "개발자",
            "웹 개발자",
            "프론트엔드 개발자",
            "백엔드 개발자",
            "안드로이드 개발자",
            "ios 개발자",
            "임베디드 개발자",
            "DB관리자",
          ],
        },
        {
          id: 1,
          position: "기획자",
          major: [
            "기획자",
            "서비스 기획자",
            "사업 기획자",
            "콘텐츠 기획자",
            "마케터",
            "상품 기획자",
          ],
        },
        {
          id: 2,
          position: "디자이너",
          major: [
            "디자이너",
            "UI/UX 디자이너",
            "그래픽 디자이너",
            "웹디자이너",
            "일러스트레이터",
            "영상 디자이너",
          ],
        },
        {
          id: 3,
          position: "데이터 전문가",
          major: ["데이터 분석가", "데이터 엔지니어", "데이터 사이언티스트"],
        },
      ],
      careerPeriod: [
        {
          id: 0,
          period: "1년차 이하",
        },
        {
          id: 1,
          period: "2~3년차",
        },
        {
          id: 2,
          period: "4~5년차",
        },
        {
          id: 3,
          period: "6~7년차",
        },
        {
          id: 4,
          period: "8년차 이상",
        },
      ],
      selectedMajor: "",
      selectedPeriod: "",
    };
  },
  mounted() {
    document.addEventListener("click", this.close);
    this.$store.commit("changeCntCategoryIdx", 0);
  },
  methods: {
    close(e) {
      // console.log(this.$refs.jobmenu, e.target);
      if (!this.$refs.jobmenu.contains(e.target) && this.isJobMenuOpened) {
        this.isJobMenuOpened = false;
      }
    },
    selectJob(selected, index) {
      this.selectedMajor = "";
      this.currentSelectedJob = selected;
      this.currentSelectedJobIndex = index;
      this.isJobMenuOpened = false;
    },
    setUserMajor(major) {
      this.selectedMajor = major;
    },
    setUserPeriod(data) {
      this.selectedPeriod = data.period;
    },
  },
  computed: {
    currentMajorField() {
      return this.jobPosition[this.currentSelectedJobIndex]["major"];
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border border-dashed border-orange1; */
}
</style>
