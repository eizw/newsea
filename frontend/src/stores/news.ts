import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('news', {
  state: () => {
    return { news: [] };
  },
  actions: {
    
  },
  getters: {
    
  }
})
