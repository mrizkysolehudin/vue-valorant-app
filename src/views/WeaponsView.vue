<template>
  <Navbar />

  <main class="w-screen min-h-screen bg-[#ECE8E3] pb-20 ">
    <div class="w-10/12 mx-auto border-l border-gray-400">
      <section v-if="weaponCategories.length" class="w-full">
        <div v-for="(weaponCategoryItem, index) in weaponCategories" :key="index">
          <h1 class="text-4xl pt-4 pb-5 px-1 font-bold uppercase">
            {{ weaponCategoryItem }}
          </h1>

          <div class="grid grid-cols-2">
            <article v-for="(weaponItem, idx) in filteredWeaponsByCategory(weaponCategoryItem)" :key="idx"
              class="border border-gray-400 min-h-[25dvw] px-2 py-4 flex flex-col justify-between">
              <h3 class="font-bold uppercase text-2xl">
                {{ weaponItem.displayName }}
              </h3>
              <div class="">
                <img :src="weaponItem.displayIcon" alt="" class="w-[89%] my-12 mx-auto">
              </div>
              <p class="font-light">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat odit labore, fugit
                repellendus magnam!
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>



<script setup>
import Navbar from '../components/Navbar.vue';

import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const weapons = ref([]);
const weaponCategories = ref([]);

onMounted(() => {
  getWeapons();
});

const getWeapons = async () => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/weapons');
    weapons.value = response.data.data;

    response.data.data.forEach((w) => {
      const category = w?.shopData?.category;
      if (category !== undefined && !weaponCategories.value.includes(category)) {
        weaponCategories.value.push(category);
      }
    });

  } catch (error) {
    console.error('Error get weapons: ', error);
  }
};

const filteredWeaponsByCategory = (category) => {
  return weapons.value.filter((weapon) => weapon.shopData?.category === category);
};


</script>
