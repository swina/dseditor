<script setup>
import { ref, watchEffect } from "vue";

// define component props for the slider component
const { modelValue  }  = defineProps({
    label: {
        type: String,
        default: 'checkbox'
    },
    modelValue: {
        type: Boolean,
        default: true
    }
})

// define emits for the checkbox component
const emit = defineEmits(["update:modelValue"]);

const _componentValue = ref(modelValue)
const _component = ref(null)
let _checked = ''

if ( _componentValue ) _checked = 'checked'
watchEffect(() => {
    if ( _component.value ){
        emit("update:modelValue", _componentValue.value);
    }
})
</script>

<template>
    <div class="flex items-center bg-neutral-800 rounded mx-2 px-2" :class="class">
        <div class="text-xs p-1 w-20 rounded">{{ label  }} </div>
        <input type="checkbox" :checked="_componentValue" class="text-xl"/>
    </div>
</template>