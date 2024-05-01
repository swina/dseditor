<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import { workflow } from '@/classes/workflow'
import { keyboard , getKeyColor } from '@/utils/keyboard.js'

const { globalState, localState, updateValues } = useStatefulComposable();

const instrumentDS = globalState.instrumentDS

const kb = keyboard().data

const getColor = (k) => {
    return getKeyColor ( k , workflow.currentZone() )
}

const mapNote = (k,octave,label,event) => {
    
    return workflow.mapNote ( k, octave, label, event )
}

</script>

<template>
    <div class="keyboard flex border-1 relative">
        <template v-for="oct,i in kb.octaves">
            <template v-for="note,index in kb.keys">
                <div v-if="!kb.notes[index].includes('#')" :id="(i*kb.keys)+index" :class="'flex z-1 text-xs key_w h-24 border-r border-solid border-black text-black hover:bg-yellow-400 cursor-pointer items-end text-xs ' + getColor(((i*kb.keys)+index))" :title="kb.notes[index]" @click="mapNote(((i*kb.keys)+index),i,kb.notes[index],$event)">
                    <span v-if="index<1">
                        {{ kb.notes[index] }}{{ i-2 }}
                    </span>
                </div>
            </template>
        </template>
    </div>
    <div class="relative max-w-screen w-full">
        <div class="keyboardB flex opacity-1 border-0" style="padding-left:3px;">
            <template v-for="oct,i in kb.octaves">
                <template v-for="note,index in kb.keys">
                    <div v-if="!kb.notes[index].includes('#')" class="flex z-0 text-xs key_alpha h-16  cursor-pointer items-end text-xs"></div>
                    <div v-else :id="(i*kb.keys)+index" :class="'flex z-10 text-xs key_black h-16 border-r border-l border-b border-solid bg-gray-800 border-black text-black hover:bg-yellow-400 cursor-pointer items-end text-xs ' + getColor(((i*kb.keys)+index))" :title="kb.notes[index]" @click="mapNote(((i*kb.keys)+index),i,kb.notes[index],$event)">
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<style scoped>
    .key_w { width: 40px; }
    .key_alpha { width:22px; background-color: transparent;}
    .key_black { width:40px; }
    .keyboardB { margin-top: -96px; }
</style>