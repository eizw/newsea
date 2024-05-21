<template>
    <div class="flex flex-col mt-5 mb-5">
        <RouterLink :to="{name: 'home'}" class="flex-1 flex">
            <img class="w-full" :src="news.urlToImage" alt="img">
        </RouterLink>
        <RouterLink :to="{name: 'home'}" class="flex-1 flex mt-auto">
            <p class="text-l font-bold main-text-hover"
                :class="{ 'text-white': isDark }"
            >{{ news.title }}</p>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';

    defineProps({
        news: {
            type: Object,
            default: {
                title: 'No title provided',
                urlToImage: '@/assets/newsea.svg'
            },
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    })


</script>