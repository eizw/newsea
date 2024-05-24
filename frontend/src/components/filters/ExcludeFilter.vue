<template>
    <div class="c-filter">
        <p class="text-l">Exclude:</p>
        <div class="flex flex-col gap-2">
            <form class="flex flex-col gap-2"
            v-on:submit.prevent="addDomain">
                <div class="flex flex-row gap-2">
                    <input type="search" id="default-search" class="filter-hover filter-textfield"
                        v-model="newExclude" 
                        placeholder="Avoid these words..."/>
                    <button type="submit" class="filter-add-btn filter-hover">
                        <i class="fa-solid fa-plus text-sm px-2 text-newsea-primary" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
            
            <div class="flex flex-wrap gap-3">
                <form class="flex flex-row"
                v-on:submit.prevent
                v-for="i in exclude.length"
                key="i"
                >
                    <p type="search" id="default-search" class="filter-extra filter-exclude"
                        >{{ exclude[i-1] }}
                        <button type="submit" v-on:click="removeDomain(i-1)">
                            <i class="fa-solid fa-xmark text-base pl-1 text-red-500" aria-hidden="true"></i>
                        </button>
                    
                    </p>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const emit = defineEmits(['exclude'])

    const exclude = ref([] as any[])

    watch(exclude.value, (val) => {
        emit('exclude', val)
    })

    // DOMAINS = name
    const newExclude = ref('')
    const addDomain = () => {
        if (newExclude.value == '') {
            return
        }
        if (exclude.value.indexOf(newExclude) > -1) {
            return
        }
        console.log(newExclude.value)
        exclude.value.push(newExclude.value)
        exclude.value.splice(exclude.value.length+1)
        newExclude.value = ''
    }
    const removeDomain = (i: number) => {
        exclude.value.splice(i, 1)
    }
</script>