<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="左对齐" value="large">左对齐</el-radio-button>
          <el-radio-button label="右对齐" value="large">右对齐</el-radio-button>
          <el-radio-button label="顶部对齐" value="large">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="标签宽度">
        <el-input-number v-model.number="data.labelWidth" :min="0" />
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size">
          <el-radio-button label="大" value="large">大</el-radio-button>
          <el-radio-button label="默认" value="default">默认</el-radio-button>
          <el-radio-button label="小" value="small">小</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="隐藏必选标记">
        <el-switch v-model="data.hideRequiredAsterisk" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ElementFormDesignConfig',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ['update:config'],
  setup(props, context) {
    const data = ref(props.config)
    watch(data, () => context.emit('update:config', data))
    return {
      data
    }
  }
})
</script>