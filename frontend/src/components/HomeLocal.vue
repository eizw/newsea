<template>
    <div class="flex flex-col w-full gap-6 px-5 py-6 bg-newsea-secondary">
        <p class="text-white text-4xl font-bold">Happening in Malaysia</p>
        <div class="flex gap-4 border-b">
            <NewsCard 
                class="flex-1"
                v-for="i in 3" :key="i" 
                :hasImage="false" :isDark="true" 
                :news="{title: news[i-1].title, hasImg: false}"
            />

        </div>
        <div class="flex gap-4">
            <NewsCard 
                class="flex-1"
                v-for="i in 3" :key="i" 
                :hasImage="false" :isDark="true" 
                :news="{title: news[i+2].title, hasImg: false}"
            />

        </div>
        <p class="text-right text-xl text-white">SEE MORE</p>
    </div>
</template>

<script setup lang="ts">
    import NewsCard from '@/components/NewsCard.vue'
    import { ref } from 'vue';
    import { useStore } from '@/stores/store';

    const store = useStore();

    const news = [...store.localNews].slice(5);
    console.log('local', news)
</script>