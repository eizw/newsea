<template>
    <div class="flex flex-col mt-5 mb-5">
        <RouterLink :to="{name: 'home'}" class="flex-1 flex">
            <img class="news-card-img" src="@/assets/newsea.svg" alt="">
        </RouterLink>
        <RouterLink :to="{name: 'home'}" class="flex-1 flex mt-auto">
            <p class="text-l font-bold mt-auto main-text-hover"
                :class="{ dark: isDark }"
            >{{ title }}</p>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';

    defineProps({
        title: {
            type: String,
            default: 'No title provided',
        },
        isDark: {
            type: Boolean,
            default: false,
        }
    })
</script>