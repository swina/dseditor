<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import IconMixer from '@/components/icons/IconMixer.vue'
import { panelsControls } from '@/utils/ds.settings.js'
import DsRange from '@/components/ui/range.vue'
import DsCheckbox from '@/components/ui/checkbox.vue'
import DsZoneInput from '@/components/ui/zone-input.vue'

const { globalState, localState, updateValues } = useStatefulComposable();

const store = globalState.instrument // globalState

const { mode } = defineProps({
    mode :{
        type: String,
        default: 'zone'
    }
})

const currentGroup = ref(store.currentGroup)
const currentZone = ref(store.currentZone)


const controls =  ref( {
        group: store.groups[currentGroup.value].controls,
        zone: store.groups[currentGroup.value]?.zones ? store.groups[currentGroup.value]?.zones[currentZone.value] : []
    }
)

const setKeyboardMode = (params)=> {
    globalState.editorStep = params
    const msg = params == 0 ? 'Root Note' : params == 1 ? 'Lo Note' : params == 2 ? 'Hi Note' : ''
    if ( msg ) globalState.keyboard.message = 'Mode: set ' + msg
    console.log ('setting keyboard mode', params )
}

if ( mode == 'group' ){
    if ( store.currentGroup > -1) {
        globalState.keyboard.message = `Group ${store.currentGroup+1} Settings`
    } else {
        globalState.keyboard.message = ''
    }
} 

const addZone = ()=>{
    store.groups[currentGroup.value].zones = [ ...store.groups[currentGroup.value].zones , globalState.dsInstrument.groups.zone ]
    store.currentZone++
}

const copyZone = ()=>{
    store.groups[currentGroup.value].zones = [ ...store.groups[currentGroup.value].zones , store.groups[currentGroup.value].zones[currentZone.value] ]
    store.currentZone++
}
 
</script>

<template>
    <div class="flex flex-col p-4 bg-neutral-700 relative">
        <div class="flex" v-if="mode=='zone'">
            <!-- <label class="bg-red-800 px-1 rounded mr-2">{{ `Zone ${store.currentZone+1}` }} </label> -->
            <select v-model="store.currentZone" class="bg-red-700 mr-2 text-sm">
                <template v-for="zone,index in store.groups[currentGroup].zones">
                    <option :value="index">Zone {{ index+1 }}</option>
                </template>
            </select>
            <button class="text-xs btn-sm rounded mr-2" @click="addZone">Add</button>
            <button class="text-xs btn-sm rounded mr-2" @click="copyZone">Duplicate</button>
        </div>
        <template v-for="panel in panelsControls[mode]">
            <span class="p-1 text-xs">{{ panel.title }}</span>
            <div class="flex justify-between p-1 bg-neutral-800 rounded">
            <template v-for="control in panel.controls">

                <ds-range 
                    v-if="controls[mode][control].type == 'range'" 
                    :label="controls[mode][control].label" 
                    :min="controls[mode][control].min" 
                    :max="controls[mode][control].max" 
                    v-model="controls[mode][control].default" class="mb-1"/>

                <ds-checkbox 
                    v-if="controls[mode][control].type == 'checkbox'" 
                    :label="controls[mode][control].label" 
                    v-model="controls[mode][control].default" class="ml-2 mb-1"/>

                <ds-zone-input 
                    type="text" 
                    v-if="controls[mode][control].type=='zone-input'" 
                    :label="controls[mode][control].label"  
                    v-model="controls[mode][control].default" 
                    :keyNote="controls[mode][control].data.name" class="mb-1" @keyboard="setKeyboardMode"/>

                <input type="text" v-model="controls[mode][control].default" v-if="controls[mode][control].type =='file'" :label="controls[mode][control].label" :placeholder="controls[mode][control].default"/>

                <div class="text-xs" v-if="controls[mode][control].type =='int'">
                    <label class="mr-2">{{ controls[mode][control].label }}</label>
                    <input type="number" v-model="controls[mode][control].default"  :label="controls[mode][control].label" class="w-10" :placeholder="controls[mode][control].default"/>
                </div>

                <div class="text-xs" v-if="controls[mode][control].type =='select'">
                    <label class="mr-2">{{ controls[mode][control].label }}</label>
                    <select type="number" v-mode="controls[mode][control].default" class="bg-neutral-700"  :label="controls[mode][control].label">
                        <template v-for="option in controls[mode][control].values">
                            <option value="{{option}}">{{ option }}</option>
                        </template>
                    </select>

                </div>
            </template>
            </div>
        </template>
        <!-- <template v-for="panel in panelsControls[mode]" v-if="mode=='zone'">
            {{ panel.title  }}    
            <template v-for="control in panel.controls">
                {{ store.groups[currentGroup].zones[currentZone].controls[control] }}
            </template>
        </template> -->
    </div>
</template>