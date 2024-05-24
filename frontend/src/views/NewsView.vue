<template>
    <main class="c-page px-3">
        <div class="mt-32 flex align-center justify-center" v-if="loading">
            <Loading class="mt-auto" :text="'Loading'"/>
        </div>
        <div class="flex flex-col lg:flex-row w-full lg:c-70 gap-4" v-if="article && foryou">
            <div class="flex flex-col gap-6 px-3 py-5">
                <p class="text-3xl font-bold ">{{ article.title }}</p>
                <div class="flex flex-row text-sm pb-7 border-b-2">
                    <p>Published by <span class="text-newsea-secondary">{{ article.author }}</span></p>
                    <p class="ml-auto">
                        <i class="text-xs fa-solid fa-water"></i>
                        {{ new Date(article.publishedAt).toLocaleDateString() }}
                    </p>
                </div>
                <p class="text-xl">
                    {{ article.content }}
                </p>
            </div>
            <div class="flex flex-col gap-3 px-3 lg:border-l-2 lg:pl-4 w-full lg:w-8/12">
                <p class="text-xl font-bold py-3 border-t-2 lg:border-t-0 border-b-2">
                    To explore
                </p>
                <NewsCard
                    class="flex-1"
                    v-for="i in foryou"
                    :news="i"
                />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from '@/stores/store';
    import Loading from '@/components/Loading.vue'
    import NewsCard from '@/components/NewsCard.vue'
    import axios from 'axios';

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // STATES
    const loading = ref(false)

    // API
    const api: string = `https://newsapi.org/v2/everything/`
    const api2: string = `https://newsapi.org/v2/top-headlines/`
    const config = {
        headers: {
        'Authorization': store.apiKey,
        'Content-type': 'application/x-www-form-urlencoded',
        },
    }

    // VAR
    const article = ref({} as any)
    const foryou = ref([] as any[])

    watch(route, (val) => {
        loading.value = true
        article.value = '';
        console.log(route.params)
        if (route.params.country) {
            getTopArticle();
        } else {
            getArticle();
        }
        getForYou();
    }, {deep: true, immediate: true})

    async function getForYou() {
        await axios.get(api2, {
            ...config,
            params: {
                country: route.params.country || 'us',
                pageSize: 3,
                page: Math.floor((Math.random() * 10) + 3),
            },
        })
        .then(res => {
            foryou.value = res.data.articles
            loading.value = false
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

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
            loading.value = false
        })
        .catch(err => {
            console.log(err.response.data)
        })

    }

    async function getArticle() {
        loading.value = true
        let params = {
            q: route.params.title,
            searchIn: 'title'
        }
        console.log(params)
        await axios.get(api, {
            ...config,
            params,
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