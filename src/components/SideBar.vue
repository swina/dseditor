<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import Instrument from '@/classes/instrument.js'
import { workflow } from '@/classes/workflow.js'
import GroupsEditor from '@/components/editor/GroupsEditor.vue'

import IconButton from '@/components/ui/kbutton.vue'

const { globalState, localState, updateValues } = useStatefulComposable();


// const myNewInstrument = new Instrument()
// myNewInstrument.groups[0] = new Instrument().Group()
// myNewInstrument.groups[0].zones = [ ... myNewInstrument.groups[0].zones, new Instrument().Zone() ]
// console.log ( myNewInstrument )

const store = globalState
let myNewInstrument 
const createInstrument = ()=>{
    myNewInstrument = new Instrument()
    myNewInstrument.groups[0] = new Instrument().Group()
    store.instrumentDS = myNewInstrument
    store.instrument = { 

        name: 'New DS Instrument' , 
        groups : [
            {
                name: 'Group 1',
                controls: globalState.dsInstrument.groups.group,
                zones: [
                    globalState.dsInstrument.groups.zone
                ]
            }
        ],
        currentGroup: 0,
        currentZone: 0
    }
    globalState.currentGroup = 0
    globalState.currentZone = 0
    store.zones = [ store.zone ]
    store.workflow = 'editor'
}

const save = () => {
  localStorage.setItem ( 'ds-instrument' , JSON.stringify ( store ) )
}

const download = () => {
    const savedInstrument = JSON.parse(localStorage.getItem('ds-instrument'))
    console.log ( "Saved instruments is => " , savedInstrument )
}

</script>

<template>
    <div class="fixed left-0 top-0 bottom-0 h-screen w-1/5 z-10">
        <div class="flex">
            <icon-button class="" size="18" icon="save" title="Save current instrument" @click="save"/>
            <icon-button class="" size="18" icon="download" title="Open last saved instrument" @click="download"/>
            <icon-button class="" size="18" icon="piano" title="Create new instrument" @click="createInstrument"/>
            <icon-button class="" size="18" icon="design" title="UI Design" @click="store.workflow='design'"/>
        </div>
        <!-- <ul class="p-4 cursor-pointer">
            <li class="hover:bg-black p-1 rounded" @click="createInstrument">New Instrument ...</li>
        </ul> -->
        <GroupsEditor v-if="store?.instrumentDS"/>
        <!-- <div v-if="store?.instrumentDS" class="px-6 py-4 bg-black">
            <input type="text" v-model="store.instrumentDS.name" class="bg-black rounded-none"/>
        </div>
        <div class="flex flex-col pl-6 text-xs pr-1" v-if="store.instrumentDS">
            
            <label class="text-yellow-700">Groups : {{ store.instrumentDS.groups.length }}</label>
            <template v-for="group,index in store.instrumentDS.groups">
                GR {{ index+1 }}<br>
                <template v-for="sample,r in group.zones">
                    <div :class="store.instrumentDS.workflow.currentZone == r?'bg-yellow-700':''" class="ml-6 rounded cursor-pointer p-1 hover:bg-black" @click="workflow.setZone(r)">
                        [{{ r }}] ♫ : {{ sample.rootNote.data.name }} {{ sample.loNote.data.name }} {{ sample.hiNote.data.name }}
                    </div>
                </template>
            </template>
            <div v-if="store.instrument.groups[0]?.zones" class="flex flex-col">
                <label>Samples:</label>
                <template v-for="zone, index in store.instrument.groups[0].zones">
                    [{{index+1}}] {{ zone.sample.default }} {{ zone.rootNote.data.name }} - {{  zone.loNote.data.name }} - {{ zone.hiNote.data.name }}
                </template>
            </div>
        </div> -->
    </div>
</template>