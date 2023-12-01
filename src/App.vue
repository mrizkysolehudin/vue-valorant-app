<script setup></script>

<template>
  <div class="min-h-screen font-oswald">
    <router-view :key="$route.path"></router-view>
  </div>
</template>