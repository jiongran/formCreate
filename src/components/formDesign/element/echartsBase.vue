<template>
    <div ref="echartLineRef" style="width: 100%; height:  350px;"></div>
</template>

<script>
import { defineComponent, markRaw, nextTick, onMounted, onUnmounted, reactive, toRefs, watch } from 'vue'
import echarts from '../config/echarts.js'
export default defineComponent({
    name: 'echartLine',
    props: {
        value: {
            type: Array,
        },
        type: {
            type: String,
            default: 'line' // line bar 
        }
    },
    emits: ['update:value'],
    setup(props, context) {

        const valueToOptions = (data,props) => {
            const seriesxAxis =  data.map(item => item.label)
            const seriesData =  data.map(item => item.value)
            return {
                xAxis: {
                    data:seriesxAxis
                },
                yAxis: {},
                series: [
                    {
                        type: props.type,
                        data: seriesData
                    }
                ]
            }
        }
        
        const state = reactive({
            echartLineRef: undefined,
            myChart: undefined
        })
        const resize = () => {
            if (state.myChart) {
                state.myChart.resize()
            }
        }
        
        onMounted(() => {
            state.myChart = markRaw(echarts.init(state.echartLineRef))
            state.myChart.setOption(valueToOptions(props.value,props))
            nextTick(() => {
                state.myChart.resize()
            })
            window.addEventListener("resize", resize);
        })
        onUnmounted(() => {
            window.removeEventListener("resize", resize);
            state.myChart.dispose()
            state.myChart = null;
        })
        watch(
            () => props.value,
            val => {
                if (state.myChart) {
                    state.myChart.setOption(valueToOptions(val,props))
                }
            },{
                deep: true
            }
        )
        return {
            ...toRefs(state)
        }
    }
})
</script>