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
            <DateFilter @date="setDate"/>

            
        
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
    import DateFilter from '@/components/filters/DateFilter.vue';

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
        from: '',
        to: '',
    })


    const exact = ref(query.exact || '')
    const musty = ref(query.musty || '')
    const noty = ref(query.noty || '')

    const submit = () => {

    }

    watch(filters.value, (val) => {
        console.log(filters.value)
    })

    const setLang = (val: string) => {
        filters.value.language = val;
    }
    const setSearchIn = (val: string[]) => {
        filters.value.searchIn = val;
    }
    const setSources = (val: string[]) => {
        filters.value.sources = val;
    }
    const setDomains = (val: any[]) => {
        let exc: string[] = [], inc: string[] = []
        val.map((domain) => {
            if (domain.exclude)
                exc.push(domain.name)
            else
                inc.push(domain.name)
        })
        filters.value.excludeDomains = exc
        filters.value.domains = inc
    }
    const setDate = (val: string[]) => {
        filters.value.from = val[0]
        filters.value.to = val[1]
    }
</script>