<script setup></script>

<template>
  <div class="min-h-screen ">
    <router-view :key="$route.path"></router-view>
  </div>
</template>