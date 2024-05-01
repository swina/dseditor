<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import Instrument from '@/classes/instrument.js'
import { workflow } from '@/classes/workflow.js'
import IconButton from '@/components/ui/kbutton.vue'
import DsChip from '@/components/ui/chip.vue'
const { globalState, localState, updateValues } = useStatefulComposable();


// const myNewInstrument = new Instrument()
// myNewInstrument.groups[0] = new Instrument().Group()
// myNewInstrument.groups[0].zones = [ ... myNewInstrument.groups[0].zones, new Instrument().Zone() ]
// console.log ( myNewInstrument )

const store = globalState

const save = () => {
    localStorage.setItem ( 'ds-instrument' , store.instrumentDS )
}

</script>

<template>
    <div class="flex">
        <input type="text" v-model="store.instrumentDS.name" class="bg-black rounded-none"/>
        <icon-button icon="mixer" size="18" @click="store.workflow='editor'"/>
        <icon-button icon="save" size="18" @click="store.workflow='editor',save"/>
    </div>
    <div class="flex flex-col pl-2 text-sm text-blue-500 pr-1 font-normal text-neutral-500" v-if="store.instrumentDS">
            <label class="text-yellow-700">Groups : {{ store.instrumentDS.groups.length }}</label>
            <template v-for="group,index in store.instrumentDS.groups">
                <div class="bg-neutral-900 p-1 rounded my-1 flex relative">
                    Group {{ index+1 }} {{ group?.group ? group.group.name.default : '' }}
                    <ds-chip small css="text-yellow-700 hover:bg-black absolute right-0" class="absolute right-0" title="Add sample zone" @click="workflow.addGroupZone()">+</ds-chip>
                    <!-- <ds-chip small>Group: {{ index+1 }}</ds-chip><div class="text-lg text-white">+</div> -->
                    <!-- <icon-button icon="piano" size="14" small title="Add sample zone" @click="workflow.addGroupZone()"/> -->
                </div>
                <template v-for="sample,r in group.zones">
                    <div class="flex items-center" :title="sample.path.default">
                        <div class="bg-neutral-800 w-3 w-min-3 w-max-3 text-lg text-yellow-600"><span v-if="store.instrumentDS.workflow.currentZone == r" >♫</span></div>
                        <div :class="store.instrumentDS.workflow.currentZone == r?'bg-neutral-700 text-white':'bg-neutral-900'" class="ml-1 w-full rounded cursor-pointer p-1 hover:bg-black mb-1" @click="workflow.setZone(r)">
                        <ds-chip css="text-blue-500">Root: <span class="text-yellow-600">{{ sample.rootNote.data.name }}</span></ds-chip> 
                        <ds-chip css="text-blue-500">Key: <span class="text-yellow-600">{{ sample.loNote.data.name }}</span> to <span class="text-yellow-600">{{ sample.hiNote.data.name }}</span></ds-chip>
                        <ds-chip css="text-blue-500">
                            Vol: <span class="text-yellow-600">{{ sample.volume.default }} {{ sample.volume.um }}</span>
                        </ds-chip>
                        </div>
                    </div>
                </template>
            </template>
    </div>
</template>