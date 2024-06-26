<template>
  <div class="my-el-style">
    <el-form ref="generateForm" label-suffix=":" :model="model" :rules="rules" :size="widgetForm.config.size"
      :label-position="widgetForm.config.labelPosition" :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk">
      <template v-for="(element, index) of widgetForm.list">
        <template v-if="element.type === 'grid'">
          <el-row type="flex" v-if="element.key" :key="element.key" :gutter="element.options.gutter ?? 0"
            :justify="element.options.justify" :align="element.options.align">
            <el-col v-for="(col, colIndex) of element.columns" :key="colIndex" :span="col.span ?? 0">
              <ElementFormDesignGenerateItem v-for="colItem of col.list" :model="model" :key="colItem.key" :element="colItem"
                :config="data.config" :disabled="disabled" />
            </el-col>
          </el-row>
        </template>
        <ElementFormDesignGenerateItem v-else :model="model" :key="element.key" :element="widgetForm.list[index]"
          :config="data.config" :disabled="disabled" />
      </template>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import {
defineComponent,
nextTick,
onMounted,
reactive,
toRefs,
watch
} from 'vue';
import { widgetForm } from '../config/element';
import ElementFormDesignGenerateItem from './elementFormDesignGenerateItem.vue';

export default defineComponent({
  name: 'ElementFormDesignGenerate',
  components: {
    ElementFormDesignGenerateItem
  },
  props: {
    data: {
      type: Object,
      default: widgetForm
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const state = reactive({
      generateForm: null,
      model: {},
      rules: {},
      widgetForm:
        (props.data && JSON.parse(JSON.stringify(props.data))) ??
        widgetForm
    })

    const generateModel = (list) => {
      for (let index = 0; index < list.length; index++) {
        const model = list[index].model
        if (!model) {
          return
        }
        if (list[index].type === 'grid') {
          list[index].columns.forEach(col => generateModel(col.list))
        } else {
          if (props.value && Object.keys(props.value).includes(model)) {
            state.model[model] = props.value[model]
          } else {
            state.model[model] = list[index].options.defaultValue
          }

          if (list[index].options.rules) {
            state.rules[model] = JSON.parse(
              JSON.stringify(list[index].options.rules)
            )

            if (state.rules[model].enum) {
              // eslint-disable-next-line no-eval
              state.rules[model].enum = eval(state.rules[model].enum)
            }

            if (state.rules[model].pattern) {
              // eslint-disable-next-line no-eval
              state.rules[model].pattern = eval(state.rules[model].pattern)
              state.rules[model].type = 'string'
            }
          }
        }
      }
    }

    const generateOptions = (list) => {
      list.forEach((item) => {
        if (item.type === 'grid') {
          item.columns.forEach(col => generateOptions(col.list))
        } else {
          if (item.options.remote && item.options.remoteFunc) {
            fetch(item.options.remoteFunc)
              .then((resp) => resp.json())
              .then((json) => {
                if (json instanceof Array) {
                  item.options.remoteOptions = json.map((data) => ({
                    label: data[item.options.props.label],
                    value: data[item.options.props.value],
                    children: data[item.options.props.children]
                  }))
                }
              })
          }
        }
      })
    }

    const reset = () => {
      nextTick(() => {
        state.generateForm.resetFields()
      })
    }

    watch(
      () => props.data,
      (val) => {
        state.widgetForm =
          (val && JSON.parse(JSON.stringify(val))) ?? widgetForm
        state.model = {}
        state.rules = {}
        generateModel(state.widgetForm.list)
        generateOptions(state.widgetForm.list)
        reset()
      },
      { deep: true, immediate: true }
    )

    onMounted(() => {
      generateModel(state.widgetForm?.list ?? [])
      generateOptions(state.widgetForm?.list ?? [])
      reset()
    })

    const getData = () => {
      return new Promise((resolve, reject) => {
        state.generateForm
          .validate()
          .then((validate) => {
            if (validate) {
              resolve(state.model)
            } else {
              ElMessage.error('验证失败')
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    return {
      ...toRefs(state),
      getData,
      reset
    }
  }
})
</script>