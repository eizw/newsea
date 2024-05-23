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
      searchHistory: [] as any[],
      
      
      pageSize: 15 as number,

      sources: [] as any[],
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
    setSources(sources: any) {
      this.sources = sources;
    },
    // ! Limit history to 3 pages
    addHistory(query: any, news: any): boolean {
      let temp = {
        query: query,
        news: news,
      }

      if (this.searchHistory.indexOf(temp) > -1)
        return false
      this.searchHistory.push(temp)
      return true
      
    }
  },
  getters: {
    getTopWithImg(): any {
      return this.topNews.filter((news) => news.urlToImage)
    },
    getLocalWithImg(): any {
      return this.localNews.filter((news) => news.urlToImage)
    },
    getSources(): any {
      return this.sources
    }
  }
})