<template>
    <div class="c-filter">
        <p class="text-l">Sort by:</p>
        <section class="flex flex-col gap-2">
            <div class="flex items-center" v-for="i in names.length" key="i">
                <input id="default-radio-1" type="radio" 
                    v-model="sortBy"
                    :value="opts[i-1]" name="default-radio" 
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                <label for="default-radio-1" class="ms-2 text-sm font-medium text-black">
                    {{ names[i-1] }}
                </label>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const emit = defineEmits(['sortBy'])

    const names = ref([
        'Relevancy: Most relevant first',
        'Popularity: Popular first',
        'Publish date: Latest first'
    ])
    const opts = ref([
        'relevancy',
        'popularity',
        'publishedAt',
    ])
    const sortBy = ref('publishedAt')

    watch(sortBy, (val) => {
        emit('sortBy', val);
    })

</script>