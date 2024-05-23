<template>
    <div class="flex border-2 py-4 px-2 rounded-lg border-slate-300 shadow-md">
        <form class="flex-1 flex-col flex gap-4 md:flex-row md:flex-wrap divide-x-2" v-on:submit.prevent="submit">
            <!-- LANGUAGE -->
            <div class="c-filter">
                <p class="text-l">Language:</p>
                <div class="flex flex-row gap-3">
                    <select class="filter-hover text-sm border-2 rounded-full py-1 ps-2 border-slate-300"
                    v-model="filters.language"
                    >
                        <option selected>Choose a language</option>
                        <option
                        v-for="i in languages.length"
                        key="i"
                        v-bind:value="{index: i-1, lang: languages[i-1]}"
                        >
                            <div>
                                {{ languageNames.of(languages[i-1]) }}
                            </div>
                        </option>
                    </select>
                    <span :class="['fi', filters.language.index > -1? 'fi-'+flags[filters.language.index] : 'hidden', ]"></span>
                </div>
            </div>

            <!-- SEARCHIN -->
            <div class="c-filter">
                <p class="text-l">Search in:</p>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-1 items-center"
                    v-for="i in searchin">
                        <input type="checkbox" :id="i"
                        :value="i" v-model="filters.searchin" class="w-4 h-4 filter-hover
                         text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label :for="i" class="ms-2 text-sm font-medium text-black">{{ i }}</label>
                    </div>
                </div>
            </div>

            <!-- SOURCES -->
            <div class="c-filter">
                <p class="text-l">Sources:</p>
                <div class="flex flex-col gap-3">
                    <form class="flex flex-row gap-2"
                    v-on:submit.prevent="addSource">
                        <select class="filter-hover text-sm border-2 rounded-full py-1 ps-2 pe-2 border-slate-300"
                        v-model="newSource"
                        >
                            <option v-bind:value="{id: '', name: 'ANY'}">Pick a source</option>
                            <option
                            v-for="i in sources"
                            v-bind:value="{id: i.id, name: i.name}"
                            >
                                <div>
                                    {{ i.name }}
                                </div>
                            </option>
                        </select>
                        <button type="submit" class="filter-add-btn filter-hover">
                            <i class="fa-solid fa-plus text-sm  text-newsea-primary" aria-hidden="true"></i>
                        </button>
                    </form>

                    <form class="flex flex-row"
                    v-on:submit.prevent
                    v-for="i in filters.sources.length"
                    key="i"
                    >
                        <p class="filter-hover filter-textfield">
                            {{  filters.sources[i-1].name }}
                        </p>
                        <button type="submit" v-on:click="removeSource(i-1)" 
                        >
                            <i class="fa-solid fa-trash text-sm pl-3 text-red-500" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            </div>

            
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
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useStore } from '@/stores/store';
    import "/node_modules/flag-icons/css/flag-icons.min.css";

    const store = useStore();

    const flags = ref([
        'ar','de','gb','es','fr','il','it','nl','no','pt','ru','sv','cn',
    ])
    const sources = ref(store.getSources)

    const query = defineProps({
        exact: String,
        musty: String,
        noty: String
    })
    const filters = ref({
        language: {
            index: 2,
            lang: 'en'
        },
        searchin: [] as string[],
        sources: [] as any[],
        domains: [] as any[],
        excludeDomains: [] as string[],


        
    })

    const languageNames = new Intl.DisplayNames(['en'], {type: 'language'})
    const languages = ref([
        'ar','de','en','es','fr','he','it','nl','no','pt','ru','sv','zh',
        //'ud'
    ])
    const searchin = ref([
        'title', 'description', 'content'
    ])
    const domains = ref([

    ])

    const exact = ref(query.exact || '')
    const musty = ref(query.musty || '')
    const noty = ref(query.noty || '')

    const submit = () => {

    }

    // SOURCES = id
    const newSource = ref({
        id: '',
        name: 'ANY'
    })
    const addSource = () => {
        if (newSource.value.id == '') {
            return
        }
        if (filters.value.sources.indexOf(newSource.value) > -1) {
            return
        }
        filters.value.sources.push(newSource.value)
        filters.value.sources.splice(filters.value.sources.length+1)
    }
    const removeSource = (i: number) => {
        filters.value.sources.splice(i, 1)
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