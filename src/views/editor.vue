<template>
    <ElementEditor :value="data" @update:value="updateData" ></ElementEditor>
    <el-button type="primary" @click="getHtml">获取数据</el-button>
</template>
<script setup>
import ElementEditor from '@/components/formDesign/element/elementEditor.vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const data = ref('测试数据')
const updateData = (val)=>{
    data.value = val;
}
const getHtml = ()=>{
    ElMessage({
        type: 'info',
        message: data.value,
    })
}
</script>