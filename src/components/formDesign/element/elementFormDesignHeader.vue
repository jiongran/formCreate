<template>
  <el-header class="btn-bar">
    <el-button v-if="$attrs.uploadJson" link @click="emit('uploadJson')">
      <template #icon>
        <SvgIcon name="upload" />
      </template>
      导入JSON
    </el-button>
    <el-button v-if="$attrs.clearable" link @click="emit('clearable')">
      <template #icon>
        <SvgIcon name="clearable" />
      </template>
      清空
    </el-button>
    <el-button v-if="$attrs.preview" link @click="emit('preview')">
      <template #icon>
        <SvgIcon name="preview" />
      </template>
      预览
    </el-button>
    <el-button v-if="$attrs.generateJson" link @click="emit('generateJson')">
      <template #icon>
        <SvgIcon name="generate-json" />
      </template>
      生成JSON
    </el-button>
    <el-button v-if="$attrs.generateCode" link @click="emit('generateCode')">
      <template #icon>
        <SvgIcon name="generate-code" />
      </template>
      生成代码
    </el-button>
  </el-header>
</template>

<script setup>
import SvgIcon from '@/components/svg-icon/index.vue';

const emit = defineEmits(['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode'])
</script>
