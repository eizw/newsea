<template>
    <header class="sticky mt-10 mb-3 items-center flex justify-center">
        <RouterLink :to="{ name: 'home' }">
            <img class="text-center flex w-max" src="@/assets/newsea.svg">

        </RouterLink>
    </header>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';

</script>