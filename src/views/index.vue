<script setup>
import { useAppStore } from '@/store/app';
import { retrieveMapFromStorage } from '@/utils/storage';
import { MoreFilled } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();
const postMessageStr = ref('');
const openTime = ref(1);
const map = retrieveMapFromStorage('mapStorage');
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
  const resolve = router.resolve({
    name
  })
  try {
    map.set('page' + openTime.value, window.open(resolve.href, "_blank"))
    if (openTime.value === 1) {
      appStore.setOpenTime(2)
    } else {
      appStore.setOpenTime(1)
    }
    map.get('page' + openTime.value).close()
  } catch (error) {

  }
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

const channelName = "openView";
let listenChannel = null;
// 关闭通道
const closeChannel = () => {
  if (listenChannel) listenChannel.close();
}
// 创建通道
const createChannel = () => {
    listenChannel = new BroadcastChannel(channelName);
    if (listenChannel) {
        listenChannel.onmessage = (res) => {
          console.log('res',res)
          postMessageStr.value = res.data
            //关闭通道
            // if (res.data == 'closeChannel') {
            //     closeChannel();
            // } else if(res.data == 'updateChannel'){

            // }
        }
    }
}

onMounted(()=>{
  if (!listenChannel) {
    createChannel()
  }
})

onBeforeMount(() => {
  closeChannel()
  listenChannel = null
})

</script>
<template>
  <div style="padding: 8px;">
    <el-row :gutter="20">
      <el-col :span="8" class="mb-10" v-for="(item,index) in list" :key="index">
        <el-card class="normal-card">
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
                    <el-dropdown-item>
                        <router-link :to="item.designUrl" target="_blank">{{ item.designName }}</router-link> 
                      </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link :to="item.viewUrl" target="_blank">{{ item.viewName }}</router-link> 
                    </el-dropdown-item>
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
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            只打开一次窗口（暂用方案）
          </template>
          <div>
            <el-button type="primary" link size="small" @click="goToUrl('myView')">前往打开</el-button>  新窗口输入内容：{{ postMessageStr }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            vite vue3 ace编辑器配置
          </template>
          <div>
            <router-link to="/vueAceEditor" target="_blank">前往使用</router-link> 
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            nuxt(环境打包配置)
          </template>
          <div>
            <router-link to="/nuxt" target="_blank">前往使用</router-link> 
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            富文本编辑器
          </template>
          <div>
            <router-link to="/editor" target="_blank">前往使用</router-link> 
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            音乐播放器
          </template>
          <div>
            <router-link to="/music" target="_blank">前往使用</router-link> 
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            store持久化与加密
          </template>
          <div>
            tree {{ tree}} <el-button type="primary" size="small" @click="editTree">修改值</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"  class="mb-10">
        <el-card class="normal-card">
          <template #header>
            文件上传
          </template>
          <div>
            开发中。。。
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}
.normal-card {
  max-width: 480px
}
</style>"