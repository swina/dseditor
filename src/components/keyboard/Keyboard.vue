<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import { keyboard , whichNote } from '@/utils/keyboard.js'
import { workflow } from '@/classes/workflow'
import WhiteKeyboard from './WhiteKeys.vue'
import KButton from '@/components/ui/kbutton.vue'
import IconButton from '@/components/ui/icon-button.vue'
import Display from '@/components/display/Display.vue'
import DsChip from '@/components/ui/chip.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Knob from 'primevue/knob';
import PanelControls from '@/components/controls/PanelControls.vue'

const { globalState, localState, updateValues } = useStatefulComposable();

console.log ( workflow )
// const { addGroupZone } = workflow()

const store = globalState
const instrument = globalState.instrumentDS

const currentGroup = globalState.currentGroup
const currentZone = globalState.currentZone

const instrumentDS = ref(globalState.instrumentDS)

const setZoneNote = async (noteNumber,octave,name) => {
    
    const _zones = globalState.instrumentDS.groups[currentGroup.value].zones
    const stepNote = instrument.stepNotes[globalState.editorStep]
   
    _zones[z][stepNote].data.value = noteNumber
    _zones[z][stepNote].data.name = `${name}${octave-2}`
}

const value = ref(20)

</script>

<template>
    <div class="p-8 w-5/6 m-auto">
        <div class="relative max-w-screen w-full">
            <div class="flex w-full p-2 bg-neutral-700 rounded-t my-1 justify-around">
                <div class="w-1/5 mr-1">
                    <div class="bg-neutral-800 w-full rounded p-2 min-h-12 text-xs text-blue-400">
                        {{ instrumentDS.name }}<br>
                        Groups: {{ instrumentDS.groups.length }}
                    </div>
                </div>
                <div class="w-3/5">
                    <Display/>
                </div>
                <label class="w-1/5 flex items-center justify-center logoFont text-xs bg-neutral-800 rounded p-1 ml-1">M O O D G I V E R</label>
            </div>
            <transition name="fade">
                <div class="flex flex-wrap p-2 bg-neutral-700 my-1 justify-around">
                    <icon-button icon="mixer" :classe="instrumentDS.workflow.panel=='group'?'bg-purple-700':''" title="Group settings" @click="workflow.setControls('group')">Group</icon-button>
                    <icon-button icon="mixer" :classe="instrumentDS.workflow.panel=='sample'?'bg-purple-700':''" title="Sample settings" @click="workflow.setControls('sample')">Sample</icon-button>
                    <icon-button icon="piano" title="Map a new zone" @click="workflow.addGroupZone()">Add Zone</icon-button>
                    <icon-button icon="mixer" title="Advanced config">Advanced</icon-button>
                    <icon-button icon="groups" title="Groups">Groups</icon-button>
                </div>
            </transition>
            
                <PanelControls class="p-2" :context="instrumentDS.workflow.panel" v-if="instrumentDS.workflow.panel"/>
            
            <div class="px-2 pb-2 rounded-b bg-neutral-700 flex flex-col border-t-2 border-black shadow">
                <WhiteKeyboard/>
                
            </div>
            <ul class="text-xs text-neutral-500 p-2">
                    <li>Root note <ds-chip>click</ds-chip> on a note</li>
                    <li>Low note <ds-chip>Ctrl + click</ds-chip> on a note</li>
                    <li>High note <ds-chip>Ctrl + Shift + click</ds-chip> on a note</li>
                </ul>
        </div>
    </div>
    <Dialog/>
    <!-- <Knob v-model="value" size="40" textColor="White" valueColor="Gray" rangeColor="LightGray" strokeWidth="15"/> -->
    <!-- <button class="btn-sm bg-primary-200" @click="workflow.addGroupZone()">ADD MAP</button>
    <button class="btn-sm" @click="workflow.mapNote(26,2,'D')">ADD NOTE ROOT</button>
    <button class="btn-sm" @click="instrumentDS.workflow.noteStep++,workflow.mapNote(24,2,'C')">ADD NOTE LO</button>
    <button class="btn-sm" @click="instrumentDS.workflow.noteStep++,workflow.mapNote(27,2,'D#')">ADD NOTE HI</button> -->
    <pre>
    {{ instrumentDS.workflow.noteStep }}
    <template v-for="zone,n in instrumentDS.groups[0].zones">
        [{{n}}] {{ zone.volume.default }}
    </template>
    {{  instrumentDS.groups[0].zones[0].rootNote.data }}
    {{  instrumentDS.groups[0].zones[0].loNote.data }}
    {{  instrumentDS.groups[0].zones[0].hiNote.data }}
    Instrument: {{ instrumentDS }}
    Group: {{ instrumentDS.workflow.currentGroup }}
    Zone: {{ instrumentDS.workflow.currentZone }}
    </pre>

</template>