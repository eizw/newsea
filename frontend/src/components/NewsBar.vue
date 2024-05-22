<template>
    <div class="flex flex-row mt-5 mb-5 gap-3 ">
        <RouterLink :to="{name: 'home'}" class="flex flex-1 flex-row gap-3 main-text-hover">
            <div class="flex-1 flex-col gap-2">
                <p class="text-l font-bold line-clamp-2 "
                    :class="{ 'text-white': isDark }"
                >{{ news.title }}</p>
                <p class="text-sm mt-auto"
                >{{ news.date.toLocaleDateString() }}
                </p>

            </div>
            <div class="ml-auto w-1/6" v-if="hasImage">
                <img class="object-cover h-12 w-full"
                    :src="news.urlToImage" alt="img"
                >
            </div>
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
                date: new Date(),
                urlToImage: '@/assets/newsea.svg'
            },
        },
        hasImage: {
            type: Boolean,
            default: true,
        },
        isHead: {
            type: Boolean,
            default: true,
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    })


</script>