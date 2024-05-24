<template>
    <div class="flex flex-col mt-5 mb-5 gap-3 main-text-hover">
        <RouterLink :to="{name: 'topnews', params: {'country': (isDark) ? 'my' : 'us', 'title': news.title}}" class="flex-1" v-if="hasImg && news.urlToImage != null">
            <img class="w-full object-cover max-h-none"
                :class="[(isHead)?'h-96' : 'h-32']"
                :src="news.urlToImage" alt="img"
            >
        </RouterLink>
        <RouterLink :to="{name: 'topnews', params: {'country': (isDark) ? 'my' : 'us', 'title': news.title}}" class="flex-1" v-if="hasImg && news.urlToImage == null">
            <img :class="[(isHead)?'h-96' : 'h-32']" class=" text-center" src="@/assets/newsea.svg">
        </RouterLink>
        <RouterLink :to="{name: 'topnews', params: {'country': (isDark) ? 'my' : 'us', 'title': news.title}}" class="mt-auto flex-1 flex">
            <p class="text-l font-bold mb-auto line-clamp-2"
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
        hasImg: {
            type: Boolean,
            default: true,
        },
        isHead: {
            type: Boolean,
            default: false,
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    })


</script>