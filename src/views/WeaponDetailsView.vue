<template>
  <Navbar />

  <main class="w-screen min-h-[95dvh] relative text-white pt-6 bg-valorant">
    <div class="bg-black/60 absolute w-screen min-h-[95dvh] top-0">
      <div class="flex w-10/12 mx-auto mt-10">
        <section class="w-6/12">
          <h1 class="font-bold uppercase text-4xl">
            {{ weapon.displayName }}
          </h1>
          <h3 class="pt-1 text-lg">
            {{ weapon?.shopData?.category }}
          </h3>
          <p class="font-light pt-1 mb-7 text-sm w-9/12">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat odit labore, fugit
            repellendus magnam!
          </p>
          <router-link :to="{ name: 'Weapons' }"
            class="uppercase border-[1.5px] border-white w-fit px-16 py-2  hover:bg-white hover:text-[#FE4E62]">
            Compare
          </router-link>
          <img :src="weapon.displayIcon" alt="" class="w-[95%] my-7 ">
        </section>
        <section class="w-6/12 px-20">
          <h3 class="text-center font-semibold text-xl">
            STATS
          </h3>
          <ul class="mt-2">
            <BarStatItem label="Fire Rate" :score="`${weapon.weaponStats?.fireRate}`" of-score="16"
              :progress="`${weapon.weaponStats?.fireRate / 16 * 100}`" />
            <BarStatItem label="Equip Time" :score="`${weapon.weaponStats?.equipTimeSeconds}s`" of-score="1.5s"
              :progress="`${weapon.weaponStats?.equipTimeSeconds / 1.5 * 60}`" />
            <BarStatItem label="Reload Time" :score="`${weapon.weaponStats?.reloadTimeSeconds}s`" of-score="5s"
              :progress="`${weapon.weaponStats?.reloadTimeSeconds / 5 * 60}`" />
            <BarStatItem label="Magazine" :score="`${weapon.weaponStats?.magazineSize}`" of-score="100"
              :progress="`${weapon.weaponStats?.magazineSize}`" />
            <BarStatItem label="Head Damage" :score="`${weapon.weaponStats?.damageRanges[0]?.headDamage}`" of-score="255"
              :progress="`${weapon.weaponStats?.damageRanges[0]?.headDamage / 255 * 100}`" />
            <BarStatItem label="Body Damage" :score="`${weapon.weaponStats?.damageRanges[0]?.bodyDamage}`" of-score="150"
              :progress="`${weapon.weaponStats?.damageRanges[0]?.bodyDamage / 150 * 100}`" />
            <BarStatItem label="Leg Damage" :score="`${weapon.weaponStats?.damageRanges[0]?.legDamage}`" of-score="120"
              :progress="`${weapon.weaponStats?.damageRanges[0]?.legDamage / 120 * 100}`" />
          </ul>
        </section>
      </div>
    </div>
  </main>
</template>


<script setup>
import Navbar from '../components/Navbar.vue';
import BarStatItem from '../components/BarStatItem.vue';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const route = useRoute();

const weapon = ref([]);
const weaponCategories = ref([]);

onMounted(() => {
  if (route.params.id) {
    getWeaponByUuid(route.params.id);
  }
});

const getWeaponByUuid = async (uuid) => {
  try {
    const response = await axios.get(`https://valorant-api.com/v1/weapons/${uuid}`);
    weapon.value = response.data.data;

    // response.data.data.forEach((w) => {
    //   const category = w?.shopData?.category;
    //   if (category !== undefined && !weaponCategories.value.includes(category)) {
    //     weaponCategories.value.push(category);
    //   }
    // });

  } catch (error) {
    console.error('Error get weapon: ', error);
  }
};

const filteredWeaponsByCategory = (category) => {
  return weapon.value.filter((weapon) => weapon.shopData?.category === category);
};

console.log(weapon);

</script>

<style scoped>
.bg-valorant {
  background-image: url('https://hunterae.com/wp-content/uploads/images/cyberpunk-hud-ui-500-download-videohive-31040533-free-hunterae-com-7.jpg');
  @apply bg-cover bg-bottom;
}
</style>