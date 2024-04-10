<template>
    <codeEditor  v-model:value="jsonEg" language="javascript" theme="chrome"></codeEditor>
</template>
<script setup>
import codeEditor from '@/components/formDesign/element/codeEditor.vue';
import { ref } from 'vue';
const defaultData = `"dev": "cross-env BASE_URL=xxx FILE_URL=xxx NODE_ENV=development nuxt dev",
"build": "cross-env BASE_URL=xxx FILE_URL=xxx NODE_ENV=production nuxt build",`
const jsonEg = ref(defaultData)

</script>