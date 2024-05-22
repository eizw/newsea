<template>
  <main class="c-page" v-if="loaded">
    <HomeMain class="flex-1 c-home"/>
    <HomeLocal class="flex-1"/>
    <HomeSearch class="flex-1"/>
  </main>
</template>

<script setup lang="ts">
  import HomeMain from'@/components/HomeMain.vue';
  import HomeLocal from '@/components/HomeLocal.vue';
  import HomeSearch from '@/components/HomeSearch.vue';
  import { useStore } from '@/stores/store';
  import { ref, watch } from 'vue';
  import axios from 'axios'


  const api: string = 'https://newsapi.org/v2/top-headlines/'
  const store = useStore();
  const config = {
    headers: {
      'Authorization': store.apiKey,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  }
  const params = {
    pageSize: 15,
  }

  
  const loaded = ref(false)

  initFetch();

  async function initFetch() {
    if (store.topNews.length == 0)
      await axios.get(api, {
          ...config,
          params: {
            country: 'us',
            ...params
          }
        })
        .then(res => {
          store.setTop(res.data.articles)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    
    if (store.localNews.length == 0)
      await axios.get(api, {
          ...config,
          params: {
            category: 'general',
            country: 'my',
            ...params,
          }
        })
        .then(res => {
          store.setLocal(res.data.articles)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    console.log('eftched')
    loaded.value = true;
  }

</script>