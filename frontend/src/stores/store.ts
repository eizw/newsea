import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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
  }
})

interface News {
  title: 'No title provided',
  urlToImg: '@/assets/newsea.svg'
}