
<script setup>
defineProps ({
    icon: ''
})
defineOptions({
    inheritAttrs: false
  })
</script>
<template>
    
    <svg :width="$attrs.size?$attrs.size+'px':'24px'" :height="$attrs.size?$attrs.size+'px':'24px'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs></defs><path class="a" d="M3.5,25.018h9.8767l2.2775-10.9731,2.2775,20.1622L20.2092,9.0623l2.2775,29.8754L24.7642,9.1925,27.0417,36.428l2.2775-25.4062L31.5967,29.778l2.2775-16.2172,2.2775,11.3627H44.5"></path></g></svg>

</template>