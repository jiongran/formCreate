<template>
    <v-form-designer ref="vfdRef"></v-form-designer>
</template>

<script setup>
import { ref } from 'vue';
const vfdRef = ref(null)
</script>
<style>
.el-header.main-header{
    display: none !important;
}
</style>
