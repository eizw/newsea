<template>
    <div class="mt-5 mb-5 bg-white shadow-lg border-t-slate-400 border-t">
        <nav class="w-full flex flex-col items-center container
            gap-7 text-newsea-primary sm:flex-row sm:c-70 py-4">
            <RouterLink :to="{name: 'home'}" v-for="x in topics" class="flex-1">
                <div class="flex justify-left">
                    <p class="text-l font-bold main-text-hover">{{ x.charAt(0).toUpperCase() + x.slice(1) }}</p>
                </div>
            </RouterLink>

            
            <div class="flex justify-end flex-1">
                <i class="fa fa-search" aria-hidden="true"></i>
            </div>
        </nav>
    </div>   
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue'

    const topics = ref([
        'world', 'business', 'green', 'future', 'health', 'travel', 'culture'
    ])

    
</script>