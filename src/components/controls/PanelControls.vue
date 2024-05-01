<script setup>
import { ref , watch } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import Instrument from '@/classes/instrument'
import { workflow } from '@/classes/workflow'
import IconButton from '@/components/ui/icon-button.vue'
import DsRange from '@/components/ui/range.vue'
import DsZoneInput from '@/components/ui/zone-input.vue'
import DsTextInput from '@/components/ui/text-input.vue'
import DsCheckbox from '@/components/ui/checkbox.vue'

const { globalState, localState, updateValues } = useStatefulComposable();

const props = defineProps(["context"])
const instrument = globalState.instrumentDS


// const contextControls = new Instrument().Panels()[props.context]
// const contextControls = workflow.controlPanel(props.context)
let instrumentControls = workflow.contextControls(props.context)

console.log ( "Panels => " , instrumentControls )




// let filteredControls

// const filterPanel = () =>{
//     // instrumentControls = workflow.currentZone()
//     instrumentControls = workflow.contextControls()[props.context]
//     filteredControls = contextControls.map ( context => {
//         return context.controls.map ( control => { 
//             return instrumentControls[control]
//         })
//     }) 
// }

watch ( () => globalState.instrumentDS.workflow.currentZone , () => {
    instrumentControls = workflow.contextControls(props.context)
})

watch ( () => props.context , () => {
    instrumentControls = workflow.contextControls(props.context)
})

// filterPanel()
let filteredControls = false


</script>

<template>
    <div class="flex flex-col bg-gradient-to-t from-neutral-800 to-neutral-700 border-b-2" v-if="instrumentControls" :key="globalState.instrumentDS.workflow.currentZone">
        <!-- <label class="capitalize">{{ context }}</label> -->
        <template v-for="panel in instrumentControls">
            <div class="flex flex-col mt-1">
                <div>
                    <div class="w-20 max-w-20 text-xs bg-neutral-600 p-1 rounded-t text-neutral-400">{{ panel.name }}</div>
                </div>
                <div class="flex items-center flex-wrap justify-between rounded border border-neutral-600 py-6 px-2">
                <template v-for="control in panel.controls">
                    
                    <ds-range 
                        v-if="control.type=='range'"
                        :label="control.label" 
                        :min="control.min" 
                        :max="control.max" 
                        :step="control?.step?control.step:1"
                        v-model="control.default" class="mb-1"/> 
                        
                    <ds-checkbox 
                        v-if="control.type == 'checkbox'" 
                        :label="control.label" 
                        v-model="control.default" class="ml-2 mb-1"/>

                    <ds-zone-input 
                        v-if="control.type=='note-input'" 
                        :label="control.label"  
                        v-model="control.default" 
                        :keyNote="control.data.name" class="mb-1" @keyboard="setKeyboardMode"/>
                    
                    <ds-text-input 
                        v-if="control.type=='input' || control.type == 'number'" 
                        :type="control.type"
                        :label="control.label"
                        :placeholder="control.default" 
                        v-model="control.default"/>
                    
                    <div v-if="control.type=='select'" class="text-xs text-neutral-500">
                        {{ control.label }} <select v-model="control.default" class="text-sm bg-neutral-900 rounded ml-2">
                            <template v-for="option in control.options">
                                <option :value="option">{{ option }}</option>
                            </template>
                        </select>
                    </div>

                </template>
                </div>
            </div> 
        </template>
    </div>
    <!-- </template> -->
</template>