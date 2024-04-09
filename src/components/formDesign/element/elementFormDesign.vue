<template>
  <div class="my-el-style">
    <el-container class="my-el-container">
      <el-main class="my-el-main">
        <el-container>
          <el-aside width="250px">
            <div class="components">
              <ComponentGroup title="基础字段" :fields="basicFields" :list="basicComponents" />
              <ComponentGroup title="高级字段" :fields="advanceFields" :list="advanceComponents" />
              <ComponentGroup title="布局字段" :fields="layoutFields" :list="layoutComponents" />
            </div>
          </el-aside>
          <el-main class="center-container">
            <ElCustomHeader v-bind="$props" @preview="() => (previewVisible = true)"
              @uploadJson="() => (uploadJsonVisible = true)" @generateJson="handleGenerateJson"
              @generateCode="handleGenerateCode" @clearable="handleClearable">
              <slot name="header"></slot>
            </ElCustomHeader>
            <el-main :class="{ 'widget-empty': widgetForm.list }">
              <ElWidgetForm ref="widgetFormRef" v-model:widgetForm="widgetForm"
                v-model:widgetFormSelect="widgetFormSelect" />
            </el-main>
          </el-main>
          <el-aside class="widget-config-container" width="300px">
            <el-container>
              <el-header>
                <div class="config-tab" :class="{ active: configTab === 'widget' }" @click="configTab = 'widget'">
                  字段属性
                </div>
                <div class="config-tab" :class="{ active: configTab === 'form' }" @click="configTab = 'form'">
                  表单属性
                </div>
              </el-header>
              <el-main class="config-content">
                <ElWidgetConfig v-show="configTab === 'widget'" v-model:select="widgetFormSelect" />
                <ElFormConfig v-show="configTab === 'form'" v-model:config="widgetForm.config" />
              </el-main>
            </el-container>
          </el-aside>
        </el-container>
      </el-main>

      <el-dialog v-model="uploadJsonVisible" title="导入JSON" :width="800">
        <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可" style="margin-bottom: 10px" />
        <CodeEditor v-model:value="jsonEg" language="json" />
        <template #footer>
          <el-button @click="() => (uploadJsonVisible = false)">取消</el-button>
          <el-button type="primary" @click="handleUploadJson">导入</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="previewVisible" title="预览" :width="800">
        <ElGenerateForm ref="generateFormRef" :data="widgetForm" />
        <template #footer>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleGetData">获取数据</el-button>
        </template>

        <el-dialog v-model="dataJsonVisible" title="获取数据" :width="800">
          <CodeEditor :value="dataJsonTemplate" language="json" readonly />

          <template #footer>
            <el-button @click="() => (dataJsonVisible = false)">取消</el-button>
            <el-button type="primary" @click="handleCopyClick(dataJsonTemplate)">Copy</el-button>
          </template>
        </el-dialog>
      </el-dialog>

      <el-dialog v-model="generateJsonVisible" title="生成JSON" :width="800">
        <CodeEditor :value="generateJsonTemplate" language="json" readonly />

        <template #footer>
          <el-button @click="() => (generateJsonVisible = false)">取消</el-button>
          <el-button type="primary" @click="handleCopyClick(generateJsonTemplate)">Copy</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="dataCodeVisible" title="生产代码" :width="800">
        <el-tabs type="card" v-model="codeLanguage" :tabBarStyle="{ margin: 0 }">
          <el-tab-pane label="Vue Component" :name="vueStr">
            <CodeEditor :value="dataCodeTemplate" language="html" readonly />
          </el-tab-pane>
          <el-tab-pane label="HTML" :name="htmlStr">
            <CodeEditor :value="dataCodeTemplate" language="html" readonly />
          </el-tab-pane>
        </el-tabs>

        <template #footer>
          <el-button @click="() => (dataCodeVisible = false)">取消</el-button>
          <el-button type="primary" @click="handleCopyClick(dataCodeTemplate)">Copy</el-button>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { defaultsDeep } from 'lodash-es'
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { elementStr, htmlStr, vueStr } from '../config/const'
import { advanceComponents, basicComponents, widgetForm as defaultWidgetForm, layoutComponents } from '../config/element'
import { copy, generateCode } from '../utils'
import CodeEditor from './codeEditor.vue'
import ComponentGroup from './componentGroup.vue'
import ElFormConfig from './elementFormDesignConfig.vue'
import ElGenerateForm from './elementFormDesignGenerate.vue'
import ElCustomHeader from './elementFormDesignHeader.vue'
import ElWidgetConfig from './elementWidgetConfig.vue'
import ElWidgetForm from './elementWidgetForm.vue'

export default defineComponent({
  name: 'ElementFormDesign',
  components: {
    ElCustomHeader,
    ComponentGroup,
    CodeEditor,
    ElWidgetForm,
    ElGenerateForm,
    ElWidgetConfig,
    ElFormConfig
  },
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: true
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    uploadJson: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    basicFields: {
      type: Array,
      default: () => [
        'input',
        'password',
        'textarea',
        'number',
        'radio',
        'checkbox',
        'time',
        'date',
        'rate',
        'select',
        'switch',
        'slider',
        'text'
      ]
    },
    advanceFields: {
      type: Array,
      default: () => ['img-upload','echarts-line', 'echarts-bar', 'richtext-editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid']
    },
  },
  setup() {
    const state = reactive({
		basicComponents,
      advanceComponents,
      layoutComponents,
      vueStr,
      htmlStr,
      widgetForm: JSON.parse(JSON.stringify(defaultWidgetForm)),
      widgetFormSelect: undefined,
      generateFormRef: null,
      configTab: 'widget',
      previewVisible: false,
      uploadJsonVisible: false,
      dataJsonVisible: false,
      dataCodeVisible: false,
      generateJsonVisible: false,
      generateCodeVisible: false,
      generateJsonTemplate: JSON.stringify(defaultWidgetForm, null, 2),
      dataJsonTemplate: '',
      dataCodeTemplate: '',
      codeLanguage: vueStr,
      jsonEg: JSON.stringify(defaultWidgetForm, null, 2)
    })

    const handleUploadJson = () => {
      try {
        state.widgetForm.list = []
        defaultsDeep(state.widgetForm, JSON.parse(state.jsonEg))

        if (state.widgetForm.list) {
          state.widgetFormSelect = state.widgetForm.list[0]
        }

        state.uploadJsonVisible = false
        ElMessage.success('上传成功')
      } catch (error) {
        ElMessage.error('上传失败')
      }
    }

    const handleCopyClick = (text) => {
      copy(text)
      ElMessage.success('Copy成功')
    }

    const handleGetData = () => {
      state.generateFormRef.getData().then((res) => {
        state.dataJsonTemplate = JSON.stringify(res, null, 2)
        state.dataJsonVisible = true
      })
    }

    const handleGenerateJson = () =>
      (state.generateJsonTemplate = JSON.stringify(
        state.widgetForm,
        null,
        2
      )) && (state.generateJsonVisible = true)

    const handleGenerateCode = () => {
      state.codeLanguage = vueStr
      state.dataCodeVisible = true
    }

    watchEffect(() => {
      if (state.dataCodeVisible) {
        state.dataCodeTemplate = generateCode(
          state.widgetForm,
          state.codeLanguage,
          elementStr
        )
      }
    })

    const handleClearable = () => {
      state.widgetForm.list = []
      defaultsDeep(
        state.widgetForm,
        JSON.parse(JSON.stringify(defaultWidgetForm))
      )
      state.widgetFormSelect = undefined
    }

    const handleReset = () => state.generateFormRef.reset()

    const getJson = () => state.widgetForm

    const setJson = (json) => {
      state.widgetForm.list = []
      defaultsDeep(state.widgetForm, json)
      if (json.list.length) {
        state.widgetFormSelect = json.list[0]
      }
    }

    const getTemplate = (codeType) =>
      generateCode(state.widgetForm, codeType, elementStr)

    const clear = () => handleClearable()

    return {

      ...toRefs(state),
      handleUploadJson,
      handleCopyClick,
      handleGetData,
      handleGenerateJson,
      handleGenerateCode,
      handleClearable,
      handleReset,
      getJson,
      setJson,
      getTemplate,
      clear
    }
  }
})
</script>
