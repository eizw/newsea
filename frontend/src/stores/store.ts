import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      topNews: [] as any[],
      localNews: [] as any[],
      category: 'general' as string,

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
    setCategory(category: string) {
      this.category = category;
    }
  },
  getters: {
    getTopWithImg(): any {
      return this.topNews.filter((news) => news.urlToImage)
    },
    getLocalWithImg(): any {
      return this.localNews.filter((news) => news.urlToImage)
    },
  }
})