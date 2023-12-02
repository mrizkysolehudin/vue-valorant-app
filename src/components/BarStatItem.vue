<template>
  <li class="pb-5">
    <div class="flex font-light  gap-2 scale-y-75 text-lg">
      <p class=" text-gray-200">
        {{ label }}
      </p>
      <p class="flex">
        (
        <span class="pr-1 font-semibold">
          {{ score }}
        </span>
        <span>
          / {{ ofScore }})
        </span>
      </p>
    </div>
    <div class="w-full bg-gray-200  h-2.5 dark:bg-gray-700">
      <div class="bg-[#FE4E62] h-2.5 " :style="{ width: progress + '%' }"></div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  label: String,
  progress: Number,
  score: String,
  ofScore: String

})

</script>