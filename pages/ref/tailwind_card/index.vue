<template>
  <div class="p-4">
    <div class="max-w-sm mb-4 overflow-hidden rounded shadow-lg">
      <img
        class="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4 pb-2">
        <div class="mb-2 text-xl font-bold">The Coldest Sunset</div>
        <p class="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="px-6 py-4">
        <span class="mr-2 badge">#photography</span>
        <span class="mr-2 badge">#travel</span>
        <span class="badge">#winter</span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-base font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>
