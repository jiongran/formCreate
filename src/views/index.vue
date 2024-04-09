<script setup>
import { useAppStore } from '@/store/app';
import { MoreFilled } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();
const list = reactive([
  {
    name:'myView',
    designName:'表单设计器',
    designUrl:'/design',
    viewName:'表单展示器',
    viewUrl:'/vueFormCreate'
  },
  {
    name:'vForm',
    designName:'表单设计器',
    designUrl:'/vFormDesign',
    viewName:'表单展示器',
    viewUrl:'/vFormCreate'
  },
  {
    name:'antdDesign',
    designName:'表单设计器',
    designUrl:'/antdDesignFormDesign',
    viewName:'表单展示器',
    viewUrl:'/antdDesignFormCreate'
  }
])

const goToUrl = (name) =>{
  router.push(name)
}

const tree = computed(()=>appStore.tree)
const editTree =()=>{
  ElMessageBox.prompt('请输入内容', '提示信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: appStore.tree
  })
    .then(({ value }) => {
      appStore.setTreeVal(value)
      ElMessage({
        type: 'success',
        message: `设置成功`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '输入取消',
      })
    })
}

</script>
<template>
  <div style="padding: 8px;">
    <el-row :gutter="20">
      <el-col :span="8" style="margin-bottom: 12px;" v-for="(item,index) in list" :key="index">
        <el-card style="max-width: 480px">
          <template #header>
            <div style="float: right;">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="el-icon--right">
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="goToUrl(item.designUrl)">{{ item.designName }}</el-dropdown-item>
                    <el-dropdown-item  @click="goToUrl(item.viewUrl)">{{ item.viewName }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            {{ item.name }}
          </template>
          <div>
            点击右上角进行体验
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  style="margin-bottom: 12px;">
        <el-card style="max-width: 480px">
          <template #header>
            store持久化与加密
          </template>
          <div>
            tree {{ tree}} <el-button type="primary" @click="editTree">修改值</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>