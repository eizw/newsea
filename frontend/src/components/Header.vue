<template>
    <header class="my-4 md:mt-10 md:mb-8 items-center flex justify-center">
        <RouterLink :to="{ name: 'home' }" class="flex justify-center">
            <img class="text-center w-7/12 sm:w-max" src="@/assets/newsea.svg">

        </RouterLink>
    </header>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';

</script>