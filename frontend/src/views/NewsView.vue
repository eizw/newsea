<template>
    <main class="c-page">
        <div class="flex flex-col lg:flex-row lg:c-70 gap-6 w-full">
            <div class="flex flex-col gap-6 px-3 py-5">
                <p class="text-2xl font-bold">{{ article.title }}</p>
                <p class="text-xl">
                    {{ article.content }}
                </p>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from '@/stores/store';
    import axios from 'axios';

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // STATES
    const loading = ref(false)

    // API
    const api: string = 'https://newsapi.org/v2/everything/'
    const api2: string = 'https://newsapi.org/v2/top-headlines/'
    const config = {
        headers: {
        'Authorization': store.apiKey,
        'Content-type': 'application/x-www-form-urlencoded',
        },
    }

    // VAR
    const article = ref({} as any)
    const content = ref('')

    watch(route, (val) => {
        article.value = '';
        if (route.params.country != '') {
            getTopArticle()
        } else {
            getArticle()
        }
    }, {deep: true, immediate: true})

    async function getTopArticle() {
        loading.value = true
        await axios.get(api2, {
            ...config,
            params: {
                q: route.params.title,
                country: route.params.country
            },
        })
        .then(res => {
            article.value = res.data.articles[0]
            console.log(article.value)
            loading.value = false
        })
        .catch(err => {
            console.log(err.response.data)
        })

    }

    async function getArticle() {
        loading.value = true
        await axios.get(api, {
            ...config,
            params: {
                q: route.params.title,
                searchIn: 'title'
            },
        })
        .then(res => {
            article.value = res.data.articles[0]
            console.log(article.value)
            loading.value = false
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    // async function scrape() {
    //     let link = article.value.url
    //     axios.get(link).then(function(r2) {
    //         // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    //         let dom = new JSDOM(r2.data, {
    //             url: link
    //         });

    //         // now pass the DOM document into readability to parse
    //         content.value = new Readability(dom.window.document).parse();

    //         // Done! The article content is in the textContent property
    //         console.log(content.value);
    //     })
    // }
</script>