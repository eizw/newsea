<template>
    <div class="flex border-2 p-4 rounded-lg border-slate-300 shadow-md">
        <form class="flex-1 flex-col flex gap-4 md:flex-row divide-x-2" v-on:submit.prevent="submit">
            <!-- LANGUAGE -->
            <div class="flex flex-col gap-3">
                <p class="text-l">Language:</p>
                <div class="flex flex-row gap-3">
                    <select class="text-sm border-2 rounded-full py-1 ps-2 border-slate-300"
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
            <div class="flex flex-col gap-3 pl-3">
                <p class="text-l">Search in:</p>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-1 items-center"
                    v-for="i in searchin">
                        <input type="checkbox" 
                        :value="i" v-model="filters.searchin" class="w-4 h-4
                         text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label for="i" class="ms-2 text-sm font-medium text-black">{{ i }}</label>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import "/node_modules/flag-icons/css/flag-icons.min.css";


    const flags = ref([
        'ar','de','gb','es','fr','il','it','nl','no','pt','ru','sv','cn',
    ])

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
        searchin: []


        
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
</script>