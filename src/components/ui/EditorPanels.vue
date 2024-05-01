<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import DsRange from '@/components/ui/range.vue'
import DsCheckbox from '@/components/ui/checkbox.vue'
import DsZoneInput from '@/components/ui/zone-input.vue'

const { globalState, localState, updateValues } = useStatefulComposable();

const store = globalState

const { mode } = defineProps({
    mode :{
        type: String,
        default: 'group'
    }
})

const panelMode = ref(mode)
const panels = store.panels[panelMode.value]

const setKeyboardMode = (params)=> {
    store.editorStep = params
    const msg = params == 0 ? 'Root Note' : params == 1 ? 'Lo Note' : params == 2 ? 'Hi Note' : ''
    if ( msg ) store.keyboard.message = 'Mode: set ' + msg
    console.log ('setting keyboard mode', params )
}

</script>


<template>
    <div class="text-white text-sm p-2 bg-neutral-700 rounded my-1">
        {{ panels.title }}
        <div class="flex p-2 bg-neutral-600 rounded my-1">
            <template v-if="panels.controls" v-for="panelControl in panels.controls">
                <ds-range v-if="panelControl.ref.type == 'range'" :label="panelControl.label" :min="panelControl.ref.min" :max="panelControl.ref.max" v-model="panelControl.ref.default" class="mr-2"/>
                <ds-checkbox v-if="panelControl.ref.type == 'checkbox'" :label="panelControl.label" v-model="panelControl.ref.default" class="mr-2"/>
            </template>
            <div class="flex justify-between w-full">
                <template v-if="panels.panels" v-for="panel in panels.panels">
                    <div class="flex flex-col">{{ panel.title  }}
                        <template v-if="panel.controls" v-for="panelControl in panel.controls" >
                            <ds-range v-if="panelControl.ref.type == 'range'" :label="panelControl.label" :min="panelControl.ref.min" :max="panelControl.ref.max" v-model="panelControl.ref.default" class="mb-1"/>
                            <ds-checkbox v-if="panelControl.ref.type == 'checkbox'" :label="panelControl.label" v-model="panelControl.ref.default" class="ml-2 mb-1"/>
                            <ds-zone-input type="text" v-if="panelControl.ref.type=='zone-input'" :label="panelControl.label"  v-model="panelControl.ref.default" :keyNote="store.zone[panelControl.ref.action]" class="mb-1" @keyboard="setKeyboardMode"/>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <!-- <template v-for="panel in panels">
            <div class="bg-neutral-700 rounded my-2 p-4">
                <div class="capitalize">{{ panel }}</div>
                <template v-for="k in Object.keys(store.panels[panel])">
                        <template v-if="getObject(k,panel)" v-for="control in getObject(k,panel)">
                            <pre>
                                {{ control }}
                            </pre>
                        </template>
                </template>
            </div>
        </template> -->
    </div>
</template>