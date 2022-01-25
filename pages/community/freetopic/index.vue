<template>
  <div class="flex justify-center">
    <div style="width: 786px">
      <!-- category menu & post button -->
      <div class="flex items-center justify-between">
        <div>
          <span class="mr-5 font-bold cursor-pointer text-orange2">전체</span>
          <span class="mr-5 cursor-pointer">개발</span>
          <span class="mr-5 cursor-pointer">데이터</span>
          <span class="mr-5 cursor-pointer">디자인</span>
          <span class="mr-5 cursor-pointer">기타</span>
        </div>

        <div>
          <ButtonGeneral
            :width="88"
            :height="44"
            :btnText="`글쓰기`"
            :small="true"
            class="font-bold txt-base"
          />
        </div>
      </div>

      <!-- Search Box -->
      <SearchGeneral
        v-model="value"
        :searchboxColor="`white`"
        :borderRadius="`rounded-8px`"
        :placeholder="`검색으로 원하는 내용을 빠르게 찾아보세요!`"
        :placeholderColor="`placeholder-gray6`"
        :label="`left`"
        :labelGap="`4`"
        class="py-4 pl-4 mt-10"
      />

      <!-- cards list -->
      <div v-for="i in 13" :key="i" class="mt-10">
        <nuxt-link :to="`/community/freetopic/${i}`">
          <div class="flex items-center">
            <ChipGeneral
              :width="46"
              :height="37"
              :borderRadius="`rounded-8px`"
              :chipText="`개발`"
              class="font-bold pointer-events-none py-8px px-10px txt-sub text-green3 bg-green2"
            />
            <p class="txt-mid-bold ml-6px">파이썬 입문 강의 추천해주세요!</p>
          </div>

          <div class="mt-3">
            <span
              >안녕하세요. 문과생이에요. 파이썬 강의 입문하려고 하는데 어떤 것이
              좋은지 몰라서요.. 혹시 괜찮 강의 추천좀 부탁드려도 될까요?
              비전공자라서 알아듣기 쉬운 강의였으면 좋겠어요!!!</span
            >
          </div>

          <div class="mt-3 text-gray6">
            <span> 작성자</span>
            <span class="ml-5">2021.11.23</span>
          </div>

          <div class="mt-2 text-gray6">
            <span>댓글 3</span>
          </div>
        </nuxt-link>
      </div>

      <!-- pagination -->
      <div class="flex justify-center">
        <PaginationGeneral class="my-16" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "community",
  data() {
    return {};
  },
};
</script>
