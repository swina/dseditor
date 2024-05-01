<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import IconMixer from '@/components/icons/IconMixer.vue'
const { globalState, localState, updateValues } = useStatefulComposable();

const store = globalState.instrument 
const updateMsg = (n) => {
    store.currentGroup = n
    if ( n > -1 ){
        globalState.keyboard.message = `  Group ${n+1} Settings`
    } else {
        globalState.keyboard.message = ''
    }
}
</script>
<template>
    <div class="flex items-center p-4">
        <template v-for="group,index in store.groups">
            <div class="flex items-center cursor-pointer rounded bg-neutral-900 pl-2" @click="store.currentGroup > -1 ? updateMsg(-1) : updateMsg(index)"><label class="bg-neutral-900 text-xs px-2 py-1 text-center"> {{ group.name }} </label>
                <span class="bg-yellow-700 rounded-r p-1"><IconMixer size="15"/></span>
            </div>
        </template> 
    </div>
</template>