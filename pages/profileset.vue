<template>
  <div class="flex justify-center select-none my-14">
    <div class="flex flex-col test" style="width: 888px">
      <div class="relative">
        <h3 class="txt-mid-bold">프로필 설정</h3>

        <div class="flex mt-1">
          <p class="txt-sub">
            프로필 설정을 하고 회원가입을 완료하세요!
            <span class="text-red1"> *는 필수항목입니다.</span>
          </p>
        </div>

        <!-- profile image  -->
        <div class="flex items-center mt-8">
          <p class="txt-base-bold">프로필 사진</p>

          <div
            @click="addProfileImage"
            class="relative ml-4 cursor-pointer test"
            style="width: 60px; height: 60px"
          >
            <div>
              <img
                v-if="preview"
                :src="preview"
                alt=""
                class="object-cover rounded-full"
                style="width: 60px; height: 60px"
              />
              <img
                v-else
                src="~assets/imgs/profile/default_user_profile.png"
                alt="프로필 사진 설정"
                draggable="false"
                class="object-cover rounded-full"
                style="width: 60px; height: 60px"
              />
            </div>
            <div class="absolute bottom-0 right-0 rounded-full bg-orange1">
              <svgIconAdd :dark="true" />
            </div>
          </div>

          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden pointer-events-none"
            @change="onChangeFileInput"
          />
        </div>

        <!-- profile nickname -->
        <div class="flex items-center mt-6 test">
          <p style="width: 83px" class="txt-base-bold">
            닉네임<span class="text-red1">*</span>
          </p>
          <InputGeneral
            v-model="userNickName"
            @input="handleUserNickname"
            :type="`text`"
            :width="312"
            :height="44"
            class="p-3 rounded-4px txt-sub"
            :class="{ 'border-orange2': userNickName.length > 0 }"
          />
        </div>
        <!-- err message -->
        <div style="margin-left: 83px" class="h-11">
          <p
            class="pt-1 txt-mini"
            :class="[isNicknameMsgError ? ' text-red1' : 'text-green1']"
          >
            {{ nicknameNotiMsg }}
          </p>
        </div>

        <!-- profile job position -->
        <div class="flex items-start test">
          <p style="width: 83px" class="txt-base-bold">
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
                  <button
                    type="button"
                    class="border-black border-b-1px mr-0.5"
                  >
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
        <div class="flex flex-wrap mt-4" style="margin-left: 83px">
          <span v-for="(major, index) in currentMajorField" :key="index">
            <ChipGeneral
              @click="setUserMajor(major)"
              class="px-4 py-2 mb-1 mr-1 border border-gray2 rounded-4px txt-sub"
              :class="{ 'bg-gray3': major === selectedMajor }"
              :chipText="major"
            />
          </span>
        </div>

        <!-- career period -->
        <div class="flex mt-6">
          <p class="txt-base-bold" style="width: 83px">
            직무경력<span class="text-red1">*</span>
          </p>

          <span v-for="(data, index) in careerPeriod" :key="index">
            <ChipGeneral
              @click="setUserPeriod(data)"
              class="px-4 py-2 mb-1 mr-1 border border-gray2 rounded-4px txt-sub"
              :class="{ 'bg-gray3': data.period === selectedPeriod }"
              :chipText="data.period"
            />
          </span>
        </div>

        <div style="margin-left: 83px" class="mt-2">
          <p class="txt-mini text-gray1">
            직무와 경력은 리뷰 게시, 커뮤니티 활동 시 별명 옆에 노출됩니다.
          </p>
        </div>
      </div>

      <!-- buttons -->
      <div class="flex justify-end mt-13">
        <NuxtLink to="/">
          <ButtonGeneral
            :width="200"
            :height="44"
            class="transition-colors border border-orange2 text-orange2 rounded-4px hover:text-white hover:bg-orange2"
          >
            <span class="txt-base-bold">다음에 하기</span>
          </ButtonGeneral>
        </NuxtLink>

        <ButtonGeneral
          @click="changeProfileSetting"
          :width="200"
          :height="44"
          class="ml-3 text-white transition-colors border-orange1 bg-orange1 hover:border-orange2 hover:bg-orange2 rounded-4px"
        >
          <span class="txt-base-bold">프로필 설정 완료</span>
        </ButtonGeneral>
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
      nicknameNotiMsg: "",
      isNicknameMsgError: false,
      imageFile: null,
      preview: null,
      timeout: null,
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

    if (!(this.$auth && this.$auth.user)) {
      let userData = {};

      try {
        userData = await this.$axios.$get("/api/users/me");

        if (userData) {
          this.$store.commit("auth/SET", { key: "user", value: userData });
          this.$store.commit("auth/SET", { key: "loggedIn", value: true });
        }
        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    handleUserNickname(value) {
      console.log(value);
      this.userNickName = value;
      this.nicknameNotiMsg = "";

      // debounce input event
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(async () => {
        try {
          let response = await this.$axios.$post("/api/users/check/nickname", {
            nickname: this.userNickName,
          });
          if (response) {
            this.isNicknameMsgError = false;
            this.nicknameNotiMsg = "사용 가능한 닉네임입니다.";
          }
          // console.log(response);
        } catch (err) {
          // console.log(err.response);
          if (err.response.data.statusCode === 400) {
            this.isNicknameMsgError = true;
            this.nicknameNotiMsg = "닉네임은 10자 이하로 설정해주세요.";
          } else if (err.response.data.statusCode === 409) {
            this.isNicknameMsgError = true;
            this.nicknameNotiMsg = "이미 사용중인 닉네임입니다.";
          }
        }
      }, 500);
    },
    addProfileImage() {
      this.$refs.fileInputRef.click();
    },
    onChangeFileInput(event) {
      const file = event.target.files[0];

      if (file && file.type.substr(0, 5) === "image") {
        this.imageFile = event.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
          this.preview = reader.result;
        };
        reader.readAsDataURL(this.imageFile);
      } else {
        this.preview = null;
      }
    },
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
    async changeProfileSetting() {
      const fd = new FormData();

      fd.append("image", this.imageFile);
      fd.append("nickname", this.userNickName);
      fd.append("job", this.selectedMajor);
      fd.append("career", this.selectedPeriod);

      try {
        const response = await this.$axios.$patch("/api/users/profile", fd);

        this.$auth.setUser(response);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
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
