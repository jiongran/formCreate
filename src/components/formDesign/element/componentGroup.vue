<template>
    <div class="widget-cate">{{ title }}</div>
    <draggable tag="ul" item-key="type" ghostClass="ghost" :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false" :list="list">
            <template v-for="(element) in list">
                <li v-if="fields.includes(element.type)" class="form-edit-widget-label"
                    :class="{ 'no-put': element.tpye === 'divider' }">
                    <a>
                        <SvgIcon :name="element.type" />
                        <span>{{ element.label }}</span>
                    </a>
                </li>
            </template>
    </draggable>
</template>

<script>
import SvgIcon from '@/components/svg-icon/index.vue';
import { defineComponent } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';

export default defineComponent({
    name: 'ComponentGroup',
    components: {
        Draggable,
        SvgIcon
    },
    props: {
        title: {
            type: String,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        list: {
            required: true
        }
    },
    watch: {
        list: {
            handler(val) {
                console.log(val)
            },
            deep: true
        }
    },
})
</script>