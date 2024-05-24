import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      searchHistory: [] as any[],
      sources: [] as any[],
    }
  },
  actions: {
    setSources(sources: any) {
      this.sources = sources;
    },
    // ! Limit history to 3 pages
    addHistory(query: any, news: any): boolean {
        
      if (query in this.searchHistory) {
        this.searchHistory[query].push(...news);
      } else {

        this.searchHistory[query] = news;
      }

      return true
      
    }
  },
  getters: {
    getSources(): any {
      return this.sources
    },
    getHistory(): any {
        return this.searchHistory
    }
  }
})