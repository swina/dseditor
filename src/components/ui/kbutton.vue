<script setup>
import { ref, watchEffect } from "vue";
import Icon from '@/components/icons/Icon.vue'
import IconPiano from '@/components/icons/IconPiano.vue'
import IconGroups from '@/components/icons/IconGroups.vue'
import IconGroupAdd from '@/components/icons/IconGroupAdd.vue'
import IconWav from '@/components/icons/IconWav.vue'
import IconSave from '@/components/icons/IconSave.vue'

// define component props for the slider component
const { modelValue, action  }  = defineProps({
    label: {
        type: String,
        default: 'checkbox'
    },
    icon: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        defaul:24
    },
    small: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ''
    },
    workflow: {
        type: String,
        default: 'groups'
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


</script>
<template>
    <button @click="$emit('keyboard',modelValue)" :class="small?'h-6':'h-8'" class="border-0 w-8 h-8 flex items-center justify-center hover:bg-lime-600 border-solid border-neutral-600 rounded mr-1" :title="title">
        <slot></slot>
        <Icon :icon="icon" :size="size"/>
        <!-- <IconGroups v-if="icon=='IconGroups'"/>
        <IconWav v-if="icon=='IconWav'"/>
        <IconSave v-if="icon=='IconSave'"/> -->
        
        <!-- <component :is="icon" :component="icon"/> -->
    </button>
</template>