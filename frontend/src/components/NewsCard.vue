<template>
    <div class="flex flex-col mt-5 mb-5 gap-3 main-text-hover">
        <RouterLink :to="{name: 'home'}" class="flex-1" v-if="hasImage">
            <img class="w-full object-cover max-h-none" :src="news.urlToImage" alt="img">
        </RouterLink>
        <RouterLink :to="{name: 'home'}" class="flex-1 flex">
            <p class="text-l font-bold mb-auto overflow-hidden text-ellipsis"
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
        hasImage: {
            type: Boolean,
            default: true,
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    })


</script>