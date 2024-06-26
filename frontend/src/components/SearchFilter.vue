<template>
    <div class="flex flex-col gap-5 border-2 py-4 px-2 rounded-lg border-slate-300 shadow-md">
        <div class="flex-1 flex-col flex gap-4 md:flex-row md:flex-wrap divide-x-2">
            <!-- EXCLUDE -->
            <ExcludeFilter @exclude="setExclude"/>
            
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

            <!-- SORT -->
            <SortFilter @sort=""/>
        </div>

        <div class="flex flex-row-reverse">
            <button type="submit" class="text-white bg-newsea-primary main-btn-hover
                focus:ring-4 rounded-lg border-gray-200 text-sm px-4 py-2"
                @click="submit"    
            >
                Advanced Search
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useSearchStore } from '@/stores/search';
    import { useRouter } from 'vue-router';
    import "/node_modules/flag-icons/css/flag-icons.min.css";

    import LangFilter from '@/components/filters/LangFilter.vue';
    import SearchInFilter from '@/components/filters/SearchInFilter.vue';
    import SourceFilter from '@/components/filters/SourceFilter.vue';
    import DomainFilter from '@/components/filters/DomainFilter.vue';
    import DateFilter from '@/components/filters/DateFilter.vue';
    import SortFilter from '@/components/filters/SortFilter.vue';
    import ExcludeFilter from '@/components/filters/ExcludeFilter.vue';

    const searchStore = useSearchStore();
    const router = useRouter();
    const emit = defineEmits(['params'])

    const sources = ref(searchStore.getSources)
    const filters = ref({
        exclude: [] as string[],
        language: 'en',
        searchIn: [] as string[],
        sources: [] as string[],
        domains: [] as string[],
        excludeDomains: [] as string[],
        from: (new Date(new Date().getMonth() - 1)).toString(),
        to: (new Date()).toString(),
    })

    const submit = () => {
        let temp = filters.value;
        let params = {
            exclude: temp.exclude.join('-'),
            language: temp.language,
            searchIn: temp.searchIn.length > 0 ? temp.searchIn.join(',') : null,
            sources: temp.sources.join(','),
            domains: temp.domains.join(','),
            excludeDomains: temp.excludeDomains.join(','),
            from: temp.from,
            to: temp.to,
        }
        console.log(params)
        emit('params', params)
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
    const setExclude = (val: string[]) => {
        filters.value.exclude = val
    }
</script>