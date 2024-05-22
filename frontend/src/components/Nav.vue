<template>
    <nav class="sticky mt-5 mb-5 top-0 bg-white shadow-lg border-t-slate-400 border-t">
        <div class="w-full flex flex-row items-center justify-between
            text-newsea-primary sm:w-full md:c-70 py-4">

            <div class="flex flex-wrap">
                <div class="w-full relative flex lg:w-auto px-4 lg:static lg:block lg:justify-start">
                    <button class="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>


        
                <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu, 'flex-col': showMenu}" 
                    class="lg:flex lg:flex-row items-center"
                >
                    <ul class="flex flex-col lg:flex-row lg:justify-between mr-auto gap-3 mt-3">
                        <li v-for="x in topics" class="nav-item px-7">
                            <RouterLink :to="{name: 'home'}" class="lg:flex-1 lg:pr-16 text-black text-l font-bold main-text-hover">
                                {{ x.charAt(0).toUpperCase() + x.slice(1) }}
                            </RouterLink>
                            
                        </li>
                    </ul>
                </div>
            </div>


            
            <div class="flex px-7 pt-2 justify-end align-text-top mb-auto flex-1">
                <i class="fa fa-search" aria-hidden="true"></i>
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