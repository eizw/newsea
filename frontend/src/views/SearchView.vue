<template>
    <main class="c-page">
        <div class="flex flex-col w-full px-4 lg:px-0 lg:c-70 gap-3">
            <div class="flex flex-col gap-3">
                <div class="flex-1 flex flex-col md:flex-row">
                    <div class="flex flex-1 flex-col gap-3"
                    v-if="news.length > 0"
                    >
                        <p class="flex-1 text-3xl font-bold h-full ">
                            {{ resquery }}
                        </p>
                        <p class="flex-1 text-l" >
                            Showing {{ totalResults }} results for '<span class="font-bold">{{ resquery }}</span>'
                        </p>
                    </div>

                    <div class="flex-1 flex flex-col gap-3">
                        <form class="flex-1 ml-auto w-full" v-on:submit.prevent="submit">
                            <div class="flex flex-row ">
                                <input type="search" id="default-search" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-s bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    v-model="query" 
                                    placeholder="Search..." required />
                                <button type="submit" v-if="!showFilter">
                                    <i class="fa fa-search text-xl pl-3 text-newsea-primary" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                        
                        <div class="mt-auto flex flex-row-reverse text-right">
                            <button class="flex flex-row gap-1 text-white text-base text-right
                                mt-auto border-2 bg-newsea-primary py-2 px-4 rounded-full main-btn-hover" 
                                type="button" v-on:click="toggleFilter()">
                                <p class="flex-1">Filters</p>
                                <i class="fa-solid fa-filter pt-1"></i>
                            </button>

                        </div>
                    </div>


                </div>

                    <div class="flex-1" v-if="showFilter && !loadingSource">
                <KeepAlive>
                        <SearchFilter @params="setParams"/>
                </KeepAlive>
                    </div>

            </div>

            
            
            <div class="py-3">
                <KeepAlive>
                    <ul class="list-none" v-if="news">
                        <li class="border-b-2" v-for="i in news">
                            <NewsBar :news="i"/>
                        </li>
                    </ul>

                </KeepAlive>

                <div class="mt-32 flex align-center justify-center" v-if="loading">
                    <Loading class="mt-auto" :text="'Loading'"/>
                </div>
                <div class="c-search flex flex-col gap-5" v-if="nores">
                    <div class="flex flex-row">
                        <i class="fa-solid fa-ship text-7xl text-newsea-primary"></i>
                        <i class="fa-solid fa-question text-5xl text-newsea-primary"></i><br />

                    </div>
                    <p class="text-center text-xl">
                        Looks like there're no more results!
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    import NewsBar from '@/components/NewsBar.vue'
    import SearchFilter from '@/components/SearchFilter.vue';
    import Loading from '@/components/Loading.vue';
    import { useStore } from '@/stores/store';
    import { useSearchStore } from '@/stores/search';
    import axios from 'axios';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const searchStore = useSearchStore()

    // ! STATEs
    const loading = ref(false)
    const loadingSource = ref(false)
    const showFilter = ref(false)
    const nores = ref(false)

    // ! FILTERS
    const resquery = ref('')
    const query = ref(route.query.q as string || '')
    const filters = ref(route.query.filters as any)
    const page = ref(0)

    const news = ref([] as any)
    const totalResults = ref(0)
    const api: string = `https://newsapi.org/v2/everything/`
    const api_source: string = 'https://newsapi.org/v2/top-headlines/sources/'
    const config = {
        headers: {
        'Authorization': store.apiKey,
        'Content-type': 'application/x-www-form-urlencoded',
        },
    }

    function getNextNews() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            loading.value = true
            setTimeout(() => {
                fetchNews(5);
            }, 1000)
        }
      }
    }

    function disableScroll() {
        window.onscroll = () => {
            return
        }
    }

    onMounted(() => {
        getSources();
        getNextNews();
    })

    watch(() => route.query, (newQuery, oldQuery) => {
        // searchStore.addHistory(oldQuery, news)
        if (newQuery != oldQuery && newQuery != null) {
            newSearch()
        }
    }, {immediate: true})

    function newSearch() {
        news.value = [];
        totalResults.value = 0;
        fetchNews(10)
    }

    const submit = () => {
        if (query.value === '' || query.value.toString().match(/^ *$/) !== null) {
            return
        }
        router.replace({
            path: '/search',
            query: {
                q: query.value,
                page: filters.value.page,
            }
        })
    }

    const toggleFilter = () => {
        showFilter.value = !showFilter.value
    }

    async function getSources() {
        loadingSource.value = true
        await axios.get(api_source, {
            ...config,
            })
            .then(res => {
                searchStore.setSources(res.data.sources)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        loadingSource.value = false

    }

    async function fetchNews(pageSize: number) {
        loading.value = true
        
        let params = {}
        if (filters.value!=undefined) {
            let {exclude, ...temp} = filters.value
            params = {
                q: (exclude) ? query.value + ('-'+exclude) : query.value,
                ...temp
            }
        } else {
            params = {
                q: query.value
            }

        }
        
        await axios.get(api, {
            ...config,
            params: {
                ...params,
                pageSize: pageSize,
                page: (pageSize < 10) ? 3 + page.value++ : 1
            },
        })
        .then(res => {
            if (Object.keys(res.data.articles).length > 0) {
                resquery.value = query.value;
                totalResults.value = res.data.totalResults
                news.value.push(...res.data.articles)
                news.value.splice(news.value.length+pageSize)
                loading.value = false
                console.log(res.data)
                getNextNews()
            } else {
                console.log('bruh')
                disableScroll()
                loading.value = false
                nores.value = true
            }
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    const setParams = (val: any) => {
        // let params = new URLSearchParams(val);
        // let keysForDel: any[] = [];
        // params.forEach((value, key) => {
        //     if (value == '' || value.length == 0 || value==null) {
        //         keysForDel.push(key);
        //     }
        // });

        // keysForDel.forEach(key => {
        //     params.delete(key);
        // });
        for (let param in val) {
            if (val[param] == null || val[param] == '') {
                delete val[param]
            }
        }

        filters.value = val;
        router.replace({
            path: '/search',
            query: {
                q: query.value,
                filters: filters.value
            }
        })

    }


</script>

