<template>
    <div class="bg-gray-300 h-2/6 mt-32 py-10">
        <div class="c-home  flex flex-col gap-5">
            <p class="text-xl text-gray-700 text-center">Search for more news</p>
            <form class="w-full mx-auto lg:px-28" v-on:submit.prevent="submit">
                <div class="relative">
                    <input type="search" id="default-search" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                    v-model="query"    
                    placeholder="Search for more News..." required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink, useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()

    const query = ref('')

    const submit = () => {
        if (query.value === '' || query.value.match(/^ *$/) !== null) {
            router.push({
                path: '/search',
            })
        } else {
            router.push({
                path: '/search',
                query: {
                    q: query.value,
                }
            })

        }
    }

</script>