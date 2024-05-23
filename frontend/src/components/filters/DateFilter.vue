<template>
    <div class="c-filter">
        <VueDatePicker v-model="date" 
            :range="{fixedEnd: true}" :clearable="false"
            :max-date="new Date()" :min-date="new Date(new Date().setDate(new Date().getMonth() - 1))"/>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'

    const emit = defineEmits(['date'])

    const date = ref([new Date(new Date().setDate(new Date().getMonth() - 1)), new Date()] as any[])


    watch(date, (val) => {
        let temp = date.value.map(val => {
            return val.toISOString();
        })
        emit('date', temp)
    })
</script>