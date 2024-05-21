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
    }
  },
  actions: {
    setTop(news: any) {
      this.topNews = news;
    },
    setLocal(news: any) {
      this.localNews = news;
    }
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