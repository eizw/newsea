<template>
    <div class="c-filter">
        <p class="text-l">Language:</p>
        <div class="flex flex-row gap-3">
            <select class="filter-hover text-sm border-2 rounded-full py-1 ps-2 border-slate-300"
            v-model="language"
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
            <span :class="['fi', language.index > -1? 'fi-'+flags[language.index] : 'hidden', ]"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const emit = defineEmits(['language'])
    
    const flags = ref([
        'ar','de','gb','es','fr','il','it','nl','no','pt','ru','sv','cn',
    ])
    const languageNames = new Intl.DisplayNames(['en'], {type: 'language'})
    const languages = ref([
        'ar','de','en','es','fr','he','it','nl','no','pt','ru','sv','zh',
        //'ud'
    ])

    const language = ref({
        index: 2,
        lang: 'en'
    })

    watch(language, (val) => {
        emit('language', val.lang)
    })

</script>