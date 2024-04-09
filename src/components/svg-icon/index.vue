<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" :color="color"></use>
    </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    },
    color:{
        type:String,
        default:'',
    }
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => { return props.className ? 'svg-icon ' + props.className : 'svg-icon'})

</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
