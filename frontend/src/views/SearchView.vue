<template>
    <main class="c-page">
        <div class="flex flex-col w-full lg:c-70 gap-3">
            <div class="flex flex-col md:flex-row">
                <div class="flex flex-1 flex-col gap-3">
                    <p class="flex-1 text-3xl font-bold h-full ">
                        {{ route.query.q }}
                    </p>
                    <p class="flex-1 text-l" v-if="news">
                        Showing {{ totalResults }} results for '<span class="font-bold">{{ route.query.q }}</span>'
                    </p>
                </div>

                <form class="flex-1 ml-auto w-full" v-on:submit.prevent="submit">
                    <div class="relative flex flex-row ">
                        <input type="search" id="default-search" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-s bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            v-model="query" 
                            placeholder="Search..." required />
                        <button type="submit">
                            <i class="fa fa-search text-xl pl-3 text-newsea-primary" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>

            </div>
        
            <div class="py-3">
                <p v-if="loading">Searching...</p>
                <ul class="list-none" v-if="news">
                    <li class="border-b-2" v-for="i in news">
                        <NewsBar :news="{title: i.title, date: new Date(i.publishedAt), urlToImage: i.urlToImage}"/>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    import NewsBar from '@/components/NewsBar.vue'
    import { useStore } from '@/stores/store';
    import axios from 'axios';
    import { ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const query = ref(route.query.q)
    const loading = ref(true)
    const news = ref([] as any)
    const totalResults = ref(0)
    const filters = ref({
        page: route.query.page || 1
    })


    const api: string = 'https://newsapi.org/v2/everything/'
    const config = {
        headers: {
        'Authorization': store.apiKey,
        'Content-type': 'application/x-www-form-urlencoded',
        },
    }
    const params = {
        pageSize: store.pageSize,
    }

    watch(() => route.query, (newQuery, oldQuery) => {
        if (newQuery != oldQuery) {
            loading.value = true
            news.value = [];
            totalResults.value = 0;
            searchNews()

        }
    }, {
        immediate: true
    })

    const submit = () => {
        router.push({
            path: '/search',
            query: {
                q: query.value
            }
        })
    }

    async function searchNews() {
        if (news.value.length == 0)
            await axios.get(api, {
                ...config,
                params: {
                    q: query.value,
                    page: filters.value.page,
                    ...params,
                },
            })
            .then(res => {
                console.log(query.value, res.data.articles)
                totalResults.value = res.data.totalResults
                news.value = res.data.articles
                loading.value = false
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
</script>