<template>
    <div class="w-full py-14 mt-9 bg-newsea-secondary" v-if="news">
        <div class="flex gap-6 flex-col c-home">
            <p class="text-white text-4xl font-bold">Happening in Malaysia</p>
            <div class="flex flex-col gap-4 md:flex-row md:border-b">
                <NewsCard 
                    class="flex-1"
                    v-for="i in 3" :key="i" 
                    :isDark="true" 
                    :news="news[i]" :hasImg="false"
                />

            </div>
            <div class="hidden md:flex gap-4">
                <NewsCard 
                    class="flex-1"
                    v-for="i in 3" :key="i" 
                    :isDark="true" 
                    :news="news[i+2]" :hasImg="false"
                />

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import NewsCard from '@/components/NewsCard.vue'
    import { ref } from 'vue';
    import { useStore } from '@/stores/store';

    const store = useStore();

    const news = ref(store.localNews);
</script>