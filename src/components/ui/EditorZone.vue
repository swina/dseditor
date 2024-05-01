<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';
import DsRange from '@/components/ui/range.vue'
import DsCheckbox from '@/components/ui/checkbox.vue'
import DsInput from '@/components/ui/input.vue'

const { globalState, localState, updateValues } = useStatefulComposable();

const store = globalState
</script>

<template>
    <div class="text-white text-sm p-2 bg-neutral-700 rounded my-1">
    </div>
</template>