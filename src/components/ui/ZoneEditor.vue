<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
const { globalState, localState, updateValues } = useStatefulComposable();
import ConfigIcon from '@/components/icons/IconConfig.vue'
import TRange from '@/components/ui/range.vue'
import Panels from '@/components/ui/EditorPanels.vue'

const store = globalState
console.log ( store )

const step = ref(0)
// console.log ( dsInstrument )
const infoNote = (which) => {
    return globalState.zone[which + 'Name'] + '[' + globalState.zone[which] + ']'
}
const msg = ()=>{
    let stringa = globalState.editorStep == 0 ? 
         'Root Note' : 
            globalState.editorStep == 1 ? 
                'Lo Note' : 
                    globalState.editorStep == 2 ? 
                        'Hi Note' : ''
    return stringa
}
let volume = 50
</script>
<template>
    
    <!-- <div v-if="msg()" class="p-2 rounded bg-green-100 -mt-4 text-center w-1/6 m-auto text-xs">
        <div>Set the {{ msg() }}</div>
    </div> -->
    <div class="flex items-center justify-end">
        <span  alt="Config" title="Config">
            <ConfigIcon class="mb-1 cursor-pointer"/>
        </span>
    </div>
    <div class="bg-black text-white px-2 py-1">Zone {{ globalState.zones.length }} 
      
    </div>

    <div class="flex items-center justify-around text-xs font-normal bg-gray-300 p-4 rounded">
            <button class="px-2 py-1 bg-red-300 rounded text-xs" @click="globalState.editorStep=0,store.keyboard.message='Set Root Note'">Root Note</button>
            <input type="text" class="p-1 bg-gray-100" id="rootNote" :value="infoNote('root')">
        
            <button class="px-2 py-1 bg-yellow-300 rounded text-xs" @click="globalState.editorStep=1,store.keyboard.message='Set Lo Note'">Lo Note</button>
            <input type="text" class="p-1 bg-gray-100" id="loNote" :value="infoNote('loNote')">
        
            <button class="px-2 py-1 bg-blue-300 rounded text-xs" @click="globalState.editorStep=2,store.keyboard.message='Set Hi Note'">Hi Note</button>
            <input type="text" class="p-1 bg-gray-100" id="hiNote" :value="infoNote('hiNote')">

            <button class="px-2 py-1 bg-green-300 rounded text-xs" @click="globalState.editorStep=-1">Confirm</button>
    </div>
    <div class="flex text-xs font-normal bg-gray-300 p-4 mt-1 rounded">
        <div class="flex items-center w-1/4">
            Volume <input type="range" min="-50" max="50" class="ml-2 p-1 bg-gray-100" id="volume" v-model="globalState.zone.volume"> {{ globalState.zone.volume }}dB
        </div>
        <div class="flex items-center w-1/4">
            Pan  <input type="range" min="-100" max="100" class="ml-2 p-1 bg-gray-100" id="pan" v-model="globalState.zone.pan"> {{ globalState.zone.pan }}<span class="pl-1">{{ globalState.zone.pan < 0 ? 'L' : 'R' }}</span>
        </div>
        <div class="flex items-center w-1/4">
            Lo Vel <input type="range" min="0" max="127" class="ml-2 p-1 bg-gray-100" id="loVel" v-model="globalState.zone.loVelocity"> {{ globalState.zone.loVelocity}}
        </div>
        <div class="flex items-center w-1/4">
            Hi Vel <input type="range" min="0" max="127" class="ml-2 p-1 bg-gray-100" id="hiVel" v-model="globalState.zone.hiVelocity"> {{ globalState.zone.hiVelocity}}
        </div>
    </div>
    <!-- <div class="flex items-center text-white px-4 py-4 bg-neutral-700 rounded my-2">

        <template v-for="control in controls">
            <t-range v-if="control.ref.type == 'range'" :min="control.ref.min" :max="control.ref.max" v-model="control.ref.default" :label="control.label" :um="control.ref.um" class="text-white my-2 mr-4"/>
        </template>
    </div> -->

   
</template>