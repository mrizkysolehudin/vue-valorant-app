<template>
  <nav class="flex items-center w-screen h-[5dvw] bg-[#1B242F] justify-center gap-6 text-white font-bold uppercase">
    <router-link :to="{ name: 'Agents' }" class="hover:text-red-400 "
      :class="{ 'text-red-400': $route.name === 'Agents' }">Agents</router-link>
    <router-link :to="{ name: 'Weapons' }" class="hover:text-red-400"
      :class="{ 'text-red-400': $route.name === 'Weapons' || $route.name === 'WeaponDetails' }">Weapons</router-link>
  </nav>
</template>