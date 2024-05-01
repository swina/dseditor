<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js'
import { workflow } from '@/classes/workflow.js'
import DsChip from '@/components/ui/chip.vue'
import KButton from '@/components/ui/kbutton.vue'

const { globalState, localState, updateValues } = useStatefulComposable();

const store = globalState.instrumentDS

const save = () => {
  localStorage.setItem ( 'ds-instrument' , JSON.stringify ( store ) )
}


</script>
<template>
    <div class="flex items-center w-full">
        <div class="animate-pulse text-center bg-gradient-to-b from-lime-500 border border-r-2 border-b-2 border-black to-lime-600 text-sm text-black px-4 py-2 min-h-20 rounded w-full items-center flex flex-col justify-center relative">
            <div class="absolute top-0 left-0 m-1 text-xs">
                <ds-chip css="bg-lime-600">{{  store.name }}</ds-chip>
                <ds-chip css="bg-lime-600" title="Current Group">GR {{ store.workflow.currentGroup + 1}} {{ store.groups[store.workflow.currentGroup].group.name.default }}</ds-chip>
                <ds-chip css="bg-lime-600" title="Current Sample">SP {{ store.workflow.currentZone + 1}}</ds-chip>
                <ds-chip css="bg-lime-600" title="Current Sample">{{ workflow.currentSample() }}</ds-chip>
            </div>
            ♪  ♪  ♪
            <k-button class="absolute top-0 right-1 text-center" size="18" icon="save" @click="save"/>
        </div>
    </div>
</template>