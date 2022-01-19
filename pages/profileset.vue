<template>
  <div class="flex justify-center select-none my-14">
    <div class="flex flex-col test" style="width: 888px">
      <div class="relative">
        <h3 class="txt-heading3">프로필 설정</h3>

        <div class="mt-3">
          <p>프로필 설정을 하고 회원가입을 완료하세요!</p>
          <p class="text-red1">*는 필수항목입니다.</p>
        </div>

        <!-- profile image  -->
        <p class="mt-10 txt-mid-bold">프로필 사진</p>

        <div
          class="relative mt-5 cursor-pointer test"
          style="width: 100px; height: 100px"
        >
          <div>
            <img src="~assets/imgs/profile.png" alt="프로필 사진 설정" />
          </div>
          <div class="absolute bottom-0 right-0 rounded-full bg-orange1">
            <svgIconAdd :dark="true" />
          </div>
        </div>

        <!-- profile nickname -->
        <div class="flex items-center mt-15 test">
          <p style="width: 112px" class="txt-mid-bold">
            닉네임<span class="text-red1">*</span>
          </p>
          <InputGeneral
            v-model="userNickName"
            :type="`text`"
            :width="312"
            :height="54"
          />
        </div>

        <!-- profile job position -->
        <div class="flex items-start mt-10 test">
          <p style="width: 112px" class="txt-mid-bold">
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
                <div class="flex items-center cursor-pointer test txt-mid">
                  <button type="button" class="border-black border-b-default">
                    {{ currentSelectedJob }}
                  </button>
                  <svgChevronDownOutline />
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
        <div class="mt-4" style="margin-left: 112px">
          <span v-for="(major, index) in currentMajorField" :key="index">
            <ChipGeneral
              @click="setUserMajor(major)"
              :class="{ 'bg-gray3': major === selectedMajor }"
              :chipText="major"
              :rightGap="4"
              :bottomGap="6"
            />
          </span>
        </div>

        <!-- career period -->
        <div class="flex mt-9">
          <p class="txt-mid-bold" style="width: 112px">
            직무경력<span class="text-red1">*</span>
          </p>

          <span v-for="(data, index) in careerPeriod" :key="index">
            <ChipGeneral
              @click="setUserPeriod(data)"
              :class="{ 'bg-gray3': data.period === selectedPeriod }"
              :chipText="data.period"
              :rightGap="4"
            />
          </span>
        </div>

        <div style="margin-left: 112px" class="mt-4">
          <p class="txt-sub">
            직무와 경력은 리뷰 게시, 커뮤니티 활동 시 별명 옆에 노출됩니다.
          </p>
        </div>
      </div>

      <!-- buttons -->
      <div class="flex justify-end mt-18">
        <ButtonGeneral
          :width="244"
          :height="56"
          :dark="true"
          :btnText="`다음에 하기`"
        />

        <ButtonGeneral
          class="ml-5"
          :width="244"
          :height="56"
          :btnText="`프로필 설정 완료`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
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
