<template>
    <nav class="sticky flex mt-5 mb-5 top-0 bg-white shadow-lg border-t-slate-400 border-t">
        <div class="w-full flex flex-row gap-3 items-center justify-between 
            text-newsea-primary sm:w-full md:c-70 py-4">

            <div class="flex flex-1 flex-wrap my-auto gap-3">
                <div class="flex lg:hidden px-4 lg:static lg:justify-start">
                    <button class="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>


        
                <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu, }" 
                    class="flex-col lg:flex lg:flex-row items-center mt-auto"
                >
                    <ul class="flex flex-col lg:flex-row lg:mt-0 gap-3 lg:gap-12">
                        <li v-for="x in topics" class="flex-1 nav-item pl-7 lg:px-0">
                            <RouterLink :to="{name: 'home'}" class="text-black text-l font-bold main-text-hover">
                                {{ x.charAt(0).toUpperCase() + x.slice(1) }}
                            </RouterLink>
                            
                        </li>
                    </ul>
                </div>
            </div>


            <div class="flex flex-1 flex-row items-end mb-auto max-w-max">
                <form class="flex-1 ml-auto w-full">
                    <div class="relative flex flex-row ">
                        <input type="search" id="default-search" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-s bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                            " 
                            placeholder="Search..." required />
                        <button type="submit" class="">
                            
                            <i class="fa fa-search text-xl mr-7 pl-3" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </nav>   
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue'

    const showMenu = ref(false)
    const topics = ref([
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology'
    ])

    const toggleNavbar = () => {
        showMenu.value = !showMenu.value
    }
    
</script>