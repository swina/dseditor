<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import { keyboard , whichNote } from '../utils/keyboard.js'
import IconWav from '@/components/icons/IconWav.vue'
import Toolbar from './Toolbar.vue'
import Panels from '@/components/ui/EditorPanels.vue'
import EditorControls from '@/components/ui/EditorControls.vue'
import { panelsControls } from '@/utils/ds.settings'
import { dsInstrument } from '@/utils/ds.settings'
import KButton from '@/components/ui/kbutton.vue'
import Instrument from '@/classes/instrument'
import ZoneEditor from './ui/ZoneEditor.vue'

const newZone = dsInstrument.groups.zone
let zones = [ newZone ]
const kb = keyboard().data

const zoneEditor = ref(false)

const { globalState, localState, updateValues } = useStatefulComposable();

const store = globalState
const instrument = globalState.instrument

const addZone = async() => {
    // globalState.instrumentDS.groups[currentGroup].zones = new Instrument().CreateZone()
    const new_zone = new Instrument().Zone()
    console.log ( globalState.instrumentDS.groups[currentGroup.value] )
    globalState.instrumentDS.groups[currentGroup.value].zones = await [...globalState.instrumentDS.groups[currentGroup.value].zones, new_zone]
    console.log ( 'add zone', zones )
    const newZone = dsInstrument.groups.zone
    zones = [ ...zones, newZone ]
    // globalState.zone = newZone
    globalState.zoneEditor = true
    globalState.currentZone++
}

const currentGroup = ref(instrument.currentGroup)
const currentZone = ref(instrument.currentZone)
const stepNotes = ['rootNote','loNote','hiNote']
const setNote = async (noteNumber,octave,name) => {
    
    const g = instrument.currentGroup
    const z = instrument.currentZone
    
    const _zones = globalState.instrumentDS.groups[g].zones
    const stepNote = stepNotes[globalState.editorStep]
    
    _zones[z][stepNote].data.value = noteNumber
    _zones[z][stepNote].data.name = `${name}${octave-2}`



    if ( globalState.editorStep == 0) {
        zones[z].rootNote.data.value = noteNumber
        zones[z].rootNote.data.name = `${name}${octave-2}`

        // instrument.groups[g].zones[z].rootNote.data.value = noteNumber
        // instrument.groups[g].zones[z].rootNote.data.name = `${name}${octave-2}`
        // globalState.zone.root = noteNumber
        // globalState.zone.rootName = `${name}${octave-2}`
    }
    if ( globalState.editorStep == 1) {
        zones[z].loNote.data.value = noteNumber
        zones[z].loNote.data.name = `${name}${octave-2}`
        // instrument.groups[g].zones[z].loNote.data.value = noteNumber
        // instrument.groups[g].zones[z].loNote.data.name = `${name}${octave-2}`
        // globalState.zone.loNote = noteNumber
        // globalState.zone.loNoteName = `${name}${octave-2}`
    }
    if ( globalState.editorStep == 2) {
        zones[z].hiNote.data.value = noteNumber
        zones[z].hiNote.data.name = `${name}${octave-2}`
        // instrument.groups[g].zones[z].hiNote.data.value = noteNumber
        // instrument.groups[g].zones[z].hiNote.data.name = `${name}${octave-2}`
        // globalState.zone.hiNote = noteNumber
        // globalState.zone.hiNoteName = `${name}${octave-2}`
    }
    instrument.groups[g].zones[z] = zones
    
    console.log ( _zones )
}
const getColor = (k) => {
    
    // if ( globalState.zone ){
    //     if ( globalState.zone.root == k ){
    //         console.log ( k )
    //         return 'bg-red-400'
    //     }
    //     if ( k >= globalState.zone.loNote && k <= globalState.zone.hiNote ){
    //         return 'bg-blue-300'
    //     }
    // }
    // return 'bg-gray-200'
    const g = newZone //instrument.groups[currentGroup.value].zones[currentZone.value]
    // console.log ( g )
    if ( g ){
        if ( g.rootNote.data.value == k ){
            console.log ( k )
            return 'bg-red-400'
        }
        if ( k >= g.loNote.data.value && k <= g.hiNote.data.value ){
            return 'bg-blue-300'
        }
    }
    return 'bg-gray-200'
}
</script>

<template>
    <div class="p-8 w-5/6 m-auto">
        <!-- <div class="flex justify-left">
            <button class="py-1 px-2 bg-green-300 rounded text-xs hover:bg-black hover:text-white mr-2" @click="addZone">+Group</button>
            <button class="py-1 px-2 bg-green-300 rounded text-xs hover:bg-black hover:text-white mr-2">Save</button>
        </div>
        <h1>Decent Sampler - Mapping Editor</h1> -->

        
        <div class="flex justify-start bg-neutral-700 p-2 rounded-t-l rounded-t mt-1 border-b-2 border-black">
            <div class="bg-neutral-800 w-1/5 text-xs text-blue-500 px-4 py-2 min-h-6 rounded min-w-32 mr-2">
                Name: {{ store.instrument.name }}<br>
                Groups: {{ store.instrument.groups.length  }}
            </div> 
            <div class="w-3/5" @click="store.editorStep=-1,store.keyboard.message='Mode: Idle'">
                <div class="animate-pulse text-center bg-lime-400 text-sm text-black px-4 py-2 min-h-12 rounded min-w-32">♪ {{ store.instrument.name }} ♪ {{  store.keyboard.message  }}</div>
            </div>
            <div class="flex justify-end w-1/5 items-center">
                <k-button title="Groups" v-model="store.workflow" workflow="groups" icon="IconGroups"/>
                <k-button title="Add sample" v-model="store.workflow" workflow="sample" icon="IconWav" @click="store.zoneEditor=!store.zoneEditor"/>
                <!-- <k-button title="Add group" v-model="store.workflow" workflow="groupAdd" icon="IconGroupAdd"/> -->
                <button class="border hover:bg-blue-600 border-solid border-neutral-600 rounded mr-1" title="Add Sample"><IconWav /></button><button>C</button></div>
        </div>
        <!-- <Panels mode="group" v-if="store.currentZone > -1"/> -->
            <transition name="fade">
                <EditorControls mode="group" v-if="store.instrument.currentGroup > -1"/>
            </transition>
        <button class="text-xs btn-sm rounded mr-2" @click="addZone">Add Sample</button> {{ globalState.currentZone }}   
        <div class="px-2 pb-2 rounded-b bg-neutral-700 flex flex-col border-t-2 border-black shadow">
        <div class="relative max-w-screen w-full">
            <div class="keyboard flex border-1 relative">
                <template v-for="oct,i in kb.octaves">
                    <template v-for="note,index in kb.keys">
                        <div v-if="!kb.notes[index].includes('#')" :id="(i*kb.keys)+index" :class="'flex z-1 text-xs key_w h-20 border-r border-solid border-black text-black hover:bg-yellow-400 cursor-pointer items-end text-xs ' + getColor(((i*kb.keys)+index))" :title="kb.notes[index]" @click="setNote(((i*kb.keys)+index),i,kb.notes[index])">
                            <span v-if="index<1">
                                {{ kb.notes[index] }}{{ i-2 }}
                            </span>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <div class="relative max-w-screen w-full">
            <div class="keyboardB flex opacity-1 border-0" style="padding-left:3px;">
                <template v-for="oct,i in kb.octaves">
                    <template v-for="note,index in kb.keys">
                        <div v-if="!kb.notes[index].includes('#')" class="flex z-0 text-xs key_alpha h-12  cursor-pointer items-end text-xs"></div>
                        <div v-else :id="(i*kb.keys)+index" class="flex z-10 text-xs key_black h-12 border-r border-solid bg-gray-800 border-black text-black hover:bg-yellow-400 cursor-pointer items-end text-xs" :title="kb.notes[index]" @click="setNote(((i*kb.keys)+index),i,kb.notes[index])">
                        </div>
                    </template>
                </template>
            </div>
        </div>
        </div>
        <div class="bg-neutral-500 p-1 rounded" v-if="store.instrument.currentZone > -1 && store.zoneEditor">
            Mapping Editor
            <EditorControls mode="zone"/>
        </div>
        <!-- <Panels mode="sample"/> -->

        
            <!-- {{  panelsControls.group  }} -->
            <!-- <template v-for="panel in panelsControls.group">
                {{ panel.title  }}    
                <template v-for="control in panel.controls">
                    {{ store.instrument.groups[store.instrument.currentGroup].controls[control] }}
                </template>
            </template>

            <template v-for="panel in panelsControls.zone">
                {{ panel.title  }}
                <template v-for="control in panel.controls">
                    {{ store.instrument.groups[store.instrument.currentGroup].zones[store.instrument.currentZone][control] }}
                </template>
            </template> -->
        
    </div>
    <!-- <div class="p-8 w-5/6 m-auto text-black">
        <ZoneEditor v-if="globalState.zoneEditor"/>
    </div> -->
</template>

<style>
    .key_w { width: 40px; }
    .key_alpha { width:30px; background-color: transparent;}
    .key_black { width:40px; }
    .keyboardB { margin-top: -80px; }
</style>