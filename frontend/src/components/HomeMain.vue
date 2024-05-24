<template>
    <div class="flex flex-col sm:flex-col lg:flex-row gap-6 w-full" v-if="news">
      <NewsCard class="w-full lg:w-4/6 h-full" :news="news[0]" :isHead="true"/>
      <div class="grid grid-cols-2 gap-3 w-full lg:w-3/6">
          <NewsCard class="h-full flex-1 md:border-t-2 md:border-slate-400 lg:border-none md:pt-5 lg:pt-0" 
            v-for="i in 4" :key="i"
            :news="news[i]"
          />
      </div>
    </div>
</template>

<script setup lang="ts">
  import NewsCard from '@/components/NewsCard.vue'
  import { useStore } from '@/stores/store';
  import { ref } from 'vue';

  const store = useStore();

  const news = ref(store.getTopWithImg);
  console.log(news.value)
</script>