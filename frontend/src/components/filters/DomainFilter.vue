<template>
    <div class="c-filter">
        <p class="text-l">Domains:</p>
        <div class="flex flex-col gap-2">
            <form class="flex flex-col gap-2"
            v-on:submit.prevent="addDomain">
                <div class="flex flex-row gap-2">
                    <input type="search" id="default-search" class="filter-hover filter-textfield"
                        v-model="newDomain.name" 
                        placeholder="Add Domain..."/>
                    <button type="submit" class="filter-add-btn filter-hover">
                        <i class="fa-solid fa-plus text-sm px-2 text-newsea-primary" aria-hidden="true"></i>
                    </button>
                </div>
                
                <div class="flex flex-1 items-center">
                    <input type="checkbox" id="filter-include"
                    v-model="newDomain.exclude" class="w-4 h-4 filter-hover
                    text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="filter-include" class="ms-2 text-sm font-medium text-black">Exclude</label>
                </div>
            </form>
            
            <div class="flex flex-wrap gap-3">
                <form class="flex flex-row"
                v-on:submit.prevent
                v-for="i in domains.length"
                key="i"
                >
                    <p type="search" id="default-search" class="filter-extra"
                        :class="[
                            domains[i-1].exclude ? 'filter-exclude' : 'filter-include',
                        ]"
                        >{{ domains[i-1].name }}</p>
                    <button type="submit" v-on:click="removeDomain(i-1)">
                        <i class="fa-solid fa-xmark text-base pl-1 text-red-500" aria-hidden="true"></i>
                    </button>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const emit = defineEmits(['domains'])

    const domains = ref([] as any[])

    watch(domains.value, (val) => {
        emit('domains', val)
    })

    // DOMAINS = name
    const newDomain = ref({
        exclude: false,
        name: ''
    })
    const addDomain = () => {
        if (newDomain.value.name == '') {
            return
        }
        if (domains.value.indexOf(newDomain.value) > -1) {
            return
        }
        console.log(newDomain.value)
        domains.value.push(newDomain.value)
        domains.value.splice(domains.value.length+1)
        newDomain.value = {
            exclude: false,
            name: ''
        }
    }
    const removeDomain = (i: number) => {
        domains.value.splice(i, 1)
    }
</script>