<template>
    <div class="flex flex-col sm:flex-row gap-6">
      <NewsCard class="flex-1"/>
      <div class="flex flex-col sm:flex-row flex-1 gap-6">
        <div class="flex flex-col flex-1" v-for="i in 2" key="i">
          <NewsCard class="flex-1"/>
          <NewsCard class="flex-1"/>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
    import NewsCard from '@/components/NewsCard.vue'
</script>