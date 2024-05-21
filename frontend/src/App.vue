<template>
  <div class="flex flex-col min-h-screen font-NotoSerif bg-white">
    <Header />
    <Nav />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { ref } from 'vue';
  import Nav from '@/components/Nav.vue';
  import Header from '@/components/Header.vue';
  import { useStore } from '@/stores/store';
  import axios from 'axios'

  const api: string = 'https://newsapi.org/'
  const apiKey: string = import.meta.env.VITE_NEWSAPI_KEY;
  const store = useStore();
  const config = {
    headers: {
      'Authorization': apiKey,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  }
  const params = {
    pageSize: 15,
  }

  
  
</script>