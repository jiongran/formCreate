<template>
    <codeEditor  v-model:value="jsonEg" language="vue" theme="github"></codeEditor>
</template>
<script setup>
import codeEditor from '@/components/formDesign/element/codeEditor.vue';
import { ref } from 'vue';
const defaultData = `<template>
  <div ref="aceRef" class="defaultWidth"  style="height: 350px;"></div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/mode-vue'
import 'ace-builds/src-noconflict/theme-github'
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue"
export default defineComponent({
  name: 'CodeEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    theme: {
      tyle: String,
      default: 'github'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    isAuto: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:value'],
  setup(props, context) {
    const state = reactive ({
      aceRef: undefined,
      codeEditor: undefined
    })

    onMounted(() => {
      state.codeEditor = ace.edit(state.aceRef, {
        value: props.value,
        readOnly: props.readonly,
        theme: "ace/theme/github",
        mode: "ace/mode/vue",
        enableSnippets: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        maxLines: 50, // 最大行数，超过会自动出现滚动条
        minLines: 30, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 14, // 编辑器内字体大小
        tabSize: 4, // 制表符设置为 4 个空格大小
        useWorker: false,
      })

      state.codeEditor.on('change', () =>
        context.emit('update:value', state.codeEditor?.getValue())
      )
    })

    watch(
      () => props.value,
      val => {
        if (state.codeEditor) {
          const currentPosition = state.codeEditor?.selection.getCursor()
          state.codeEditor.setValue(val)
          state.codeEditor.clearSelection()
          state.codeEditor.gotoLine(
            currentPosition.row + 1,
            currentPosition.column,
            true
          )
        }
      }
    )

    return {
      ...toRefs(state)
    }
  }
})
<\/script>
<style lang="scss" scoped>
.defaultHeight{
  height:  350px;
}
.autoHeight{
  height: 100%;
}
.defaultWidth{
  width: 100%;
}
</style>`
const jsonEg = ref(defaultData)

</script>