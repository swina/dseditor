<script setup>
// defineProps ({
//     size,
//     color
// })
defineOptions({
    inheritAttrs: false
  })
</script>
<template>
    <label :title="$attrs.title" class="bg-neutral-800 px-1 rounded mr-1 cursor-pointer" :class="$attrs.css" @click="$emit('click')"><slot></slot></label>
</template>