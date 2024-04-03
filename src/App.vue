<script setup>
import { Grid } from '@element-plus/icons-vue';
import { RouterView, useRouter } from 'vue-router';
const router = useRouter();
const gotoUrl = (name) => {
  if(!name){
    router.push('/')
  }else{
    router.push({name})
  }
}
</script>

<template>
  <div class="link">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon size="24"><Grid /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="gotoUrl('')">vueFormCreate</el-dropdown-item>
          <el-dropdown-item @click="gotoUrl('formDesign')">formDesign</el-dropdown-item>
          <el-dropdown-item @click="gotoUrl('vFormDesigner')">vFormDesigner</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <RouterView />
</template>

<style scoped>
.link{
  position: absolute;
  left: 0;
  top: 0;
  z-index:10;
}
</style>
