<template>
    <div class="flex border-2 py-4 px-2 rounded-lg border-slate-300 shadow-md">
        <form class="flex-1 flex-col flex gap-4 md:flex-row md:flex-wrap divide-x-2" v-on:submit.prevent="submit">
            <!-- LANGUAGE -->
            <LangFilter @language="setLang" />

            <!-- SEARCHIN -->
            <SearchInFilter @searchIn="setSearchIn" />

            <!-- SOURCES -->
            <SourceFilter :allSources="sources" @sources="setSources" />

            
            <!-- DOMAINS -->
            <div class="c-filter">
                <p class="text-l">Domains:</p>
                <div class="flex flex-col gap-2">
                    <form class="flex flex-col gap-2"
                    v-on:submit.prevent="addDomain">
                        <div class="flex flex-row gap-2">
                            <input type="search" id="default-search" class="filter-hover filter-textfield"
                                v-model="newDomain.name" 
                                placeholder="Add Domain..."/>
                            <button type="submit" class="filter-add-btn filter-hover">
                                <i class="fa-solid fa-plus text-sm px-2 text-newsea-primary" aria-hidden="true"></i>
                            </button>
                        </div>
                        
                        <div class="flex flex-1 items-center">
                            <input type="checkbox" id="filter-include"
                            v-model="newDomain.exclude" class="w-4 h-4 filter-hover
                            text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                            <label for="filter-include" class="ms-2 text-sm font-medium text-black">exclude</label>
                        </div>
                    </form>
                    
                    <form class="flex flex-row"
                    v-on:submit.prevent
                    v-for="i in filters.domains.length"
                    key="i"
                    >
                        <input type="search" id="default-search" class="filter-hover filter-textfield"
                            v-model="filters.domains[i-1].name"
                            :class="[
                                filters.domains[i-1].exclude ? 'filter-exclude' : 'filter-include',
                            ]"
                            :placeholder="'Domain ' + (i)" required/>
                        <button type="submit" v-on:click="removeDomain(i-1)">
                            <i class="fa-solid fa-trash text-sm pl-3 text-red-500" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            </div>

            <!-- DATE -->
            <div class="c-filter">
                <div class="relative max-w-sm"> 
                    <input type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                </div>
            </div>
        
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useStore } from '@/stores/store';
    import "/node_modules/flag-icons/css/flag-icons.min.css";
    import LangFilter from '@/components/filters/LangFilter.vue';
    import SearchInFilter from '@/components/filters/SearchInFilter.vue';
    import SourceFilter from '@/components/filters/SourceFilter.vue';

    const store = useStore();

    const sources = ref(store.getSources)

    const query = defineProps({
        exact: String,
        musty: String,
        noty: String
    })
    const filters = ref({
        language: '',
        searchIn: [] as string[],
        sources: [] as string[],
        domains: [] as any[],
        excludeDomains: [] as string[],
    })


    const exact = ref(query.exact || '')
    const musty = ref(query.musty || '')
    const noty = ref(query.noty || '')

    const submit = () => {

    }

    const setLang = (val: string) => {
        filters.value.language = val;
    }
    const setSearchIn = (val: string[]) => {
        filters.value.searchIn = val;
    }
    const setSources = (val: string[]) => {
        filters.value.sources = val;
        console.log(filters.value)
    }
    

    // DOMAINS = name
    const newDomain = ref({
        exclude: false,
        name: ''
    })
    const addDomain = () => {
        if (newDomain.value.name == '') {
            return
        }
        if (filters.value.domains.indexOf(newDomain.value) > -1) {
            return
        }
        console.log(newDomain.value)
        filters.value.domains.push(newDomain.value)
        filters.value.domains.splice(filters.value.domains.length+1)
        newDomain.value = {
            exclude: false,
            name: ''
        }
    }
    const removeDomain = (i: number) => {
        filters.value.domains.splice(i, 1)
    }
</script>