<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <el-form label-suffix=":" :size="widgetForm.config.size" :label-position="widgetForm.config.labelPosition"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk">
      <Draggable class="widget-form-list" item-key="key" ghostClass="ghost" handle=".drag-widget" :animation="200"
        :group="{ name: 'people' }" :list="widgetForm.list" @add="handleMoveAdd">
          <template v-for="(element,index) in widgetForm.list">
          <transition-group name="fade" tag="div">
            <template v-if="element.type === 'grid'">
              <el-row class="widget-col widget-view" type="flex" v-if="element.key" :key="element.key"
                :class="{ active: widgetFormSelect?.key === element.key }" :gutter="element.options.gutter ?? 0"
                :justify="element.options.justify" :align="element.options.align" @click="handleItemClick(element)">
                <el-col v-for="(col, colIndex) of element.columns" :key="colIndex" :span="col.span ?? 0">
                  <Draggable class="widget-col-list" item-key="key" ghostClass="ghost" handle=".drag-widget"
                    :animation="200" :group="{ name: 'people' }" :no-transition-on-drag="true" :list="col.list"
                    @add="handleColMoveAdd($event, element, colIndex)">
                      <template v-for="($element,$index) in col.list">
                      <transition-group name="fade" tag="div">
                        <ElementWidgetFormItem v-if="$element.key" :key="$element.key" :element="$element"
                          :config="widgetForm.config" :selectWidget="widgetFormSelect"
                          @click.stop="handleItemClick($element)" @copy="handleCopyClick($index, col.list)"
                          @delete="handleDeleteClick($index, col.list)" />
                      </transition-group>
                    </template>
                  </Draggable>
                </el-col>
                <div class="widget-view-action widget-col-action" v-if="widgetFormSelect?.key === element.key">
                  <SvgIcon name="delete" @click.stop="handleDeleteClick(index, widgetForm.list)" />
                </div>
                <div class="widget-view-drag widget-col-drag" v-if="widgetFormSelect?.key === element.key">
                  <SvgIcon name="move" className="drag-widget" />
                </div>
              </el-row>
            </template>
            <template v-else>
              <ElementWidgetFormItem v-if="element.key" :key="element.key" :element="element" :config="widgetForm.config"
                :selectWidget="widgetFormSelect" @click="handleItemClick(element)"
                @copy="handleCopyClick(index, widgetForm.list)" @delete="handleDeleteClick(index, widgetForm.list)" />
            </template>
          </transition-group>
        </template>
      </Draggable>
    </el-form>
  </div>
</template>

<script>
import SvgIcon from '@/components/svg-icon/index.vue';
import { v4 } from 'uuid';
import { defineComponent, nextTick } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import ElementWidgetFormItem from './elementWidgetFormItem.vue';

const handleListInsert = (key, list, obj) => {
  const newList = []
  list.forEach(item => {
    if (item.key === key) {
      newList.push(item)
      newList.push(obj)
    } else {
      if (item.columns) {
        item.columns = item.columns.map(col => ({
          ...col,
          list: handleListInsert(key, col.list, obj)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

const handleListDelete = (key, list) => {
  const newList = []
  list.forEach(item => {
    if (item.key !== key) {
      if (item.columns) {
        item.columns = item.columns.map(col => ({
          ...col,
          list: handleListDelete(key, col.list)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

export default defineComponent({
  name: 'ElementWidgetForm',
  components: {
    SvgIcon,
    Draggable,
    ElementWidgetFormItem
  },
  props: {
    widgetForm: {
      type: Object,
      required: true
    },
    widgetFormSelect: {
      type: Object
    }
  },
  emits: ['update:widgetForm', 'update:widgetFormSelect'],
  setup(props, context) {
    const handleItemClick = (row) => {
      console.log(row)
      context.emit('update:widgetFormSelect', row)
    }

    const handleCopyClick = (index, list) => {
      const key = v4().replaceAll('-', '')
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      let copyData = {
        ...list[index],
        key,
        model: `${list[index].type}_${key}`,
        rules: list[index].rules ?? []
      }

      if (
        list[index].type === 'radio' ||
        list[index].type === 'checkbox' ||
        list[index].type === 'select'
      ) {
        copyData = {
          ...copyData,
          options: {
            ...copyData.options,
            options: copyData.options.options.map((item) => ({ ...item }))
          }
        }
      }

      context.emit('update:widgetForm', {
        ...props.widgetForm,
        list: handleListInsert(list[index].key, oldList, copyData)
      })

      context.emit('update:widgetFormSelect', copyData)
    }

    const handleDeleteClick = (index, list) => {
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          nextTick(() => context.emit('update:widgetFormSelect', null))
        } else {
          context.emit('update:widgetFormSelect', list[index - 1])
        }
      } else {
        context.emit('update:widgetFormSelect', list[index + 1])
      }

      context.emit('update:widgetForm', {
        ...props.widgetForm,
        list: handleListDelete(list[index].key, oldList)
      })
    }

    const handleMoveAdd = (event) => {
      const { newIndex } = event

      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      list[newIndex] = {
        ...list[newIndex],
        key,
        model: `${list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        list[newIndex].type === 'radio' ||
        list[newIndex].type === 'checkbox' ||
        list[newIndex].type === 'select'
      ) {
        list[newIndex] = {
          ...list[newIndex],
          options: {
            ...list[newIndex].options,
            options: list[newIndex].options.options.map((item) => ({
              ...item
            }))
          }
        }
      }

      if (list[newIndex].type === 'grid') {
        list[newIndex] = {
          ...list[newIndex],
          columns: list[newIndex].columns.map((item) => ({ ...item }))
        }
      }
      context.emit('update:widgetForm', { ...props.widgetForm, list })

      context.emit('update:widgetFormSelect', list[newIndex])
    }

    const handleColMoveAdd = (
      event,
      row,
      index
    ) => {
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
          list.splice(oldIndex, 0, row.columns[index].list[newIndex])
        row.columns[index].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')

      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        model: `${row.columns[index].list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        row.columns[index].list[newIndex].type === 'radio' ||
        row.columns[index].list[newIndex].type === 'checkbox' ||
        row.columns[index].list[newIndex].type === 'select'
      ) {
        row.columns[index].list[newIndex] = {
          ...row.columns[index].list[newIndex],
          options: {
            ...row.columns[index].list[newIndex].options,
            options: row.columns[index].list[
              newIndex
            ].options.options.map((item) => ({ ...item }))
          }
        }
      }

      context.emit('update:widgetFormSelect', row.columns[index].list[newIndex])
    }

    return {
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd,
      handleColMoveAdd
    }
  }
})
</script>
