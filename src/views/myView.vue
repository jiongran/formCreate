<template>
    <el-button type="primary" @click="handleClick">点击</el-button>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeMount, onMounted } from 'vue';
const channelName = "openView";
let listenChannel = null;

const handleClick =()=>{
    ElMessageBox.prompt('请输入内容', '提示信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: ''
  })
    .then(({ value }) => {
      listenChannel.postMessage(value)
      ElMessage({
        type: 'success',
        message: `设置成功,切换首页查看`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '输入取消',
      })
    })
}

const closeChannel =()=>{
  if(listenChannel){
    listenChannel.close()
  }
}

const beforeunloadHandler =()=>{
  channelPostMessage('closeChannel')
  closeChannel()
}

onMounted(() => {
    listenChannel = new BroadcastChannel(channelName);
    window.addEventListener('beforeunload', e => beforeunloadHandler(e))
})

onBeforeMount(() => {
  closeChannel()
  listenChannel = null
})

</script>