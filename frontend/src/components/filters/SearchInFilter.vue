<template>
    <div class="c-filter">
        <p class="text-l">Search in:</p>
        <div class="flex flex-col gap-2">
            <div class="flex flex-1 items-center"
            v-for="i in opts">
                <input type="checkbox" :id="i"
                :value="i" v-model="searchIn" class="w-4 h-4 filter-hover
                    text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <label :for="i" class="ms-2 text-sm font-medium text-black">{{ i }}</label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const emit = defineEmits(['searchIn'])

    const opts = ref([
        'title', 'description', 'content'
    ])
    const searchIn = ref([])


    watch(searchIn, (val) => {
        emit('searchIn', val)
    })

</script>