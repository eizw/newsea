<template>
  <main class="w-full flex flex-col sm:c-70">
    <HomeMain class="flex-1"/>
    <HomeLocal class="flex-1"/>
  </main>
</template>

<script setup lang="ts">
  import HomeMain from'@/components/HomeMain.vue';
  import HomeLocal from '@/components/HomeLocal.vue';
</script>