<template>
    <div class="flex flex-row my-3 gap-3 h-36">
        <RouterLink :to="{name: 'news', params: {title: news.title}}" class="flex flex-1 flex-row gap-3 main-text-hover">
            <div class="flex-1 flex flex-col gap-2 py-3 h-full">
                <p class="text-l font-bold line-clamp-2"
                    :class="{ 'text-white': isDark }"
                >{{ news.title }}</p>
                <div class="flex flex-row text-sm w-full italic">
                    <p>
                        {{ news.source.name }}
                    </p>
                    <p class="ml-auto"
                    >{{ new Date(news.publishedAt).toLocaleDateString() }}
                    </p>
                </div>
                <p class="text-sm mt-auto line-clamp-2"
                >{{  news.description }}
                </p>

            </div>
            <div class="inline-block align-middle ml-auto w-1/6 h-full" v-if="news.urlToImage">
                <img class="object-cover h-full w-full"
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
                publishedAt: new Date(),
                urlToImage: null,
                description: null,
            },
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    })


</script>