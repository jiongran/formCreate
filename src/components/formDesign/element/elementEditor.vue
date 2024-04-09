<template>
    <div style="width: 100%; height:  350px;">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: calc(100% - 120px); overflow-y: hidden;" v-model="modelData" @onChange="editorChange":defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
    </div>
  </template>
  
  <script >
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';
import { debounce } from 'lodash-es';
import { defineComponent, onBeforeUnmount, onMounted, reactive, shallowRef, toRefs } from 'vue';
  
  export default defineComponent({
    name: 'ElementEditor',
    components:{
        Editor,
        Toolbar
    },
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    emits: ['update:value'],
    setup(props, context) {
      const state = reactive ({
        toolbarConfig:{
          excludeKeys: ['fullScreen', 'insertImage', 'insertVideo']
        },
        modelData: props.value,
        editorConfig:{
          placeholder: '请输入内容...'
        },
        mode:'default',
        editorRef:shallowRef()
      })
  
      onMounted(() => {
       
      })
  
      onBeforeUnmount(()=>{
        const editor = state.editor
        if (editor == null) return
        editor.destroy()
      })

      // watch(
      //   () => props.value,
      //   val => {
      //     if (state.codeEditor) {
      //       context.emit('update:value', val)
      //     }
      //   }
      // )

      const handleCreated = (editor)=>{
        state.editorRef = editor
      }
      
        const editorChange = debounce(()=>{
          context.emit('update:value', state.editorRef.getHtml())
        },500)

      return {
        ...toRefs(state),
        editorChange,
        handleCreated
      }
    }
  })
  </script>