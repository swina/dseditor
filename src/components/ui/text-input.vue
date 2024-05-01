<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props  = defineProps({
    label: {
        type: String,
        default: 'input'
    },
    modelValue: {
        type: Boolean,
        default: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    hint: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
})

// define emits for the checkbox component
const emit = defineEmits(["update:modelValue"]);

const handleInput = (event) => {
    emit ( 'update:modelValue' , event.target.value )
}


</script>

<template>
    <div class="flex items-center px-1 cursor-pointer" :class="class">
        <div class="text-neutral-500 text-xs p-1 mr-2 w-20 rounded">{{ props.label  }} </div>
        <input :type="type=='number'?type:'text'" 
            :placeholder="props.placeholder" 
            :class="type=='number'?'w-20':'w-64'" class="text-sm bg-neutral-800 border-0 rounded" 
            :value="props.modelValue" @input="handleInput">
    </div>
</template>