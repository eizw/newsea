<template>
  <main class="c-page" v-if="loaded">
    <HomeMain class="flex-1 c-home"/>
    <HomeLocal class="flex-1"/>
    <HomeSearch class="flex-1"/>
  </main>
  <Loading class="mt-auto" :text="'Loading'"  v-if="!loaded"/>
</template>

<script setup lang="ts">
  import HomeMain from'@/components/HomeMain.vue';
  import HomeLocal from '@/components/HomeLocal.vue';
  import HomeSearch from '@/components/HomeSearch.vue';
  import { useStore } from '@/stores/store';
  import { ref, onMounted } from 'vue';
  import axios from 'axios'

  const api: string = `https://newsapi.org/v2/top-headlines/`
  const store = useStore();
  const config = {
    headers: {
      'Authorization': store.apiKey,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  }

  
  const loaded = ref(false)
  const category = ref('')

  onMounted(() => {
    loaded.value = false;
    fetchNews();
  })

  watch(category.value, (val) => {
    fetchNews();
  })

  async function fetchNews() {
    if (store.topNews.length == 0) {
      await axios.get(api, {
          ...config,
          params: {
            country: 'us',
            category: store.category,
            pageSize: 10,
          }
        })
        .then(res => {
          store.setTop(res.data.articles)
        })
        .catch(err => {
          console.log(err.response.data)
        })

    }
    
    if (store.localNews.length == 0) {
      await axios.get(api, {
          ...config,
          params: {
            country: 'my',
            category: store.category,
            pageSize: 6,
          }
        })
        .then(res => {
          store.setLocal(res.data.articles)
        })
        .catch(err => {
          console.log(err.response.data)
        })

    }
    loaded.value = true;
  }

</script>