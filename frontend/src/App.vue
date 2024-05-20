<template>
  <div class="flex flex-col min-h-screen font-NotoSerif bg-white">
    <Nav />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Nav from '@/components/Nav.vue';

</script>