<template>
    <div class="flex flex-col sm:flex-col lg:flex-row gap-6 w-full">
      <NewsCard class="flex-1" :news="{title: news[0].title, urlToImage: news[0].urlToImage}"/>
      <div class="grid grid-cols-2 gap-3 w-full lg:w-3/6">
          <NewsCard class="flex-1 md:border-t-2 md:border-slate-400 lg:border-none md:pt-5 lg:pt-0" 
            v-for="i in 4" :key="i"
            :news="{title: news[i].title, urlToImage: news[i].urlToImage}"
          />
      </div>
    </div>
</template>

<script setup lang="ts">
  import NewsCard from '@/components/NewsCard.vue'
  import { useStore } from '@/stores/store';

  const store = useStore();

  const news = store.topNews.filter((news) => news.urlToImage);
</script>