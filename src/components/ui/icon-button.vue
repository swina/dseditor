<script setup>
import { ref, watchEffect, defineAsyncComponent  } from "vue";
import IconPiano from '@/components/icons/IconPiano.vue'
import IconGroups from '@/components/icons/IconGroups.vue'
import IconGroupAdd from '@/components/icons/IconGroupAdd.vue'
import IconWav from '@/components/icons/IconWav.vue'
import Icon from '@/components/icons/Icon.vue'

// define component props for the slider component
const { modelValue, action, icon , classe }  = defineProps({
    label: {
        type: String,
        default: 'checkbox'
    },
    icon: {
        type: String,
        default: ''
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
    },
    classe :{
        type: String,
        default: 'bg-yellow-700'
    }
})

const components = {
    IconWav: defineAsyncComponent(() => import('@/components/icons/IconWav.vue'))
}

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
    <div :class="classe" class="flex items-center cursor-pointer rounded bg-yellow-700 pl-1" :title="title" @click="clicked=!clicked">
        <label  class="cursor-pointer bg-neutral-800 text-xs px-2 py-1 text-center"><slot></slot></label>
        <span :class="classe?classe:'bg-yellow-700'" class="rounded-r p-1"><Icon :icon="icon" size="15"/></span>
    </div>
</template>