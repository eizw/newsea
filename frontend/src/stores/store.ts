import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


const defaultNews = {
  title: 'No title provided',
  urlToImg: '@/assets/newsea.svg'
}

export const useStore = defineStore('store', {
  state: () => {
    return { 
      topNews: [] as any[],
      localNews: [] as any[],
      searchHistory: {} as {number: any},
      pageSize: 15 as number,
      apiKey: import.meta.env.VITE_NEWSAPI_KEY,
    }
  },
  actions: {
    setTop(news: any) {
      this.topNews = news;
    },
    setLocal(news: any) {
      this.localNews = news;
    },
    // ! Limit history to 3 pages
  },
  getters: {
    getTopWithImg(): any {
      return this.topNews.filter((news) => news.urlToImage)
    },
    getLocalWithImg(): any {
      return this.localNews.filter((news) => news.urlToImage)
    }
  }
})