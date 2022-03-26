<template>
  <div
    v-if="$store.state.requireProfileSetModal.isModalOpened"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 border-0 bg-gray9"
  >
    <div
      class="flex flex-col items-center justify-between py-8 bg-white rounded-8px"
      style="width: 520px; height: 200px"
    >
      <div class="text-center">
        <div>
          <span class="txt-mid">프로필 설정이 필요한 서비스입니다.</span>
          <div class="flex mt-11">
            <ButtonGeneral
              @click="
                $store.commit(
                  'requireProfileSetModal/changeIsModalOpened',
                  false
                )
              "
              :width="145"
              :height="44"
              class="border border-orange2 text-orange2 rounded-4px hover:bg-orange2 hover:text-white"
            >
              <span class="txt-base-bold"> 취소 </span>
            </ButtonGeneral>
            <ButtonGeneral
              @click="$router.push('/mypage/profileset')"
              :width="145"
              :height="44"
              class="ml-4 text-white bg-orange1 rounded-4px hover:bg-orange2"
            >
              <span class="txt-base-bold"> 프로필 설정 </span>
            </ButtonGeneral>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped></style>
