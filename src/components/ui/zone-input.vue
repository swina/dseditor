<script setup>
import { ref, watchEffect } from "vue";
import IconPiano from '@/components/icons/IconPiano.vue'
// define component props for the slider component
const { modelValue, action, keyNote , label}  = defineProps({
    label: {
        type: String,
        default: 'checkbox'
    },
    action: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Boolean,
        default: true
    },
    keyNote:{
        type: String,
        default: '-'
    }
})

// define emits for the checkbox component
const emit = defineEmits(["keyboard:modelValue"]);

const _componentValue = ref(modelValue)
const _componentAction = ref(action)
const _component = ref(null)

watchEffect(() => {
    if ( _component.value ){
        emit("keyboard:modelValue", _componentValue.value);
    }
})

let keyHelp = ''
if ( label == 'Lo Note' ) {
    keyHelp = 'Ctrl + '
}
if ( label == 'Hi Note' ){
    keyHelp = 'Ctrl + Shift + '
}

const tooltip = keyHelp + 'mouse click on the key of the keyboard to select the ' + label

</script>

<template>
    <div class="flex items-center px-1 cursor-pointer" :class="class" :title="tooltip">
        <div class="text-xs bg-neutral-800 p-1 mr-2 w-20 rounded">{{ label  }} </div>
        <div class="text-xs text-center bg-yellow-700 p-1 mr-2 w-10 rounded">{{ keyNote  }} </div>
        <button @click="$emit('keyboard',modelValue)" class="focus:bg-blue-400" :title="tooltip"><IconPiano /></button>
    </div>
</template>