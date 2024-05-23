<template>
    <div class="c-filter">
        <p class="text-l">Sources:</p>
        <div class="flex flex-col gap-3">
            <form class="flex flex-row gap-2"
            v-on:submit.prevent="addSource">
                <select class="filter-hover text-sm border-2 rounded-full py-1 ps-2 pe-2 border-slate-300"
                v-model="newSource"
                >
                    <option v-bind:value="{id: '', name: 'ANY'}">Pick a source</option>
                    <option
                    v-for="i in allSources"
                    v-bind:value="{id: i.id, name: i.name}"
                    >
                        <div>
                            {{ i.name }}
                        </div>
                    </option>
                </select>
                <button type="submit" class="filter-add-btn filter-hover">
                    <i class="fa-solid fa-plus text-sm  text-newsea-primary" aria-hidden="true"></i>
                </button>
            </form>

            <div class="flex flex-col gap-1">
                <form class="flex flex-row"
                v-on:submit.prevent
                v-for="i in sources.length"
                key="i"
                >
                    <p class="filter-extra">
                        {{  sources[i-1].name }}
                    </p>
                    <button type="submit" v-on:click="removeSource(i-1)">
                        <i class="fa-solid fa-xmark text-base pl-1 text-red-500" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const emit = defineEmits(['sources'])

    defineProps(['allSources'])
    const sources = ref([] as any)

    watch(sources.value, (val) => {
        let temp = [] as string[]
        sources.value.map((source: any) => {
            temp.push(source.id)
        })
        emit('sources', temp)
    })

    // SOURCES = id
    const newSource = ref({
        id: '',
        name: 'ANY'
    })
    const addSource = () => {
        if (newSource.value.id == '') {
            return
        }
        if (sources.value.indexOf(newSource.value) > -1) {
            return
        }
        sources.value.push(newSource.value)
        sources.value.splice(sources.value.length+1)
    }
    const removeSource = (i: number) => {
        sources.value.splice(i, 1)
    }
</script>