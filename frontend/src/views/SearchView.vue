<template>
    <main class="c-page">
        <div class="flex flex-col w-full px-4 lg:px-0 lg:c-70 gap-3">
            <div class="flex flex-col gap-3">
                <div class="flex-1 flex flex-col md:flex-row">
                    <div class="flex flex-1 flex-col gap-3"
                    v-if="news.length > 0"
                    >
                        <p class="flex-1 text-3xl font-bold h-full ">
                            {{ route.query.q }}
                        </p>
                        <p class="flex-1 text-l" >
                            Showing {{ totalResults }} results for '<span class="font-bold">{{ route.query.q }}</span>'
                        </p>
                    </div>

                    <div class="flex-1 flex flex-col gap-3">
                        <form class="flex-1 ml-auto w-full" v-on:submit.prevent="submit">
                            <div class="flex flex-row ">
                                <input type="search" id="default-search" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-s bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    v-model="query" 
                                    placeholder="Search..." required />
                                <button type="submit">
                                    <i class="fa fa-search text-xl pl-3 text-newsea-primary" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                        
                        <div class="mt-auto flex flex-row-reverse text-right">
                            <button class="flex flex-row gap-1 text-white text-base text-right
                                mt-auto border-2 bg-newsea-primary py-2 px-4 rounded-full hover:bg-slate-200 hover:border-slate-200 transition delay-75" 
                                type="button" v-on:click="toggleFilter()">
                                <p class="flex-1">Filters</p>
                                <i class="fa-solid fa-filter pt-1"></i>
                            </button>

                        </div>
                    </div>


                </div>

                <div class="flex-1" v-if="showFilter && !loadingSource">
                    <SearchFilter />
                </div>
            </div>

            
        
            <div class="py-3">
                <p v-if="loading">Searching...</p>
                <ul class="list-none" v-if="news">
                    <li class="border-b-2" v-for="i in news">
                        <NewsBar :news="{title: i.title, date: new Date(i.publishedAt), urlToImage: i.urlToImage, description: i.description}"/>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    import NewsBar from '@/components/NewsBar.vue'
    import SearchFilter from '@/components/SearchFilter.vue';
    import { useStore } from '@/stores/store';
    import axios from 'axios';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // ! STATEs
    const loading = ref(false)
    const loadingSource = ref(false)
    const showFilter = ref(false)

    // ! FILTERS
    const query = ref(route.query.q || '')
    const extra = ref(route.query)

    


    const news = ref([] as any)
    const totalResults = ref(0)


    const filters = ref({
        language: route.query.language,
        page: route.query.page || 1
    })


    const api: string = 'https://newsapi.org/v2/everything/'
    const api_source: string = 'https://newsapi.org/v2/top-headlines/sources/'
    const config = {
        headers: {
        'Authorization': store.apiKey,
        'Content-type': 'application/x-www-form-urlencoded',
        },
    }
    const params = {
        pageSize: store.pageSize,
    }

    onMounted(() => {
        getSources();
        if (route.query.q != null)
            searchNews();
        console.log('dd')
    })

    watch(() => route.query, (newQuery, oldQuery) => {
        if (newQuery != oldQuery && newQuery != null) {
            console.log(query)
            news.value = [];
            totalResults.value = 0;
            searchNews()

        }
    })

    const submit = () => {
        if (query.value === '' || query.value.toString().match(/^ *$/) !== null) {
            return
        }
        router.replace({
            path: '/search',
            query: {
                q: query.value,
                page: filters.value.page
            }
        })
    }

    async function searchNews() {
        return
        if (news.value.length == 0)
            loading.value = true
            await axios.get(api, {
                ...config,
                params: {
                    q: route.query.q,
                    page: route.query.page,
                    ...params,
                },
            })
            .then(res => {
                totalResults.value = res.data.totalResults
                news.value = res.data.articles
                loading.value = false
            })
            .catch(err => {
                console.log(err.response.data)
            })
        loading.value = false
    }

    const toggleFilter = () => {
        showFilter.value = !showFilter.value
    }

    async function getSources() {
        // loadingSource.value = true
        // await axios.get(api_source, {
        //     ...config,
        //     })
        //     .then(res => {
        //         store.setSources(res.data.sources)
        //     })
        //     .catch(err => {
        //         console.log(err.response.data)
        //     })
        loadingSource.value = false

    }
</script>