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
            <DomainFilter @domains="setDomains"/>

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
    import DomainFilter from '@/components/filters/DomainFilter.vue';

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
        domains: [] as string[],
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
    }
    const setDomains = (val: string[]) => {
        filters.value.domains = val;
    }
    

    
</script>