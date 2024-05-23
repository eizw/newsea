<template>
    <div class="flex">
        <form class="flex-1 flex-col md:flex-row" v-on:submit.prevent="submit">
            <div class="flex flex-col">
                <p class="text-l">Language</p>
                <ul class="grid grid-cols-4 gap-3">
                    <li class="text-sm"
                    v-for="i in languages.length"
                    key="i"
                    value="languages[i-1]">
                        <span :class="['fi', 'fi-'+flags[i-1]]"></span>
                        {{ languageNames.of(languages[i-1]) }}
                    </li>
                </ul>

            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import "/node_modules/flag-icons/css/flag-icons.min.css";



    const query = defineProps({
        exact: String,
        musty: String,
        noty: String
    })

    const languageNames = new Intl.DisplayNames(['en'], {type: 'language'})
    const languages = ref([
        'ar','de','en','es','fr','he','it','nl','no','pt','ru','sv','zh',
        //'ud'
    ])
    const flags = ref([
        'ar','de','gb','es','fr','il','it','nl','no','pt','ru','sv','cn',
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