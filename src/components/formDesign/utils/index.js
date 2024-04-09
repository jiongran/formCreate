import { antdStr, htmlStr, vueStr } from '../config/const.js'

// 验证是否外部地址
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  
  // 复制文本
  export function copy(text) {
    const input = document.createElement('textarea')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  
  export function generateCode( widgetForm, codeType, platformType){
    if (codeType === vueStr) {
        return `<template>
      ${
        platformType === antdStr
          ? `<antd-generate-form ref="generateFormRef" :data="widgetForm">
      </antd-generate-form>
      <a-button type="primary" @click="handleSubmit">提交</a-button>`
          : `<el-generate-form ref="generateFormRef" :data="widgetForm">
      </el-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>`
      }
    </template>
    
    <script>
    import { defineComponent, reactive, toRefs } from 'vue'
    
    export default defineComponent({
      setup() {
        const state = reactive({
          generateFormRef: null,
          widgetForm: ${JSON.stringify(widgetForm)}
        })
    
        const handleSubmit = () => {
          state.generateFormRef.getData().then(data => {
            console.log(data)
            // data success
            // data 表单数据
          }).catch(error => {
            // data failed
          })
        }
    
        return {
          ...toRefs(state),
          handleSubmit
        }
      }
    })
    </script>
        `
      }
      if (codeType === htmlStr) {
        return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        ${
          platformType === antdStr
            ? '<link rel="stylesheet" href="https://unpkg.com/ant-design-vue@next/dist/antd.min.css" />'
            : '<link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css" />'
        }
      </head>
      <body>
        <div id="app">
          ${
            platformType === antdStr
              ? `<antd-generate-form ref="generateFormRef" :data="widgetForm">
          </antd-generate-form>
          <a-button type="primary" @click="handleSubmit">提交</a-button>`
              : `<el-generate-form ref="generateFormRef" :data="widgetForm">
          </el-generate-form>
          <el-button type="primary" @click="handleSubmit">提交</el-button>`
          }
        </div>
        <script src="https://unpkg.com/vue@next/dist/vue.global.prod.js"></script>
        <script src="https://unpkg.com/vue-form-create/dist/formCreate.umd.min.js"></script>
        <script src="https://unpkg.com/ace-builds/src-noconflict/ace.js"></script>
        ${
          platformType === antdStr
            ? `<script src="https://unpkg.com/moment/moment.js"></script>
        <script src="https://unpkg.com/ant-design-vue@next/dist/antd.min.js"></script>`
            : '<script src="https://unpkg.com/element-plus/lib/index.full.js"></script>'
        }
        <script>
          const { createApp, reactive, toRefs } = Vue
    
          createApp({
            setup() {
              const state = reactive({
                generateFormRef: null,
                widgetForm: ${JSON.stringify(widgetForm)}
              })
          
              const handleSubmit = () => {
                state.generateFormRef.getData().then(data => {
                  console.log(data)
                  // data success
                  // data 表单数据
                }).catch(error => {
                  // data failed
                })
              }
          
              return {
                ...toRefs(state),
                handleSubmit
              }
            }
          })
          .use(${platformType === antdStr ? 'antd' : 'ElementPlus'})
          .use(formCreate)
          .mount('#app')
        </script>
      </body>
    </html>
        `
      }
  }